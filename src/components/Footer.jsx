function Footer() {
    return (
        <footer className="bg-black text-white px-6 md:px-10 py-12 border-t border-[#242424]">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                    {/* Logo / Name */}
                    <div>
                        <a
                            href="#home"
                            className="text-2xl font-bold"
                        >
                            EF<span className="text-red-500">.</span>
                        </a>

                        <p className="text-gray-600 text-sm mt-2">
                            Still learning. Still building.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <a
                            href="#home"
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            Home
                        </a>

                        <a
                            href="#about"
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            About
                        </a>

                        <a
                            href="#skills"
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            Skills
                        </a>

                        <a
                            href="#projects"
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            Projects
                        </a>

                        <a
                            href="#journey"
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            Journey
                        </a>

                        <a
                            href="#certificates"
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            Certificates
                        </a>

                        <a
                            href="#contact"
                            className="text-gray-500 hover:text-red-500 transition"
                        >
                            Contact
                        </a>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-[#1f1f1f] mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    <p className="text-gray-600 text-xs">
                        © 2026 Ellie Franz M. Gabutin All rights reserved
                    </p>

                    <p className="text-gray-700 text-xs">
                        Built with React & Tailwind CSS
                    </p>

                </div>

            </div>
        </footer>
    );
}

export default Footer;