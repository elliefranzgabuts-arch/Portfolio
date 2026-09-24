import { useEffect, useState } from "react";

function Footer() {
    const [visitorCount, setVisitorCount] = useState(null);

    useEffect(() => {
        let visitorId = localStorage.getItem("visitorId");

        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem("visitorId", visitorId);
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/visitors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ visitorId }),
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Visitor request failed"
                    );
                }

                return data;
            })
            .then((data) => {
                if (data.success) {
                    setVisitorCount(data.totalVisitors);
                }
            })
            .catch((error) => {
                console.error("Visitor counter error:", error);
            });
    }, []);

    const footerLinks = [
        "Home",
        "About",
        "Skills",
        "Projects",
        "Journey",
        "Certificates",
        "Contact",
    ];

    return (
        <footer className="border-t border-[#181818] bg-black px-6 md:px-10 py-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                    {/* Logo */}
                    <a
                        href="#home"
                        aria-label="Back to home"
                        className="
                            self-center
                            lg:self-auto
                            text-2xl
                            font-bold
                            tracking-tight
                            text-white
                            transition-colors
                            duration-300
                            hover:text-red-500
                        "
                    >
                        EF<span className="text-red-500">.</span>
                    </a>

                    {/* Navigation */}
                    <nav
                        aria-label="Footer navigation"
                        className="
                            flex
                            flex-wrap
                            justify-center
                            gap-x-5
                            gap-y-3
                            text-xs
                            uppercase
                            tracking-[0.12em]
                            text-gray-600
                        "
                    >
                        {footerLinks.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="
                                    transition-colors
                                    duration-300
                                    hover:text-white
                                "
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Copyright + Visitors */}
                    <div className="text-center lg:text-right">
                        <p className="text-xs text-gray-600">
                            © 2026 Ellie Franz M. Gabutin
                        </p>

                        <p className="mt-1 text-[11px] text-gray-700">
                            Visitors:{" "}
                            {visitorCount !== null
                                ? visitorCount
                                : "Loading..."}
                        </p>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="mt-8 pt-5 border-t border-[#111] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-700">
                        Still learning. Still building.
                    </p>

                    <p className="text-[11px] text-gray-700">
                        Built with React
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
