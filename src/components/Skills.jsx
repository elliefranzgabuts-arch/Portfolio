import { useEffect, useRef, useState } from "react";

function Skills() {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);

    const skillGroups = [
        {
            number: "01",
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
            number: "02",
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
            number: "03",
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
            number: "04",
            title: "Deployment",
            description:
                "Platforms and infrastructure I use to deploy and make applications accessible online.",
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
                threshold: 0.2,
            }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={skillsRef}
            id="skills"
            className="bg-black text-white px-6 md:px-10 py-28 scroll-mt-24"
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
                                : "opacity-0 translate-y-10"
                        }
                    `}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Skills
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                        <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                            What I
                            <br />
                            <span className="text-[#777]">
                                Work With<span className="text-red-500">.</span>
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            Technologies, platforms, and tools I use while
                            building and deploying projects as a student
                            developer.
                        </p>
                    </div>
                </div>

                {/* Skill Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {skillGroups.map((group, groupIndex) => (
                        <article
                            key={group.number}
                            className={`
                                group
                                relative
                                bg-[#080808]
                                border
                                border-[#242424]
                                p-7
                                transition-all
                                duration-700
                                hover:-translate-y-1
                                hover:border-[#444]
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-12"
                                }
                            `}
                            style={{
                                transitionDelay: `${200 + groupIndex * 150}ms`,
                            }}
                        >
                            {/* Hover Accent */}
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
                            />

                            {/* Category Header */}
                            <div className="flex items-start justify-between mb-10">
                                <div>
                                    <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase">
                                        {group.number}
                                    </p>

                                    <h2 className="text-2xl font-bold mt-3">
                                        {group.title}
                                        <span className="text-red-500">.</span>
                                    </h2>
                                </div>

                                <span className="text-[#222] text-5xl font-bold leading-none">
                                    {group.number}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed pb-7 border-b border-[#242424]">
                                {group.description}
                            </p>

                            {/* Skills */}
                            <div className="mt-2">
                                {group.skills.map((skill, index) => (
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
                                                    bg-red-500
                                                    rounded-full
                                                    transition-transform
                                                    duration-300
                                                    group-hover/skill:scale-150
                                                "
                                            />

                                            <span className="text-gray-300 group-hover/skill:text-white transition-colors duration-300">
                                                {skill}
                                            </span>
                                        </div>

                                        <span className="text-[#444] text-xs">
                                            {String(index + 1).padStart(2, "0")}
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
                        transitionDelay: "850ms",
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

