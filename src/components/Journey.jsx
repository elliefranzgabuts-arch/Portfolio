import { useEffect, useRef, useState } from "react";

function Journey() {
    const [isVisible, setIsVisible] = useState(false);
    const journeyRef = useRef(null);

    const journey = [
        {
            year: "2024–2025",
            title: "Started With Python",
            tag: "FIRST YEAR",
            description:
                "My journey in IT started during my first year of college at PHINMA University of Iloilo. I was introduced to Python and learned the fundamentals of programming. For our final project, I worked on a 2D story-based project with a horror-style concept.",
        },
        {
            year: "2025–2026",
            title: "HTML & CSS",
            tag: "SECOND YEAR · FIRST SEMESTER",
            description:
                "During the first semester of my second year, I was introduced to web development through HTML and CSS. This was one of my first experiences creating and styling websites.",
        },
        {
            year: "2025–2026",
            title: "Learning Java",
            tag: "SECOND YEAR",
            description:
                "I continued developing my programming foundation through Java. Working on different projects helped me understand programming concepts and gave me more experience writing and organizing code.",
        },
        {
            year: "2025–2026",
            title: "Mobile, Arduino & APIs",
            tag: "SECOND YEAR · SECOND SEMESTER",
            description:
                "I was introduced to mobile application development using Expo Go while also gaining experience with Arduino and APIs. I was still learning these technologies, but the experience allowed me to explore different areas of technology and contribute to our projects.",
        },
        {
            year: "DURING COLLEGE",
            title: "Seminars & Certifications",
            tag: "LEARNING OUTSIDE CLASS",
            description:
                "Throughout college, I also participated in seminars and learning activities that helped me gain knowledge beyond regular classroom lessons. These experiences and certifications became part of my continuous learning as an IT student.",
        },
        {
            year: "2026–2027",
            title: "Web Development",
            tag: "THIRD YEAR",
            description:
                "Now in my third year, I started focusing more on web development. I'm learning HTML, CSS, JavaScript, Tailwind CSS, React, Node.js, Express.js, SQL/MySQL, Git, and GitHub while building projects and understanding how different parts of an application work together.",
        },
        {
            year: "2026–2027",
            title: "Philippine Startup Challenge XI",
            tag: "DICT · UI/UX",
            description:
                "I participated in the Philippine Startup Challenge XI as part of my team's UI/UX role. This gave me an opportunity to apply what I've been learning in design and technology while working with a team to develop a startup solution.",
        },
        {
            year: "2026–2027",
            title: "Currently Building",
            tag: "PRESENT",
            description:
                "I'm currently building my own personal website and the Our Little World project. I'm also documenting my progress as an IT student and developer while continuing to learn, experiment, and build.",
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
                threshold: 0.1,
            }
        );

        if (journeyRef.current) {
            observer.observe(journeyRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={journeyRef}
            id="journey"
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
            <div className="relative max-w-6xl mx-auto">

                {/* Header */}
                <div
                    className={`
                        mb-20
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

                        <p className="text-xs font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
                        <h1
                            className="
                                text-6xl
                                md:text-8xl
                                font-bold
                                leading-[0.82]
                                tracking-[-0.05em]
                            "
                        >
                            The Road
                            <br />
                            <span className="text-[#555]">
                                So Far
                            </span>
                            <span className="text-red-500">.</span>
                        </h1>

                        <p
                            className="
                                text-gray-500
                                text-base
                                md:text-lg
                                leading-relaxed
                                max-w-md
                                lg:ml-auto
                            "
                        >
                            The technologies, experiences, and projects that
                            shaped how I approach development today.
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">

                    {/* Timeline Line */}
                    <div
                        className="
                            absolute
                            left-[7px]
                            top-2
                            bottom-2
                            w-px
                            bg-[#252525]
                            md:left-[11px]
                        "
                    ></div>

                    <div className="space-y-12 md:space-y-16">
                        {journey.map((item, index) => (
                            <article
                                key={`${item.title}-${item.year}`}
                                className={`
                                    relative
                                    pl-10
                                    md:pl-16
                                    transition-all
                                    duration-700
                                    ${
                                        isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-10"
                                    }
                                `}
                                style={{
                                    transitionDelay: `${150 + index * 100}ms`,
                                }}
                            >
                                {/* Timeline Dot */}
                                <div
                                    className="
                                        absolute
                                        left-0
                                        top-2
                                        flex
                                        items-center
                                        justify-center
                                        w-4
                                        h-4
                                        md:w-6
                                        md:h-6
                                        rounded-full
                                        bg-black
                                        border
                                        border-[#444]
                                        transition-all
                                        duration-300
                                        group-hover:border-red-500
                                    "
                                >
                                    <span
                                        className="
                                            w-1.5
                                            h-1.5
                                            md:w-2
                                            md:h-2
                                            rounded-full
                                            bg-red-500
                                            transition-all
                                            duration-300
                                        "
                                    ></span>
                                </div>

                                {/* Content */}
                                <div className="group">

                                    {/* Meta */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                                        <span
                                            className="
                                                text-red-500
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-[0.2em]
                                            "
                                        >
                                            {item.tag}
                                        </span>

                                        <span className="hidden md:block text-[#333]">
                                            /
                                        </span>

                                        <span
                                            className="
                                                text-xs
                                                uppercase
                                                tracking-[0.18em]
                                                text-gray-600
                                            "
                                        >
                                            {item.year}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2
                                        className="
                                            text-2xl
                                            md:text-4xl
                                            font-bold
                                            tracking-tight
                                            leading-tight
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    >
                                        {item.title}
                                        <span className="text-red-500">.</span>
                                    </h2>

                                    {/* Description */}
                                    <p
                                        className="
                                            mt-4
                                            max-w-3xl
                                            text-sm
                                            md:text-base
                                            text-gray-500
                                            leading-relaxed
                                            transition-colors
                                            duration-300
                                            group-hover:text-gray-300
                                        "
                                    >
                                        {item.description}
                                    </p>

                                    {/* Bottom line */}
                                    <div
                                        className="
                                            mt-7
                                            h-px
                                            w-full
                                            max-w-3xl
                                            bg-[#181818]
                                            relative
                                            overflow-hidden
                                        "
                                    >
                                        <span
                                            className="
                                                absolute
                                                left-0
                                                top-0
                                                h-full
                                                w-0
                                                bg-red-500
                                                transition-all
                                                duration-500
                                                group-hover:w-16
                                            "
                                        ></span>
                                    </div>

                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Bottom Statement */}
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
                        transitionDelay: "1050ms",
                    }}
                >
                    <span className="w-8 h-px bg-red-500"></span>

                    <p className="text-sm text-gray-600">
                        Still learning. Still building. Still moving forward.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Journey;
