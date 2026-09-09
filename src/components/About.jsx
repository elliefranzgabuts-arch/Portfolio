function About(props) {
    return (
        <section
            id="about"
            className="bg-[#050505] text-[#f5f5f5] px-6 md:px-10 py-28"
        >
            <div className="max-w-6xl mx-auto">

                {/* Section Label */}
                <div className="flex items-center gap-4 mb-16">
                    <span className="w-10 h-px bg-red-500"></span>

                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                        About Me
                    </p>
                </div>


                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT */}
                    <div>

                        <p className="text-[#555] text-sm tracking-[0.3em] uppercase mb-5">
                            A little bit about
                        </p>

                        <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                            Who
                            <br />

                            <span className="text-[#777]">
                                I am<span className="text-red-500">.</span>
                            </span>
                        </h1>


                        <div className="mt-10 border-l border-red-500 pl-6">
                            <p className="text-[#a3a3a3] text-lg leading-relaxed max-w-md">
                                A student, a learner, and someone who enjoys
                                building things with technology.
                            </p>
                        </div>

                    </div>


                    {/* RIGHT */}
                    <div className="space-y-6 text-[#a3a3a3] text-lg leading-relaxed">

                        <p>
                            I'm{" "}
                            <span className="text-white font-medium">
                                {props.name}
                            </span>
                            , a 3rd-year BSIT student at PHINMA University
                            of Iloilo with a passion for web development
                            and technology.
                        </p>

                        <p>
                            I'm currently learning frontend development
                            using HTML, CSS, JavaScript, and Tailwind CSS.
                            I'm also exploring backend development with
                            Python, Flask, and FastAPI. Along the way, I'm
                            learning tools like Git, GitHub, Figma, VS Code,
                            and MySQL.
                        </p>

                        <p>
                            I started this journey from scratch, and I'm
                            still learning every day. I may not know
                            everything yet, but I'm doing my best to
                            improve, build projects, and find my way toward
                            the future I want.
                        </p>

                        <p>
                            I have a dream, and I'm willing to work for it —
                            one project, one lesson, and one step at a time.
                        </p>

                    </div>

                </div>


                {/* Quick Facts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">

                    {/* Currently */}
                    <div
                        className="
                            border
                            border-[#242424]
                            rounded-xl
                            p-6
                            bg-[#0b0b0b]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-red-500/60
                        "
                    >
                        <p className="text-red-500 text-sm font-semibold">
                            01
                        </p>

                        <h3 className="text-xl font-semibold mt-4">
                            Currently
                        </h3>

                        <p className="text-[#777] mt-2">
                            3rd-year BSIT Student
                        </p>
                    </div>


                    {/* Focus */}
                    <div
                        className="
                            border
                            border-[#242424]
                            rounded-xl
                            p-6
                            bg-[#0b0b0b]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-red-500/60
                        "
                    >
                        <p className="text-red-500 text-sm font-semibold">
                            02
                        </p>

                        <h3 className="text-xl font-semibold mt-4">
                            Focus
                        </h3>

                        <p className="text-[#777] mt-2">
                            Web Development
                        </p>
                    </div>


                    {/* Mindset */}
                    <div
                        className="
                            border
                            border-[#242424]
                            rounded-xl
                            p-6
                            bg-[#0b0b0b]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-red-500/60
                        "
                    >
                        <p className="text-red-500 text-sm font-semibold">
                            03
                        </p>

                        <h3 className="text-xl font-semibold mt-4">
                            Mindset
                        </h3>

                        <p className="text-[#777] mt-2">
                            Still learning. Still building.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default About;