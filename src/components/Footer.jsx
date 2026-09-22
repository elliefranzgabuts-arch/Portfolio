import { useEffect, useState } from "react";

function Footer() {
    const [visitorCount, setVisitorCount] = useState(null);

    useEffect(() => {
        let visitorId = localStorage.getItem("visitorId");

        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem("visitorId", visitorId);
        }

        fetch("http://localhost:5000/api/visitors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ visitorId }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setVisitorCount(data.visitorCount);
                }
            })
            .catch((error) => {
                console.error("Visitor counter error:", error);
            });
    }, []);

    return (
        <footer className="border-t border-white/10 bg-black px-6 py-5">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
                <a
                    href="#home"
                    className="font-semibold text-white transition-colors hover:text-red-500"
                >
                    EF.
                </a>

                <nav
                    aria-label="Footer navigation"
                    className="flex flex-wrap justify-center gap-x-4 gap-y-2"
                >
                    {[
                        "Home",
                        "About",
                        "Skills",
                        "Projects",
                        "Journey",
                        "Certificates",
                        "Contact",
                    ].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="transition-colors hover:text-white"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex flex-col items-center gap-1 sm:items-end">
                    <p>© 2026 Ellie Franz M. Gabutin</p>

                    {visitorCount !== null && (
                        <p className="text-xs text-gray-600">
                            Visitors: {visitorCount}
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
