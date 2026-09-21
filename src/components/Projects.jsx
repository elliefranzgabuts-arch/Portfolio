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
            number: "01",
            type: "Personal Project · In Progress",
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
            number: "01",
            type: "Team Project · UI/UX Contributor",
            title: "JD&S Services",
            description:
                "A team project focused on a food delivery and services website for local restaurants in Iloilo. I contributed to the project by designing the user interface and overall visual direction in Figma, helping the team plan the website's layout and user experience.",
            contribution:
                "My contribution focused on UI/UX design and the visual direction of the project using Figma.",
            technologies: [
                "Figma",
                "HTML",
                "CSS",
                "JavaScript",
            ],
            image: jdServices,
            github:
                "https://github.com/alexgustilo/Jangle-Delivery-and-Services---Frontend",
        },
        {
            number: "02",
            type: "Team Project · System Flow Contributor",
            title: "CampusConnect",
            description:
                "A team project focused on an appointment scheduling system for campus activities and services. My contribution focused on creating the flowchart and helping visualize the process and flow of the system before development.",
            contribution:
                "My contribution focused on creating the system flowchart and visualizing the process before development.",
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
            number: "03",
            type: "Team Project · Arduino / Queue Management System",
            title: "Q-Track",
            description:
                "An Arduino-powered queue management system designed to make teller transactions more convenient and organized. The system uses student identification to track queue numbers and allows students to move around while waiting. Once their number is ready to be served, the system can notify them through their phone, reducing the need to stay near the teller area.",
            contribution:
                "My contribution focused on the Arduino programming, particularly helping implement the code that controlled the LED/light indicator based on the system's sensor input.",
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
                threshold: 0.15,
            }
        );

        if (projectsRef.current) {
            observer.observe(projectsRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const ProjectShowcase = ({ project, delay = 200 }) => {
        return (
            <article
                className={`
                    group
                    transition-all
                    duration-700
                    ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }
                `}
                style={{
                    transitionDelay: `${delay}ms`,
                }}
            >
                {/* PROJECT NUMBER + TYPE */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-red-500 text-sm font-semibold tracking-[0.2em]">
                        {project.number}
                    </span>

                    <span className="w-8 h-px bg-[#333]"></span>

                    <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase">
                        {project.type}
                    </p>
                </div>

                {/* PROJECT CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-center">

                    {/* PROJECT IMAGE */}
                    <div
                        className={`
                            relative
                            overflow-hidden
                            bg-[#080808]
                            transition-all
                            duration-700
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-8"
                            }
                        `}
                        style={{
                            transitionDelay: `${delay + 100}ms`,
                        }}
                    >
                        <img
                            src={project.image}
                            alt={`${project.title} website or system preview`}
                            className="
                                block
                                w-full
                                h-[280px]
                                md:h-[420px]
                                object-cover
                                object-top
                                transition-transform
                                duration-700
                                group-hover:scale-[1.03]
                            "
                        />
                    </div>

                    {/* PROJECT INFORMATION */}
                    <div
                        className={`
                            transition-all
                            duration-700
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                            }
                        `}
                        style={{
                            transitionDelay: `${delay + 250}ms`,
                        }}
                    >
                        {/* TITLE */}
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            {project.title}
                            <span className="text-red-500">.</span>
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="text-gray-400 text-base leading-relaxed mt-6">
                            {project.description}
                        </p>

                        {/* MY CONTRIBUTION */}
                        {project.contribution && (
                            <div className="mt-7 border-l border-red-500 pl-4">
                                <p className="text-[#555] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                                    My Contribution
                                </p>

                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {project.contribution}
                                </p>
                            </div>
                        )}

                        {/* TECHNOLOGIES */}
                        <div className="mt-7">
                            <p className="text-[#555] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                                Technologies
                            </p>

                            <div className="flex flex-wrap gap-x-5 gap-y-2">
                                {project.technologies.map((technology) => (
                                    <span
                                        key={technology}
                                        className="
                                            text-sm
                                            text-gray-400
                                            transition-colors
                                            duration-300
                                            hover:text-red-500
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
                                        inline-flex
                                        items-center
                                        gap-3
                                        text-white
                                        font-semibold
                                        group/link
                                    "
                                >
                                    <span className="border-b border-red-500 pb-1">
                                        View on GitHub
                                    </span>

                                    <span
                                        className="
                                            text-red-500
                                            text-xl
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
            className="bg-black text-white px-6 md:px-10 py-28 scroll-mt-24"
        >
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div
                    className={`
                        mb-20
                        transition-all
                        duration-700
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }
                    `}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Projects
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                        <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                            Things
                            <br />
                            <span className="text-[#777]">
                                I've Built
                                <span className="text-red-500">.</span>
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            A collection of personal and team projects where
                            I've been able to apply what I've learned and
                            contribute to something real.
                        </p>
                    </div>
                </div>

                {/* PERSONAL PROJECTS */}
                <div>
                    <div
                        className={`
                            flex
                            items-center
                            gap-4
                            mb-10
                            transition-all
                            duration-700
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-8"
                            }
                        `}
                    >
                        <span className="text-red-500 text-sm font-semibold tracking-[0.2em]">
                            01
                        </span>

                        <h2 className="text-xl md:text-2xl font-bold">
                            Personal Projects
                        </h2>

                        <span className="h-px bg-[#242424] flex-1"></span>
                    </div>

                    <div className="space-y-20">
                        {personalProjects.map((project) => (
                            <ProjectShowcase
                                key={project.title}
                                project={project}
                                delay={200}
                            />
                        ))}
                    </div>
                </div>

                {/* TEAM PROJECTS */}
                <div className="mt-28">
                    <div
                        className={`
                            flex
                            items-center
                            gap-4
                            mb-10
                            transition-all
                            duration-700
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-8"
                            }
                        `}
                    >
                        <span className="text-red-500 text-sm font-semibold tracking-[0.2em]">
                            02
                        </span>

                        <h2 className="text-xl md:text-2xl font-bold">
                            Team Projects
                        </h2>

                        <span className="h-px bg-[#242424] flex-1"></span>
                    </div>

                    <div className="space-y-24">
                        {teamProjects.map((project, index) => (
                            <ProjectShowcase
                                key={project.title}
                                project={project}
                                delay={500 + index * 200}
                            />
                        ))}
                    </div>
                </div>

                {/* BOTTOM MESSAGE */}
                <div
                    className={`
                        mt-16
                        flex
                        items-center
                        gap-4
                        transition-all
                        duration-700
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }
                    `}
                    style={{
                        transitionDelay: "1100ms",
                    }}
                >
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
