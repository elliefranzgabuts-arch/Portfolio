function Contact(props) {
    return (
        <section
            id="contact"
            className="bg-black text-white px-6 md:px-10 py-28"
        >
            <div className="max-w-6xl mx-auto">

                {/* Section Label */}
                <div className="flex items-center gap-4 mb-16">
                    <span className="w-10 h-px bg-red-500"></span>

                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                        Contact
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Side */}
                    <div>
                        <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tight">
                            LET'S
                            <br />
                            <span className="text-red-500">TALK.</span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg mt-8">
                            Have an idea, project, or collaboration in mind?
                            I'd love to hear about it. I'm always open to
                            learning, building, and connecting with new people.
                        </p>

                        <a
                            href={`mailto:${props.email}`}
                            className="
                                inline-flex
                                items-center
                                gap-3
                                mt-10
                                border
                                border-gray-700
                                px-7
                                py-4
                                rounded-lg
                                font-semibold
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-red-500
                                hover:text-red-500
                            "
                        >
                            Email Me

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* Right Side */}
                    <div className="lg:border-l lg:border-gray-800 lg:pl-16">

                        <p className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase mb-8">
                            Get in touch
                        </p>

                        {/* Email */}
                        <a
                            href={`mailto:${props.email}`}
                            className="
                                group
                                block
                                py-6
                                border-b
                                border-gray-800
                                transition-all
                                duration-300
                                hover:pl-3
                            "
                        >
                            <p className="text-sm text-gray-500 mb-2">
                                Email
                            </p>

                            <div className="flex items-center justify-between gap-4">
                                <p className="text-gray-200 text-lg break-all">
                                    {props.email}
                                </p>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition shrink-0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                    />
                                </svg>
                            </div>
                        </a>

                        {/* Phone */}
                        <a
                            href={`tel:${props.phone}`}
                            className="
                                group
                                block
                                py-6
                                border-b
                                border-gray-800
                                transition-all
                                duration-300
                                hover:pl-3
                            "
                        >
                            <p className="text-sm text-gray-500 mb-2">
                                Phone
                            </p>

                            <div className="flex items-center justify-between gap-4">
                                <p className="text-gray-200 text-lg">
                                    {props.phone}
                                </p>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.09l-4.423-.985a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.248-7.248 1.125 1.125 0 01.38-1.21l1.293-.97c.37-.278.534-.753.417-1.173L7.98 3.102A1.125 1.125 0 006.89 2.25H5.25A3 3 0 002.25 5.25v1.5z"
                                    />
                                </svg>
                            </div>
                        </a>

                        {/* Location */}
                        <div className="py-6 border-b border-gray-800">
                            <p className="text-sm text-gray-500 mb-2">
                                Location
                            </p>

                            <p className="text-gray-200 text-lg">
                                Iloilo City, Philippines
                            </p>
                        </div>

                        {/* Socials */}
                        <div className="mt-10">
                            <p className="text-sm text-gray-500 mb-5">
                                Find me online
                            </p>

                            <div className="flex items-center gap-3">

                                {/* Facebook */}
                                <a
                                    href="https://www.facebook.com/share/1DKUnE2q3L/"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Facebook"
                                    className="
                                        w-11
                                        h-11
                                        border
                                        border-gray-800
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-500
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-red-500
                                        hover:text-red-500
                                    "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M13.5 22v-8h2.75l.5-3h-3.25V9.05c0-.87.24-1.46 1.5-1.46h1.6V4.9c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05V11H8v3h2.3v8h3.2z" />
                                    </svg>
                                </a>

                                {/* GitHub */}
                                <a
                                    href="https://github.com/elliefranzgabuts-arch"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                    className="
                                        w-11
                                        h-11
                                        border
                                        border-gray-800
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-500
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-red-500
                                        hover:text-red-500
                                    "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-.26-2.22-1.14-4.55-5.07-4.55-1.12 0-2.03.39-2.75 1.03-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0112 7.3c.85 0 1.7.12 2.5.36 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.24 10.24 0 0022 12.24C22 6.58 17.52 2 12 2z" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/in/ellie-franz-gabutin-9881783b3"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    className="
                                        w-11
                                        h-11
                                        border
                                        border-gray-800
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-500
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-red-500
                                        hover:text-red-500
                                    "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M6.5 8.5H3.2V21h3.3V8.5zM4.85 3A1.95 1.95 0 102.9 4.95 1.95 1.95 0 004.85 3zM21 13.9c0-3.76-2-5.51-4.67-5.51-2.15 0-3.11 1.18-3.65 2v-1.89H9.38V21h3.3v-6.2c0-1.63.31-3.2 2.32-3.2 1.98 0 2 1.86 2 3.31V21H21v-7.1z" />
                                    </svg>
                                </a>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;