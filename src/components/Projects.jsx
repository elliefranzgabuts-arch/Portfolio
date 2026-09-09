function Projects() {
    const projects = [
        {
            number: "01",
            type: "Personal Project",
            title: "Our Little World",
            description:
                "A small personal website I built for my girlfriend while learning web development. It was designed as a place where we can keep our memories, bucket list, and other moments in one place.",
            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "LocalStorage",
                "Git",
                "GitHub",
            ],
            github:
                "https://github.com/elliefranzgabuts-arch/our-little-world",
        },
    ];

    return (
        <section
            id="projects"
            className="bg-black text-white px-6 md:px-10 py-28"
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-16">

                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Projects
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

                        <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                            Things
                            <br />
                            <span className="text-red-500">
                                I've Built.
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            A collection of projects I've worked on while
                            learning, experimenting, and improving my skills
                            as a developer.
                        </p>

                    </div>

                </div>


                {/* Projects */}
                <div className="space-y-8">

                    {projects.map((project) => (
                        <article
                            key={project.title}
                            className="
                                group
                                relative
                                border
                                border-[#242424]
                                rounded-2xl
                                bg-[#080808]
                                overflow-hidden
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-red-500/70
                            "
                        >

                            {/* Red side accent */}
                            <div
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    bottom-0
                                    w-1
                                    bg-red-500
                                    scale-y-0
                                    origin-bottom
                                    transition-transform
                                    duration-500
                                    group-hover:scale-y-100
                                "
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">

                                {/* Project Preview */}
                                <div className="p-4 md:p-6">

                                    <div
                                        className="
                                            relative
                                            h-72
                                            md:h-96
                                            rounded-xl
                                            bg-black
                                            border
                                            border-[#242424]
                                            overflow-hidden
                                        "
                                    >

                                        {/* Replace this with actual project image */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">

                                            <span className="text-[#333] text-sm tracking-widest uppercase">
                                                Project Preview
                                            </span>

                                            <span className="text-[#222] text-xs mt-2">
                                                Our Little World
                                            </span>

                                        </div>


                                        {/* Preview number */}
                                        <div className="absolute top-5 left-5">
                                            <span className="text-white text-sm font-semibold tracking-widest">
                                                {project.number}
                                            </span>
                                        </div>


                                        {/* Bottom label */}
                                        <div
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                right-0
                                                bg-black/90
                                                border-t
                                                border-[#242424]
                                                px-5
                                                py-4
                                            "
                                        >
                                            <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.2em]">
                                                {project.type}
                                            </p>
                                        </div>

                                    </div>

                                </div>


                                {/* Project Details */}
                                <div className="p-8 md:p-10 flex flex-col justify-center">

                                    <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-5">
                                        {project.number} / {project.type}
                                    </p>

                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                        {project.title}
                                        <span className="text-red-500">.</span>
                                    </h2>

                                    <p className="text-gray-400 leading-relaxed text-lg mt-6">
                                        {project.description}
                                    </p>


                                    {/* Technologies */}
                                    <div className="mt-8">

                                        <p className="text-white text-sm font-semibold mb-4">
                                            Built with
                                        </p>

                                        <div className="flex flex-wrap gap-2">

                                            {project.technologies.map(
                                                (technology) => (
                                                    <span
                                                        key={technology}
                                                        className="
                                                            border
                                                            border-[#333]
                                                            rounded-md
                                                            px-3
                                                            py-1.5
                                                            text-sm
                                                            text-gray-400
                                                            transition-colors
                                                            duration-300
                                                            hover:border-red-500
                                                            hover:text-white
                                                        "
                                                    >
                                                        {technology}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                    </div>


                                    {/* GitHub */}
                                    <div className="mt-10">

                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="
                                                inline-flex
                                                items-center
                                                gap-3
                                                text-white
                                                font-semibold
                                                group/link
                                            "
                                        >

                                            <span
                                                className="
                                                    border
                                                    border-red-500
                                                    rounded-lg
                                                    px-5
                                                    py-3
                                                    transition-all
                                                    duration-300
                                                    group-hover/link:bg-red-500
                                                "
                                            >
                                                View Project
                                            </span>

                                            <span className="text-red-500 text-xl transition-transform duration-300 group-hover/link:translate-x-1">
                                                →
                                            </span>

                                        </a>

                                    </div>

                                </div>

                            </div>

                        </article>
                    ))}

                </div>


                {/* Bottom note */}
                <div className="mt-12 flex items-center gap-4">
                    <span className="w-8 h-px bg-[#333]"></span>

                    <p className="text-sm text-gray-600">
                        More projects coming as I continue learning and
                        building.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Projects;