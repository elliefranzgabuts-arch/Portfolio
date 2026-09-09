function Skills() {
    const skillGroups = [
        {
            number: "01",
            title: "Frontend",
            description: "Building and designing interfaces for the web.",
            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "Tailwind CSS",
                "React",
            ],
        },
        {
            number: "02",
            title: "Backend",
            description: "Exploring how applications work behind the interface.",
            skills: [
                "Python",
                "Flask",
                "FastAPI",
            ],
        },
        {
            number: "03",
            title: "Tools & Database",
            description: "Tools I use while developing and managing projects.",
            skills: [
                "MySQL",
                "Git",
                "GitHub",
                "Figma",
                "VS Code",
            ],
        },
    ];

    return (
        <section
            id="skills"
            className="bg-black text-white px-6 md:px-10 py-28"
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-16">

                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Skills
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

                        <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                            What I
                            <br />
                            <span className="text-red-500">
                                Work With.
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            Technologies and tools I've been learning and
                            using while building projects as a student
                            developer.
                        </p>

                    </div>

                </div>


                {/* Skill Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {skillGroups.map((group) => (
                        <article
                            key={group.number}
                            className="
                                group
                                relative
                                border
                                border-[#242424]
                                rounded-2xl
                                bg-[#080808]
                                p-7
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-red-500/70
                            "
                        >

                            {/* Red top line */}
                            <div
                                className="
                                    absolute
                                    top-0
                                    left-7
                                    right-7
                                    h-px
                                    bg-red-500
                                    scale-x-0
                                    origin-left
                                    transition-transform
                                    duration-500
                                    group-hover:scale-x-100
                                "
                            />


                            {/* Number */}
                            <div className="flex items-center justify-between mb-8">

                                <span className="text-red-500 text-sm font-semibold tracking-[0.2em]">
                                    {group.number}
                                </span>

                                <span className="text-[#292929] text-4xl font-bold">
                                    {group.number}
                                </span>

                            </div>


                            {/* Title */}
                            <h2 className="text-2xl font-bold">
                                {group.title}
                                <span className="text-red-500">.</span>
                            </h2>

                            <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-7">
                                {group.description}
                            </p>


                            {/* Skills */}
                            <div className="border-t border-[#242424]">

                                {group.skills.map((skill, index) => (
                                    <div
                                        key={skill}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            py-4
                                            border-b
                                            border-[#1f1f1f]
                                            last:border-b-0
                                            transition-all
                                            duration-300
                                            hover:pl-2
                                        "
                                    >

                                        <div className="flex items-center gap-3">

                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>

                                            <span className="text-gray-300">
                                                {skill}
                                            </span>

                                        </div>

                                        <span className="text-[#444] text-xs">
                                            0{index + 1}
                                        </span>

                                    </div>
                                ))}

                            </div>

                        </article>
                    ))}

                </div>


                {/* Bottom statement */}
                <div className="mt-12 flex items-center gap-4">

                    <span className="w-8 h-px bg-red-500"></span>

                    <p className="text-sm text-gray-600">
                        I'm still learning, and this list will keep growing.
                    </p>

                </div>

            </div>
        </section>
    );
}

export default Skills;