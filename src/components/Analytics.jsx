
import { useEffect, useState } from "react";

function Analytics() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success || !data.token) {
                setError("Invalid password.");
                return;
            }

            sessionStorage.setItem("adminToken", data.token);

            setIsAuthenticated(true);
            setPassword("");
        } catch (error) {
            console.error("Login error:", error);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        const token = sessionStorage.getItem("adminToken");

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        setLoading(true);
        setError("");

        fetch(`${import.meta.env.VITE_API_URL}/api/analytics`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message || "Failed to load analytics."
                    );
                }

                return data;
            })
            .then((data) => {
                setAnalytics(data);
            })
            .catch((error) => {
                console.error("Analytics error:", error);

                sessionStorage.removeItem("adminToken");
                setIsAuthenticated(false);
                setAnalytics(null);
                setError(
                    "Your session has expired. Please log in again."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <section
                id="analytics"
                className="flex min-h-screen items-center justify-center bg-black px-6 py-24 text-white"
            >
                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
                        Private Area
                    </p>

                    <h1 className="mt-3 text-3xl font-bold">
                        Admin Login
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Enter your admin password to access the analytics
                        dashboard.
                    </p>

                    <form onSubmit={handleLogin} className="mt-8">
                        <label
                            htmlFor="admin-password"
                            className="mb-2 block text-sm text-gray-300"
                        >
                            Password
                        </label>

                        <input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter admin password"
                            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
                            required
                        />

                        {error && (
                            <p className="mt-3 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-5 w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    return (
        <section
            id="analytics"
            className="min-h-screen bg-black px-6 py-24 text-white"
        >
            <div className="mx-auto max-w-6xl">
                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
                        Private Dashboard
                    </p>

                    <h1 className="mt-3 text-4xl font-bold">
                        Analytics Dashboard
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Website statistics and recent contact activity.
                    </p>
                </div>

                {loading && (
                    <p className="text-gray-400">
                        Loading analytics...
                    </p>
                )}

                {error && (
                    <p className="text-red-400">
                        {error}
                    </p>
                )}

                {analytics && !loading && !error && (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm text-gray-400">
                                    Unique Visitors
                                </p>

                                <p className="mt-3 text-4xl font-bold">
                                    {analytics.totalVisitors}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm text-gray-400">
                                    Contact Messages
                                </p>

                                <p className="mt-3 text-4xl font-bold">
                                    {analytics.totalMessages}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="mb-5 text-2xl font-bold">
                                Recent Messages
                            </h2>

                            {analytics.latestMessages.length === 0 ? (
                                <p className="text-gray-400">
                                    No messages yet.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {analytics.latestMessages.map(
                                        (message) => (
                                            <div
                                                key={message.id}
                                                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                            >
                                                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {message.name}
                                                        </h3>

                                                        <p className="text-sm text-gray-500">
                                                            {message.email}
                                                        </p>
                                                    </div>

                                                    <p className="text-xs text-gray-500">
                                                        {new Date(
                                                            message.created_at
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>

                                                <p className="mt-4 whitespace-pre-wrap text-gray-300">
                                                    {message.message}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Analytics;

