function Navbar(props) {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <a
                    href="#home"
                    className="text-2xl font-bold text-white"
                >
                    EF<span className="text-red-500">.</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="#home"
                        className="text-gray-300 hover:text-red-500 transition"
                    >
                        Home
                    </a>

                    <a
                        href="#about"
                        onClick={() => props.setActiveSection("about")}
                        className="text-gray-300 hover:text-red-500 transition"
                    >
                        About
                    </a>

                    <a
                        href="#skills"
                        onClick={() => props.setActiveSection("skills")}
                        className="text-gray-300 hover:text-red-500 transition"
                    >
                        Skills
                    </a>

                    <a
                        href="#projects"
                        onClick={() => props.setActiveSection("projects")}
                        className="text-gray-300 hover:text-red-500 transition"
                    >
                        Projects
                    </a>

                    <a
                        href="#journey"
                        onClick={() => props.setActiveSection("journey")}
                        className="text-gray-300 hover:text-red-500 transition"
                    >
                        Journey
                    </a>

                    <a
                        href="#certificates"
                        onClick={() => props.setActiveSection("certificates")}
                        className="text-gray-300 hover:text-red-500 transition"
                    >
                        Certificates
                    </a>

                    <a
                        href="#contact"
                        onClick={() => props.setActiveSection("contact")}
                        className="text-gray-300 hover:text-red-500 transition"
                    >
                        Contact
                    </a>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;