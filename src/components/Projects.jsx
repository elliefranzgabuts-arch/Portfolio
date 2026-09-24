import { useEffect, useRef, useState } from "react";

import ourLittleWorld from "../assets/images/our-little-world.png";
import jdServices from "../assets/images/jd&s.png";
import campusConnect from "../assets/images/campus.png";
import qTrack from "../assets/images/quetrack.png";

function Projects() {
    const [isVisible, setIsVisible] = useState(false);
    const projectsRef = useRef(null);

    const personalProjects = [
        {
            type: "Personal Project",
            status: "In Progress",
            title: "Our Little World",
            description:
                "A personal website I built for my girlfriend while learning web development. It was designed as a place where we can keep our memories, bucket list, and other moments in one place. The project is still in progress as I continue improving it.",
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

    const teamProjects = [
        {
            type: "Team Project",
            status: "UI/UX Contributor",
            title: "JD&S Services",
            description:
                "A team project focused on a food delivery and services website for local restaurants in Iloilo. I contributed to the project by designing the user interface and overall visual direction in Figma, helping the team plan the website's layout and user experience.",
            contribution:
                "UI/UX design and visual direction using Figma.",
            technologies: [
                "Figma",
                "HTML",
                "CSS",
                "JavaScript",
            ],
            image: jdServices,
            github: "",
        },
        {
            type: "Team Project",
            status: "System Flow Contributor",
            title: "CampusConnect",
            description:
                "A team project focused on an appointment scheduling system for campus activities and services. My contribution focused on creating the flowchart and helping visualize the process and flow of the system before development.",
            contribution:
                "System flowchart and process visualization.",
            technologies: [
                "Flowchart",
                "HTML",
                "CSS",
                "JavaScript",
            ],
            image: campusConnect,
            github: "",
        },
        {
            type: "Team Project",
            status: "Arduino / Queue System",
            title: "Q-Track",
            description:
                "An Arduino-powered queue management system designed to make teller transactions more convenient and organized. The system uses student identification to track queue numbers and allows students to move around while waiting. Once their number is ready to be served, the system can notify them through their phone.",
            contribution:
                "Arduino programming and LED/light indicator implementation.",
            technologies: [
                "Arduino",
                "RFID",
                "Python",
                "MySQL",
                "Flask",
                "IoT",
            ],
            image: qTrack,
            github: "",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.12,
            }
        );

        if (projectsRef.current) {
            observer.observe(projectsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const ProjectShowcase = ({
        project,
        delay = 0,
        featured = false,
    }) => {
        return (
            <article
                className={`
                    group
                    transition-all
                    duration-700
                    ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }
                `}
                style={{
                    transitionDelay: `${delay}ms`,
                }}
            >
                <div
                    className={`
                        grid
                        grid-cols-1
                        ${
                            featured
                                ? "lg:grid-cols-[1.15fr_0.85fr]"
                                : "lg:grid-cols-[1fr_1fr]"
                        }
                        gap-10
                        lg:gap-16
                        items-center
                    `}
                >
                    {/* IMAGE */}
                    <div
                        className="
                            relative
                            overflow-hidden
                            bg-[#080808]
                            border
                            border-[#222]
                            transition-all
                            duration-500
                            group-hover:border-[#444]
                            group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                        "
                    >
                        {/* Top browser-style bar */}
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                px-4
                                py-3
                                bg-[#0a0a0a]
                                border-b
                                border-[#222]
                            "
                        >
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#444]"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#444]"></span>
                            </div>

                            <span className="text-[9px] uppercase tracking-[0.25em] text-[#444]">
                                Project Preview
                            </span>
                        </div>

                        <div className="relative overflow-hidden">
                            <img
                                src={project.image}
                                alt={`${project.title} project preview`}
                                className={`
                                    block
                                    w-full
                                    ${
                                        featured
                                            ? "h-[300px] md:h-[440px]"
                                            : "h-[280px] md:h-[380px]"
                                    }
                                    object-cover
                                    object-top
                                    transition-transform
                                    duration-700
                                    group-hover:scale-[1.035]
                                `}
                            />

                            {/* Overlay */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/60
                                    via-transparent
                                    to-transparent
                                    opacity-70
                                    transition-opacity
                                    duration-500
                                    group-hover:opacity-40
                                "
                            ></div>

                            {/* Bottom red line */}
                            <div
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    h-[2px]
                                    w-0
                                    bg-red-500
                                    transition-all
                                    duration-700
                                    group-hover:w-full
                                "
                            ></div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="relative">
                        {/* META */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-8 h-px bg-red-500"></span>

                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
                                {project.type}
                            </span>

                            <span className="text-[#333]">/</span>

                            <span className="text-[10px] uppercase tracking-[0.18em] text-gray-600">
                                {project.status}
                            </span>
                        </div>

                        {/* TITLE */}
                        <h2
                            className="
                                text-4xl
                                md:text-5xl
                                lg:text-6xl
                                font-bold
                                tracking-tight
                                leading-[0.95]
                                text-white
                                transition-transform
                                duration-500
                                group-hover:translate-x-1
                            "
                        >
                            {project.title}
                            <span className="text-red-500">.</span>
                        </h2>

                        {/* DESCRIPTION */}
                        <p
                            className="
                                mt-6
                                text-gray-400
                                text-sm
                                md:text-base
                                leading-relaxed
                                max-w-xl
                                transition-colors
                                duration-300
                                group-hover:text-gray-300
                            "
                        >
                            {project.description}
                        </p>

                        {/* CONTRIBUTION */}
                        {project.contribution && (
                            <div
                                className="
                                    mt-7
                                    pl-4
                                    border-l
                                    border-[#333]
                                    transition-all
                                    duration-500
                                    group-hover:border-red-500
                                "
                            >
                                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-600 mb-2">
                                    My Contribution
                                </p>

                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {project.contribution}
                                </p>
                            </div>
                        )}

                        {/* TECHNOLOGIES */}
                        <div className="mt-8">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-600 mb-3">
                                Technologies
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <span
                                        key={technology}
                                        className="
                                            px-3
                                            py-1.5
                                            border
                                            border-[#252525]
                                            bg-[#080808]
                                            text-[11px]
                                            text-gray-400
                                            transition-all
                                            duration-300
                                            hover:border-red-500/60
                                            hover:text-white
                                            hover:bg-red-500/5
                                        "
                                    >
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* GITHUB */}
                        {project.github && (
                            <div className="mt-8">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        group/link
                                        inline-flex
                                        items-center
                                        gap-4
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    <span
                                        className="
                                            border-b
                                            border-red-500
                                            pb-1
                                            transition-colors
                                            duration-300
                                            group-hover/link:text-red-400
                                        "
                                    >
                                        View on GitHub
                                    </span>

                                    <span
                                        className="
                                            text-red-500
                                            text-lg
                                            transition-transform
                                            duration-300
                                            group-hover/link:translate-x-2
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
            ref={projectsRef}
            id="projects"
            className="
                relative
                overflow-hidden
                bg-black
                text-white
                px-6
                md:px-10
                py-28
                md:py-32
                scroll-mt-24
            "
        >
            {/* Subtle background details */}
            <div className="absolute top-0 left-0 w-full h-px bg-[#171717]"></div>

            <div className="absolute top-24 right-0 w-32 h-px bg-red-500/20"></div>

            <div className="absolute bottom-32 left-0 w-24 h-px bg-red-500/10"></div>

            <div className="relative max-w-7xl mx-auto">

                {/* HEADER */}
                <div
                    className={`
                        mb-24
                        transition-all
                        duration-700
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }
                    `}
                >
                    <div className="flex items-center gap-4 mb-7">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
                            Projects
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
                        <h1
                            className="
                                text-6xl
                                md:text-8xl
                                lg:text-9xl
                                font-bold
                                leading-[0.82]
                                tracking-[-0.05em]
                            "
                        >
                            Things
                            <br />
                            <span className="text-[#555]">
                                I've Built
                            </span>
                            <span className="text-red-500">.</span>
                        </h1>

                        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md lg:ml-auto">
                            A collection of personal and team projects where
                            I've applied what I've learned and contributed to
                            building something real.
                        </p>
                    </div>
                </div>

                {/* PERSONAL PROJECTS */}
                <div>
                    <div
                        className="
                            flex
                            items-center
                            gap-5
                            mb-10
                        "
                    >
                        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-300">
                            Personal Projects
                        </h2>

                        <div className="h-px bg-[#222] flex-1"></div>
                    </div>

                    <div className="space-y-20">
                        {personalProjects.map((project) => (
                            <ProjectShowcase
                                key={project.title}
                                project={project}
                                delay={150}
                                featured
                            />
                        ))}
                    </div>
                </div>

                {/* TEAM PROJECTS */}
                <div className="mt-32">
                    <div
                        className="
                            flex
                            items-center
                            gap-5
                            mb-10
                        "
                    >
                        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-300">
                            Team Projects
                        </h2>

                        <div className="h-px bg-[#222] flex-1"></div>
                    </div>

                    <div className="space-y-24">
                        {teamProjects.map((project, index) => (
                            <ProjectShowcase
                                key={project.title}
                                project={project}
                                delay={400 + index * 180}
                            />
                        ))}
                    </div>
                </div>

                {/* FOOTER */}
                <div
                    className="
                        mt-28
                        pt-8
                        border-t
                        border-[#171717]
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        justify-between
                        gap-4
                    "
                >
                    <p className="text-sm text-gray-600">
                        More projects coming as I continue learning and
                        building.
                    </p>

                    <span className="text-xs uppercase tracking-[0.2em] text-gray-700">
                        More to come
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Projects;
