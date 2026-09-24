import { useEffect, useRef, useState } from "react";

function Skills() {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);

    const skillGroups = [
        {
            title: "Frontend",
            description:
                "Technologies I use to build responsive, interactive, and modern web interfaces.",
            skills: [
                "React",
                "JavaScript",
                "HTML",
                "CSS",
                "Tailwind CSS",
            ],
        },
        {
            title: "Backend",
            description:
                "Technologies I use to build server-side logic, APIs, and application functionality.",
            skills: [
                "Node.js",
                "Express.js",
                "REST API",
            ],
        },
        {
            title: "Database",
            description:
                "Technologies and services I use to store, manage, and connect application data.",
            skills: [
                "MySQL",
                "MySQL2",
                "Aiven",
            ],
        },
        {
            title: "Deployment",
            description:
                "Platforms and tools I use to deploy projects and manage development workflows.",
            skills: [
                "Render",
                "Cloudflare",
                "Git",
                "GitHub",
            ],
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

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={skillsRef}
            id="skills"
            className="
                bg-black
                text-white
                px-6
                md:px-10
                py-28
                md:py-32
                scroll-mt-24
            "
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div
                    className={`
                        mb-16
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
                        <span
                            className="
                                w-10
                                h-px
                                bg-red-500
                                transition-all
                                duration-500
                                hover:w-16
                            "
                        ></span>

                        <p className="text-xs font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Skills
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                        <h1
                            className="
                                text-6xl
                                md:text-8xl
                                font-bold
                                leading-[0.85]
                                tracking-[-0.04em]
                            "
                        >
                            What I
                            <br />
                            <span className="text-[#777]">
                                Work With
                                <span className="text-red-500">.</span>
                            </span>
                        </h1>

                        <p
                            className="
                                text-gray-500
                                text-base
                                md:text-lg
                                leading-relaxed
                                max-w-lg
                                lg:ml-auto
                            "
                        >
                            Technologies, platforms, and tools I use while
                            building and deploying projects as a student
                            developer.
                        </p>
                    </div>
                </div>

                {/* Skill Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {skillGroups.map((group, groupIndex) => (
                        <article
                            key={group.title}
                            className={`
                                group
                                relative
                                overflow-hidden
                                bg-[#080808]
                                border
                                border-[#242424]
                                p-7
                                md:p-8
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-[#3a3a3a]
                                hover:bg-[#0b0b0b]
                                hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-12"
                                }
                            `}
                            style={{
                                transitionDelay: `${150 + groupIndex * 130}ms`,
                            }}
                        >
                            {/* Red Top Accent */}
                            <span
                                className="
                                    absolute
                                    top-0
                                    left-0
                                    w-full
                                    h-px
                                    bg-red-500
                                    origin-left
                                    scale-x-0
                                    group-hover:scale-x-100
                                    transition-transform
                                    duration-500
                                "
                            ></span>

                            {/* Card Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-red-500
                                            transition-all
                                            duration-300
                                            group-hover:scale-150
                                            group-hover:shadow-[0_0_10px_rgba(239,68,68,0.6)]
                                        "
                                    ></span>

                                    <span
                                        className="
                                            text-[10px]
                                            uppercase
                                            tracking-[0.25em]
                                            text-gray-600
                                            transition-colors
                                            duration-300
                                            group-hover:text-gray-400
                                        "
                                    >
                                        Skill Set
                                    </span>
                                </div>

                                <h2
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-bold
                                        tracking-tight
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                >
                                    {group.title}
                                    <span className="text-red-500">.</span>
                                </h2>

                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        text-gray-500
                                        leading-relaxed
                                        max-w-md
                                        transition-colors
                                        duration-300
                                        group-hover:text-gray-400
                                    "
                                >
                                    {group.description}
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="border-t border-[#242424]">
                                {group.skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="
                                            group/skill
                                            flex
                                            items-center
                                            justify-between
                                            py-4
                                            border-b
                                            border-[#1c1c1c]
                                            last:border-b-0
                                            transition-all
                                            duration-300
                                            hover:pl-2
                                        "
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="
                                                    w-1.5
                                                    h-1.5
                                                    rounded-full
                                                    bg-[#444]
                                                    transition-all
                                                    duration-300
                                                    group-hover/skill:bg-red-500
                                                    group-hover/skill:scale-125
                                                    group-hover/skill:shadow-[0_0_7px_rgba(239,68,68,0.5)]
                                                "
                                            ></span>

                                            <span
                                                className="
                                                    text-sm
                                                    md:text-base
                                                    text-gray-400
                                                    transition-colors
                                                    duration-300
                                                    group-hover/skill:text-white
                                                "
                                            >
                                                {skill}
                                            </span>
                                        </div>

                                        <span
                                            className="
                                                text-gray-700
                                                text-sm
                                                transition-all
                                                duration-300
                                                group-hover/skill:text-red-500
                                                group-hover/skill:translate-x-1
                                            "
                                        >
                                            →
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Statement */}
                <div
                    className={`
                        mt-12
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
                        transitionDelay: "800ms",
                    }}
                >
                    <span className="w-8 h-px bg-red-500"></span>

                    <p className="text-sm text-gray-600">
                        I'm still learning, and this stack will keep growing.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Skills;
