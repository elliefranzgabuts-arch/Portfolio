import { useEffect, useState } from "react";

function Analytics() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const parseResponse = async (response) => {
        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error(
                `Server returned an invalid response (${response.status}).`
            );
        }

        if (!response.ok) {
            throw new Error(
                data.message ||
                    `Request failed with status ${response.status}.`
            );
        }

        return data;
    };

    const apiFetch = async (endpoint, options = {}) => {
        if (!API_URL) {
            throw new Error("API URL is not configured.");
        }

        const response = await fetch(
            `${API_URL}${endpoint}`,
            options
        );

        return parseResponse(response);
    };

    const authenticatedFetch = async (
        endpoint,
        options = {}
    ) => {
        const token = sessionStorage.getItem("adminToken");

        if (!token) {
            setIsAuthenticated(false);
            setAnalytics(null);

            throw new Error(
                "No admin session found. Please log in again."
            );
        }

        const headers = {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        };

        try {
            return await apiFetch(endpoint, {
                ...options,
                headers,
            });
        } catch (error) {
            if (
                error.message ===
                "Invalid or expired token."
            ) {
                sessionStorage.removeItem("adminToken");
                setIsAuthenticated(false);
                setAnalytics(null);

                throw new Error(
                    "Your admin session is invalid or expired. Please log in again."
                );
            }

            throw error;
        }
    };

    const getMessageKey = (message) => {
        if (
            message.id !== undefined &&
            message.id !== null
        ) {
            return `message-${String(message.id)}`;
        }

        return `message-${[
            message.name,
            message.email,
            message.created_at,
            message.message,
        ]
            .map((value) => String(value ?? ""))
            .join("|")}`;
    };

    const fetchAnalytics = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
            setStatus("Refreshing analytics...");
        } else {
            setLoading(true);
            setStatus("Loading analytics...");
        }

        setError("");

        try {
            const data = await authenticatedFetch(
                "/api/analytics"
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                        "Failed to load analytics."
                );
            }

            setAnalytics(data);
            setIsAuthenticated(true);
            setError("");

            setStatus(
                isRefresh
                    ? "Analytics refreshed successfully."
                    : "Analytics loaded successfully."
            );

            return true;
        } catch (error) {
            console.error("Analytics error:", error);

            const message =
                error.message === "Failed to fetch"
                    ? "Unable to connect to the analytics server."
                    : error.message ||
                      "Failed to load analytics.";

            setError(message);
            setStatus(message);

            return false;
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const checkSession = async () => {
            const token =
                sessionStorage.getItem("adminToken");

            if (!token) {
                if (isMounted) {
                    setAuthChecking(false);
                    setStatus("No active admin session.");
                }

                return;
            }

            if (isMounted) {
                setStatus("Checking admin session...");
            }

            await fetchAnalytics();

            if (isMounted) {
                setAuthChecking(false);
            }
        };

        checkSession();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");
        setStatus("Logging in...");

        try {
            const data = await apiFetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                }),
            });

            if (!data.success || !data.token) {
                throw new Error(
                    data.message || "Invalid password."
                );
            }

            sessionStorage.setItem(
                "adminToken",
                data.token
            );

            setPassword("");
            setError("");
            setStatus(
                "Login successful. Loading analytics..."
            );

            const authenticated = await fetchAnalytics();

            if (!authenticated) {
                sessionStorage.removeItem(
                    "adminToken"
                );

                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Login error:", error);

            const message =
                error.message === "Failed to fetch"
                    ? "Unable to connect to the server."
                    : error.message || "Login failed.";

            setError(message);
            setStatus(message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("adminToken");

        setIsAuthenticated(false);
        setAnalytics(null);
        setPassword("");
        setError("");
        setStatus("You have been logged out.");
    };

    if (authChecking) {
        return (
            <main
                className="min-h-screen bg-black px-6 py-24 text-white"
                aria-label="Checking authentication"
            >
                <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
                    <div
                        className="text-center"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <div
                            className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-red-500"
                            aria-hidden="true"
                        />

                        <p className="mt-5 text-sm text-gray-500">
                            Checking admin session...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main
                className="min-h-screen bg-black px-6 py-24 text-white"
                aria-labelledby="admin-login-title"
            >
                <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
                    <div
                        className="w-full border border-white/10 bg-[#0a0a0a] p-8"
                        aria-busy={loading}
                    >
                        <div className="mb-8">
                            <p
                                className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500"
                                aria-hidden="true"
                            >
                                Private Area
                            </p>

                            <h1
                                id="admin-login-title"
                                className="mt-3 text-3xl font-bold tracking-tight"
                            >
                                Admin Login
                            </h1>

                            <p
                                id="admin-login-description"
                                className="mt-3 text-sm leading-relaxed text-gray-500"
                            >
                                Enter your admin password to
                                access your website analytics.
                            </p>
                        </div>

                        <form
                            onSubmit={handleLogin}
                            aria-describedby="admin-login-description"
                        >
                            <label
                                htmlFor="admin-password"
                                className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gray-500"
                            >
                                Password
                            </label>

                            <input
                                id="admin-password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter admin password"
                                autoComplete="current-password"
                                aria-required="true"
                                aria-invalid={
                                    error ? "true" : "false"
                                }
                                aria-describedby={
                                    error
                                        ? "login-error"
                                        : "admin-login-description"
                                }
                                className="w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                                required
                            />

                            {error && (
                                <p
                                    id="login-error"
                                    className="mt-3 text-sm leading-relaxed text-red-400"
                                    role="alert"
                                >
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                aria-label={
                                    loading
                                        ? "Logging in"
                                        : "Log in to admin analytics"
                                }
                                aria-busy={loading}
                                className="mt-5 w-full border border-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>

                            <div
                                className="sr-only"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {status}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main
            className="min-h-screen bg-black px-6 py-20 text-white md:px-10"
            aria-labelledby="analytics-title"
            aria-busy={loading || refreshing}
        >
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
                    <div>
                        <p
                            className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500"
                            aria-hidden="true"
                        >
                            Private Dashboard
                        </p>

                        <h1
                            id="analytics-title"
                            className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
                        >
                            Analytics
                        </h1>

                        <p
                            id="analytics-description"
                            className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500"
                        >
                            Monitor website visitors and
                            messages from your portfolio.
                        </p>
                    </div>

                    <div
                        className="flex items-center gap-3"
                        aria-label="Analytics controls"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                fetchAnalytics(true)
                            }
                            disabled={
                                refreshing || loading
                            }
                            aria-label={
                                refreshing
                                    ? "Refreshing analytics"
                                    : "Refresh analytics"
                            }
                            aria-busy={refreshing}
                            className="flex items-center gap-2 border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:border-red-500 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span
                                aria-hidden="true"
                                className={
                                    refreshing
                                        ? "animate-spin"
                                        : ""
                                }
                            >
                                ↻
                            </span>

                            {refreshing
                                ? "Refreshing..."
                                : "Refresh"}
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            aria-label="Log out of admin dashboard"
                            className="border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:border-red-500 hover:text-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div
                    className="sr-only"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {status}
                </div>

                {loading && !analytics && (
                    <div
                        className="text-sm text-gray-500"
                        role="status"
                        aria-live="polite"
                    >
                        Loading analytics...
                    </div>
                )}

                {error && (
                    <div
                        className="border border-red-500/20 bg-red-500/5 p-5"
                        role="alert"
                        aria-live="assertive"
                    >
                        <p className="text-sm leading-relaxed text-red-400">
                            {error}
                        </p>
                    </div>
                )}

                {analytics && !error && (
                    <>
                        <div
                            className="grid gap-5 md:grid-cols-2"
                            aria-label="Analytics summary"
                        >
                            <div className="border border-white/10 bg-[#0a0a0a] p-7 transition hover:border-red-500/40">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                                    Unique Visitors
                                </p>

                                <p
                                    className="mt-5 text-5xl font-bold tracking-tight"
                                    aria-label={`${analytics.totalVisitors} unique visitors`}
                                >
                                    {analytics.totalVisitors}
                                </p>

                                <p className="mt-3 text-sm text-gray-600">
                                    Total unique visitor IDs
                                    recorded
                                </p>
                            </div>

                            <div className="border border-white/10 bg-[#0a0a0a] p-7 transition hover:border-red-500/40">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                                    Contact Messages
                                </p>

                                <p
                                    className="mt-5 text-5xl font-bold tracking-tight"
                                    aria-label={`${analytics.totalMessages} contact messages`}
                                >
                                    {analytics.totalMessages}
                                </p>

                                <p className="mt-3 text-sm text-gray-600">
                                    Messages received through
                                    your portfolio
                                </p>
                            </div>
                        </div>

                        <section
                            className="mt-14"
                            aria-labelledby="recent-messages-title"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p
                                        className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500"
                                        aria-hidden="true"
                                    >
                                        Inbox
                                    </p>

                                    <h2
                                        id="recent-messages-title"
                                        className="mt-2 text-2xl font-bold"
                                    >
                                        Recent Messages
                                    </h2>
                                </div>

                                <p className="text-xs text-gray-600">
                                    Latest 10
                                </p>
                            </div>

                            {!Array.isArray(
                                analytics.latestMessages
                            ) ||
                            analytics.latestMessages
                                .length === 0 ? (
                                <div className="border border-white/10 bg-[#0a0a0a] p-8">
                                    <p className="text-sm text-gray-500">
                                        No messages yet.
                                    </p>
                                </div>
                            ) : (
                                <div
                                    className="space-y-4"
                                    aria-live="polite"
                                    aria-label="Recent contact messages"
                                >
                                    {analytics.latestMessages.map(
                                        (message) => {
                                            const messageKey =
                                                getMessageKey(
                                                    message
                                                );

                                            return (
                                                <article
                                                    key={
                                                        messageKey
                                                    }
                                                    className="border border-white/10 bg-[#0a0a0a] p-6 transition hover:border-white/20"
                                                    aria-labelledby={`${messageKey}-name`}
                                                >
                                                    <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row">
                                                        <div>
                                                            <h3
                                                                id={`${messageKey}-name`}
                                                                className="font-semibold text-white"
                                                            >
                                                                {
                                                                    message.name
                                                                }
                                                            </h3>

                                                            <a
                                                                href={`mailto:${message.email}`}
                                                                aria-label={`Email ${message.name} at ${message.email}`}
                                                                className="mt-1 block text-sm text-gray-500 transition hover:text-red-500"
                                                            >
                                                                {
                                                                    message.email
                                                                }
                                                            </a>
                                                        </div>

                                                        <time
                                                            dateTime={
                                                                message.created_at ||
                                                                undefined
                                                            }
                                                            className="text-xs text-gray-600"
                                                        >
                                                            {message.created_at
                                                                ? new Date(
                                                                      message.created_at
                                                                  ).toLocaleString()
                                                                : "Unknown date"}
                                                        </time>
                                                    </div>

                                                    <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-gray-400">
                                                        {
                                                            message.message
                                                        }
                                                    </p>
                                                </article>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}

export default Analytics;

