function Home() {
    return (
        <section
            id="home"
            className="min-h-screen bg-black text-white px-6 md:px-10 pt-28 pb-20 flex items-center"
        >
            <div className="max-w-6xl mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

                    {/* LEFT SIDE */}
                    <div>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-10 h-px bg-red-500"></span>

                            <p className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                                BSIT Student / Developer
                            </p>
                        </div>


                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                            Ellie
                            <br />
                            <span className="text-gray-500">
                                Franz<span className="text-red-500">.</span>
                            </span>
                        </h1>


                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mt-10">
                            I'm a 3rd-year BSIT student learning web
                            development and building projects along the way.
                            I enjoy turning ideas into something real through
                            code and design.
                        </p>


                        <p className="text-gray-600 mt-5 text-sm tracking-wide">
                            Still learning. Still building.
                        </p>


                        {/* BUTTONS */}
                        <div className="flex flex-wrap gap-4 mt-10">

                            <a
                                href="#projects"
                                className="
                                    inline-flex
                                    items-center
                                    gap-3
                                    bg-red-500
                                    text-white
                                    px-6
                                    py-3.5
                                    rounded-lg
                                    font-semibold
                                    transition-all
                                    duration-300
                                    hover:bg-red-600
                                    hover:-translate-y-1
                                "
                            >
                                View Projects

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


                            <a
                                href="#contact"
                                className="
                                    inline-flex
                                    items-center
                                    border
                                    border-gray-800
                                    text-gray-300
                                    px-6
                                    py-3.5
                                    rounded-lg
                                    font-semibold
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-red-500
                                    hover:text-red-500
                                "
                            >
                                Contact Me
                            </a>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="relative flex justify-center lg:justify-end">

                        {/* Decorative Number */}
                        <span
                            className="
                                absolute
                                -top-10
                                -right-2
                                md:right-4
                                text-[8rem]
                                md:text-[11rem]
                                font-bold
                                text-gray-900
                                select-none
                                pointer-events-none
                            "
                        >
                            01
                        </span>


                        {/* Photo Frame */}
                        <div
                            className="
                                relative
                                w-72
                                h-96
                                md:w-80
                                md:h-[28rem]
                                border
                                border-gray-800
                                rounded-2xl
                                p-3
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-red-500/60
                            "
                        >

                            <div
                                className="
                                    relative
                                    w-full
                                    h-full
                                    rounded-xl
                                    overflow-hidden
                                    bg-gray-950
                                "
                            >

                                {/* Replace this with your image */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-gray-700 text-sm">
                                        Your Photo
                                    </span>
                                </div>


                                {/* Bottom Label */}
                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        right-0
                                        bg-black/80
                                        backdrop-blur-sm
                                        border-t
                                        border-gray-800
                                        px-5
                                        py-4
                                    "
                                >
                                    <p className="text-sm text-gray-500">
                                        Currently
                                    </p>

                                    <p className="text-white font-medium mt-1">
                                        Learning & Building
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Red Accent */}
                        <div
                            className="
                                absolute
                                -bottom-5
                                -left-2
                                md:left-6
                                w-20
                                h-20
                                border-l
                                border-b
                                border-red-500
                            "
                        />

                    </div>

                </div>


                {/* Bottom Indicator */}
                <div className="hidden md:flex items-center gap-4 mt-20 text-gray-600">
                    <span className="w-8 h-px bg-gray-800"></span>

                    <span className="text-xs tracking-[0.25em] uppercase">
                        Scroll to explore
                    </span>
                </div>

            </div>
        </section>
    );
}

export default Home;