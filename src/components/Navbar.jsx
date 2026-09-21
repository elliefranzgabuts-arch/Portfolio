import { useEffect, useState } from "react";

function Navbar({ activeSection, setActiveSection }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navItems = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "journey", label: "Journey" },
        { id: "certificates", label: "Certificates" },
        { id: "contact", label: "Contact" },
    ];

    const handleNavigation = (section) => {
        setActiveSection(section);
        setMenuOpen(false);

        const element = document.getElementById(section);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <nav
            className={`
                fixed
                top-0
                left-0
                w-full
                z-50
                transition-all
                duration-500
                ${
                    scrolled
                        ? "bg-black/95 backdrop-blur-lg border-b border-gray-800 shadow-lg"
                        : "bg-black/80 backdrop-blur-md border-b border-gray-800"
                }
            `}
        >
            <div
                className={`
                    max-w-6xl
                    mx-auto
                    px-6
                    flex
                    items-center
                    justify-between
                    transition-all
                    duration-500
                    ${
                        scrolled
                            ? "py-3"
                            : "py-4"
                    }
                `}
            >
                {/* LOGO */}
                <button
                    type="button"
                    onClick={() => handleNavigation("home")}
                    className="
                        text-2xl
                        font-bold
                        text-white
                        tracking-tight
                        transition-transform
                        duration-300
                        hover:scale-105
                    "
                >
                    EF<span className="text-red-500">.</span>
                </button>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            type="button"
                            key={item.id}
                            onClick={() => handleNavigation(item.id)}
                            className={`
                                relative
                                text-sm
                                font-medium
                                transition-colors
                                duration-300
                                ${
                                    activeSection === item.id
                                        ? "text-red-500"
                                        : "text-gray-300 hover:text-red-500"
                                }
                            `}
                        >
                            {item.label}

                            {/* Active underline */}
                            <span
                                className={`
                                    absolute
                                    -bottom-2
                                    left-0
                                    h-px
                                    bg-red-500
                                    transition-all
                                    duration-300
                                    ${
                                        activeSection === item.id
                                            ? "w-full"
                                            : "w-0"
                                    }
                                `}
                            />
                        </button>
                    ))}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="
                        md:hidden
                        w-11
                        h-11
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-1.5
                        text-gray-300
                        transition-colors
                        duration-300
                        hover:text-red-500
                    "
                >
                    <span
                        className={`
                            block
                            w-6
                            h-px
                            bg-current
                            transition-all
                            duration-300
                            ${
                                menuOpen
                                    ? "translate-y-[4px] rotate-45"
                                    : ""
                            }
                        `}
                    />

                    <span
                        className={`
                            block
                            w-6
                            h-px
                            bg-current
                            transition-all
                            duration-300
                            ${
                                menuOpen
                                    ? "opacity-0"
                                    : "opacity-100"
                            }
                        `}
                    />

                    <span
                        className={`
                            block
                            w-6
                            h-px
                            bg-current
                            transition-all
                            duration-300
                            ${
                                menuOpen
                                    ? "-translate-y-[4px] -rotate-45"
                                    : ""
                            }
                        `}
                    />
                </button>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`
                    md:hidden
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                        menuOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                    }
                `}
            >
                <div className="border-t border-gray-800 bg-black/95 px-6 py-4">
                    <div className="flex flex-col">
                        {navItems.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className={`
                                    text-left
                                    py-4
                                    border-b
                                    border-gray-800
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-300
                                    ${
                                        activeSection === item.id
                                            ? "text-red-500 pl-2"
                                            : "text-gray-300 hover:text-red-500 hover:pl-2"
                                    }
                                `}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
