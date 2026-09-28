import { useCallback, useEffect, useState } from "react";

function Analytics() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const apiFetch = useCallback(
        async (endpoint, options = {}) => {
            const token = sessionStorage.getItem("adminToken");

            const headers = {
                "Content-Type": "application/json",
                ...(options.headers || {}),
                ...(token
                    ? {
                          Authorization: `Bearer ${token}`,
                      }
                    : {}),
            };

            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers,
            });

            let data;

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong."
                );
            }

            return data;
        },
        [API_URL]
    );

    const authenticatedFetch = useCallback(
        async (endpoint, options = {}) => {
            const token = sessionStorage.getItem("adminToken");

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
                        "Your admin session is invalid or expired. Please log in again.",
                        { cause: error }
                    );
                }

                throw error;
            }
        },
        [apiFetch]
    );

    const getMessageKey = (message, index) => {
        if (
            message.id !== undefined &&
            message.id !== null
        ) {
            return `id-${message.id}`;
        }

        return `${message.email || "unknown"}-${
            message.created_at ||
            message.createdAt ||
            message.name ||
            `message-${index}`
        }`;
    };

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await authenticatedFetch(
                "/api/analytics"
            );

            if (data.success) {
                setAnalytics(data);
            } else {
                setAnalytics(data);
            }
        } catch (error) {
            console.error("Analytics error:", error);

            if (
                error.message ===
                "Your admin session is invalid or expired. Please log in again."
            ) {
                setStatus(
                    "Your admin session is invalid or expired. Please log in again."
                );
            } else {
                setError(
                    error.message ||
                        "Unable to load analytics."
                );
            }
        } finally {
            setLoading(false);
        }
    }, [authenticatedFetch]);

    useEffect(() => {
        let isMounted = true;

        const checkSession = async () => {
            const token =
                sessionStorage.getItem("adminToken");

            if (!token) {
                if (isMounted) {
                    setAuthChecking(false);
                }

                return;
            }

            if (isMounted) {
                setStatus("Checking admin session...");
            }

            try {
                await fetchAnalytics();

                if (isMounted) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error(
                    "Session validation error:",
                    error
                );

                if (isMounted) {
                    sessionStorage.removeItem(
                        "adminToken"
                    );
                    setIsAuthenticated(false);
                }
            } finally {
                if (isMounted) {
                    setAuthChecking(false);
                }
            }
        };

        checkSession();

        return () => {
            isMounted = false;
        };
    }, [fetchAnalytics]);

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");
        setStatus("Logging in...");

        try {
            const data = await apiFetch("/api/login", {
                method: "POST",
                body: JSON.stringify({
                    password: loginPassword,
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

            setLoginPassword("");
            setIsAuthenticated(true);
            setStatus("Login successful.");

            await fetchAnalytics();
        } catch (error) {
            console.error("Login error:", error);

            setError(
                error.message ||
                    "Unable to log in. Please try again."
            );
            setStatus("");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("adminToken");

        setIsAuthenticated(false);
        setAnalytics(null);
        setError("");
        setStatus("Logged out.");
    };

    const handleRefresh = async () => {
        setStatus("Refreshing analytics...");
        setError("");

        await fetchAnalytics();

        setStatus("Analytics updated.");
    };

    if (authChecking) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        Checking admin session...
                    </p>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="border border-[#202020] bg-[#080808] p-8">
                        <div className="mb-8">
                            <p className="text-xs uppercase tracking-[0.2em] text-red-500">
                                Private Area
                            </p>

                            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                                Admin Login
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Enter your admin password to
                                access the analytics dashboard.
                            </p>
                        </div>

                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="admin-password"
                                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-gray-500"
                                >
                                    Password
                                </label>

                                <input
                                    id="admin-password"
                                    type="password"
                                    value={loginPassword}
                                    onChange={(event) =>
                                        setLoginPassword(
                                            event.target.value
                                        )
                                    }
                                    required
                                    autoComplete="current-password"
                                    className="w-full border border-[#252525] bg-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-red-500"
                                    placeholder="Enter password"
                                />
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="text-sm text-red-400"
                                >
                                    {error}
                                </p>
                            )}

                            {status && (
                                <p
                                    role="status"
                                    aria-live="polite"
                                    className="text-sm text-gray-500"
                                >
                                    {status}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Enter Dashboard"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white px-6 py-10 md:px-10">
            <div className="mx-auto max-w-6xl">
                <header className="flex flex-col gap-5 border-b border-[#181818] pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-red-500">
                            Private Area
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                            Analytics Dashboard
                        </h1>

                        <p className="mt-3 text-sm text-gray-500">
                            Overview of visitors, messages,
                            and website activity.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={loading}
                            className="border border-[#252525] px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-300 transition-colors hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Refreshing..."
                                : "Refresh"}
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="border border-[#252525] px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-500 transition-colors hover:border-red-500 hover:text-red-400"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {status && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="mt-5 text-sm text-gray-500"
                    >
                        {status}
                    </p>
                )}

                {error && (
                    <p
                        role="alert"
                        className="mt-5 text-sm text-red-400"
                    >
                        {error}
                    </p>
                )}

                {analytics && (
                    <div className="mt-10 space-y-10">
                        <section>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="border border-[#181818] bg-[#080808] p-6">
                                    <p className="text-xs uppercase tracking-[0.15em] text-gray-600">
                                        Total Visitors
                                    </p>

                                    <p className="mt-3 text-3xl font-semibold">
                                        {analytics.totalVisitors ??
                                            analytics.visitorCount ??
                                            0}
                                    </p>
                                </div>

                                <div className="border border-[#181818] bg-[#080808] p-6">
                                    <p className="text-xs uppercase tracking-[0.15em] text-gray-600">
                                        Messages
                                    </p>

                                    <p className="mt-3 text-3xl font-semibold">
                                        {analytics.totalMessages ??
                                            analytics.messageCount ??
                                            0}
                                    </p>
                                </div>

                                <div className="border border-[#181818] bg-[#080808] p-6">
                                    <p className="text-xs uppercase tracking-[0.15em] text-gray-600">
                                        Newest Visitor
                                    </p>

                                    <p className="mt-3 text-sm text-gray-300">
                                        {analytics.latestVisitor ??
                                            "—"}
                                    </p>
                                </div>

                                <div className="border border-[#181818] bg-[#080808] p-6">
                                    <p className="text-xs uppercase tracking-[0.15em] text-gray-600">
                                        Status
                                    </p>

                                    <p className="mt-3 text-sm text-green-400">
                                        Connected
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold">
                                    Recent Messages
                                </h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    Messages submitted through
                                    your portfolio contact form.
                                </p>
                            </div>

                            <div className="overflow-x-auto border border-[#181818]">
                                {Array.isArray(
                                    analytics.messages
                                ) &&
                                analytics.messages.length > 0 ? (
                                    <table className="w-full min-w-[700px] text-left">
                                        <thead className="border-b border-[#181818] bg-[#080808]">
                                            <tr>
                                                <th className="px-5 py-4 text-xs uppercase tracking-[0.12em] text-gray-600">
                                                    Name
                                                </th>

                                                <th className="px-5 py-4 text-xs uppercase tracking-[0.12em] text-gray-600">
                                                    Email
                                                </th>

                                                <th className="px-5 py-4 text-xs uppercase tracking-[0.12em] text-gray-600">
                                                    Message
                                                </th>

                                                <th className="px-5 py-4 text-xs uppercase tracking-[0.12em] text-gray-600">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {analytics.messages.map(
                                                (message, index) => (
                                                    <tr
                                                        key={getMessageKey(
                                                            message,
                                                            index
                                                        )}
                                                        className="border-b border-[#111] last:border-b-0"
                                                    >
                                                        <td className="px-5 py-4 text-sm text-gray-300">
                                                            {message.name ||
                                                                "—"}
                                                        </td>

                                                        <td className="px-5 py-4 text-sm text-gray-400">
                                                            {message.email ||
                                                                "—"}
                                                        </td>

                                                        <td className="max-w-md px-5 py-4 text-sm leading-6 text-gray-400">
                                                            {message.message ||
                                                                "—"}
                                                        </td>

                                                        <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-600">
                                                            {message.created_at ||
                                                                message.createdAt ||
                                                                "—"}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="px-6 py-10 text-center text-sm text-gray-600">
                                        No messages yet.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Analytics;
