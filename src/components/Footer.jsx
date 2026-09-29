import { useEffect } from "react";
import { Link } from "react-router-dom";

function Footer() {
    const API_URL =
        "https://portfolio-production-881c.up.railway.app";

    useEffect(() => {
        const recordVisitor = async () => {
            try {
                let visitorId = localStorage.getItem("visitorId");

                if (!visitorId) {
                    visitorId = crypto.randomUUID();
                    localStorage.setItem("visitorId", visitorId);
                }

                const sessionKey = `visitorRecorded_${visitorId}`;

                if (sessionStorage.getItem(sessionKey)) {
                    return;
                }

                sessionStorage.setItem(sessionKey, "true");

                await fetch(`${API_URL}/api/visitors`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        visitorId,
                        path: window.location.pathname,
                    }),
                });
            } catch (error) {
                console.error(
                    "Visitor tracking failed:",
                    error
                );
            }
        };

        recordVisitor();
    }, []);

    return (
        <footer className="w-full border-t border-white/10 bg-black px-6 py-10 text-white">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3 text-center md:text-left">
                    <Link
                        to="/admin"
                        aria-label="Admin"
                        className="group flex h-7 w-7 items-center justify-center text-white/10 transition-all duration-300 hover:text-white/70"
                    >
                        <span className="text-[11px] transition-transform duration-500 group-hover:rotate-90">
                            ⚙
                        </span>
                    </Link>

                    <div>
                        <div className="mb-2 text-2xl font-bold tracking-tight">
                            EF.
                        </div>

                        <p className="text-sm text-white/50">
                            Built while learning.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-5 text-sm text-white/60">
                    <a href="#home" className="transition hover:text-white">
                        Home
                    </a>

                    <a href="#about" className="transition hover:text-white">
                        About
                    </a>

                    <a href="#skills" className="transition hover:text-white">
                        Skills
                    </a>

                    <a href="#projects" className="transition hover:text-white">
                        Projects
                    </a>

                    <a href="#journey" className="transition hover:text-white">
                        Journey
                    </a>

                    <a href="#certificates" className="transition hover:text-white">
                        Certificates
                    </a>

                    <a href="#contact" className="transition hover:text-white">
                        Contact
                    </a>
                </div>
            </div>

            <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center gap-4 border-t border-white/10 pt-6 text-center">
                <p className="text-xs text-white/40">
                    © 2026 Ellie Franz M. Gabutin
                </p>

                <p className="text-xs text-white/30">
                    Still learning. Still building.
                </p>
            </div>
        </footer>
    );
}

export default Footer;

