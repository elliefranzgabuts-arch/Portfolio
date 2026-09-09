import ourLittleWorld from "../assets/images/our-little-world.png";

function Projects() {
    const personalProjects = [
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
            image: ourLittleWorld,
        },
    ];

    const contributions = [
        // Add your collaborative projects here.
        //
        // Example:
        // {
        //     number: "01",
        //     type: "Team Project",
        //     title: "Project Name",
        //     description:
        //         "Description of the project and what I contributed.",
        //     role: "Frontend Developer",
        //     technologies: [
        //         "React",
        //         "Tailwind CSS",
        //     ],
        //     github: "https://github.com/...",
        //     image: projectImage,
        // },
    ];

    const ProjectCard = ({ project }) => {
        return (
            <article
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
                {/* Red Side Accent */}
                <div
                    className="
                        absolute
                        left-0
                        top-0
                        bottom-0
                        w-px
                        bg-red-500
                        origin-top
                        scale-y-0
                        transition-transform
                        duration-500
                        group-hover:scale-y-100
                    "
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Project Preview */}
                    <div className="p-6 md:p-8">
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
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={`${project.title} preview`}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                        transition-transform
                                        duration-500
                                        group-hover:scale-105
                                    "
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-[#333] text-sm tracking-widest uppercase">
                                        Project Preview
                                    </span>

                                    <span className="text-[#222] text-xs mt-2">
                                        {project.title}
                                    </span>
                                </div>
                            )}

                            {/* Dark Overlay */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-black/10
                                    group-hover:bg-transparent
                                    transition-all
                                    duration-500
                                "
                            />

                            {/* Project Number */}
                            <span
                                className="
                                    absolute
                                    top-5
                                    left-5
                                    text-red-500
                                    text-xs
                                    font-semibold
                                    tracking-[0.2em]
                                    bg-black/70
                                    px-2
                                    py-1
                                    rounded
                                "
                            >
                                {project.number}
                            </span>
                        </div>
                    </div>

                    {/* Project Information */}
                    <div
                        className="
                            p-6
                            md:p-8
                            lg:py-10
                            lg:pr-10
                            flex
                            flex-col
                            justify-center
                        "
                    >
                        {/* Project Type */}
                        <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase">
                            {project.type}
                        </p>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold mt-4">
                            {project.title}
                            <span className="text-red-500">.</span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-400 text-base leading-relaxed mt-5 max-w-xl">
                            {project.description}
                        </p>

                        {/* Role */}
                        {project.role && (
                            <div className="mt-6">
                                <p className="text-gray-600 text-xs uppercase tracking-[0.2em]">
                                    My Role
                                </p>

                                <p className="text-gray-300 mt-2 font-medium">
                                    {project.role}
                                </p>
                            </div>
                        )}

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mt-7">
                            {project.technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="
                                        px-3
                                        py-1.5
                                        text-xs
                                        text-gray-400
                                        border
                                        border-[#242424]
                                        rounded-md
                                        bg-[#0d0d0d]
                                    "
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>

                        {/* GitHub */}
                        {project.github && (
                            <div className="mt-8">
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

                                    <span
                                        className="
                                            text-red-500
                                            text-xl
                                            transition-transform
                                            duration-300
                                            group-hover/link:translate-x-1
                                        "
                                    >
                                        →
                                    </span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        );
    };

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

                {/* PERSONAL PROJECTS */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-red-500 text-sm font-semibold tracking-[0.2em]">
                            01
                        </span>

                        <h2 className="text-2xl font-bold">
                            Personal Projects
                        </h2>

                        <span className="h-px bg-[#242424] flex-1"></span>
                    </div>

                    <div className="space-y-6">
                        {personalProjects.map((project) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                            />
                        ))}
                    </div>
                </div>

                {/* CONTRIBUTIONS */}
                <div className="mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-red-500 text-sm font-semibold tracking-[0.2em]">
                            02
                        </span>

                        <h2 className="text-2xl font-bold">
                            Contributions
                        </h2>

                        <span className="h-px bg-[#242424] flex-1"></span>
                    </div>

                    {contributions.length > 0 ? (
                        <div className="space-y-6">
                            {contributions.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    project={project}
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            className="
                                border
                                border-dashed
                                border-[#242424]
                                rounded-2xl
                                p-10
                                md:p-14
                                text-center
                            "
                        >
                            <p className="text-gray-600 text-sm tracking-wide">
                                Collaborative projects and contributions
                                will appear here.
                            </p>
                        </div>
                    )}
                </div>

                {/* Bottom Statement */}
                <div className="mt-12 flex items-center gap-4">
                    <span className="w-8 h-px bg-red-500"></span>

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