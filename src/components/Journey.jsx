import { useEffect, useRef, useState } from "react";

function Journey() {
    const [isVisible, setIsVisible] = useState(false);
    const journeyRef = useRef(null);

    const journey = [
        {
            number: "01",
            year: "2024–2025",
            title: "Started With Python",
            tag: "FIRST YEAR",
            description:
                "My journey in IT started during my first year of college at PHINMA University of Iloilo. I was introduced to Python and learned the fundamentals of programming. For our final project, I worked on a 2D story-based project with a horror-style concept.",
        },
        {
            number: "02",
            year: "2025–2026",
            title: "HTML & CSS",
            tag: "SECOND YEAR · FIRST SEMESTER",
            description:
                "During the first semester of my second year, I was introduced to web development through HTML and CSS. This was one of my first experiences creating and styling websites.",
        },
        {
            number: "03",
            year: "2025–2026",
            title: "Learning Java",
            tag: "SECOND YEAR",
            description:
                "I continued developing my programming foundation through Java. Working on different projects helped me understand programming concepts and gave me more experience writing and organizing code.",
        },
        {
            number: "04",
            year: "2025–2026",
            title: "Mobile, Arduino & APIs",
            tag: "SECOND YEAR · SECOND SEMESTER",
            description:
                "I was introduced to mobile application development using Expo Go while also gaining experience with Arduino and APIs. I was still learning these technologies, but the experience allowed me to explore different areas of technology and contribute to our projects.",
        },
        {
            number: "05",
            year: "DURING COLLEGE",
            title: "Seminars & Certifications",
            tag: "LEARNING OUTSIDE CLASS",
            description:
                "Throughout college, I also participated in seminars and learning activities that helped me gain knowledge beyond regular classroom lessons. These experiences and certifications became part of my continuous learning as an IT student.",
        },
        {
            number: "06",
            year: "2026–2027",
            title: "Web Development",
            tag: "THIRD YEAR",
            description:
                "Now in my third year, I started focusing more on web development. I'm learning HTML, CSS, JavaScript, Tailwind CSS, React, Node.js, Express.js, SQL/MySQL, Git, and GitHub while building projects and understanding how different parts of an application work together.",
        },
        {
            number: "07",
            year: "2026–2027",
            title: "Philippine Startup Challenge XI",
            tag: "DICT · UI/UX",
            description:
                "I participated in the Philippine Startup Challenge XI as part of my team's UI/UX role. This gave me an opportunity to apply what I've been learning in design and technology while working with a team to develop a startup solution.",
        },
        {
            number: "08",
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
                threshold: 0.15,
            }
        );

        if (journeyRef.current) {
            observer.observe(journeyRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={journeyRef}
            id="journey"
            className="bg-black text-white px-6 md:px-10 py-28 scroll-mt-24 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
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
                            Journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

                        <h1 className="text-6xl md:text-7xl font-bold leading-[0.85] tracking-tight uppercase">
                            The Road
                            <br />
                            <span className="text-red-500">
                                So Far.
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            The technologies, experiences, and projects that
                            shaped how I approach development today.
                        </p>

                    </div>
                </div>


                {/* Journey Entries */}
                <div className="space-y-5">

                    {journey.map((item, index) => (
                        <article
                            key={item.number}
                            className={`
                                group
                                relative
                                border
                                border-[#242424]
                                rounded-2xl
                                bg-[#080808]
                                overflow-hidden
                                transition-all
                                duration-700
                                hover:-translate-y-1
                                hover:border-red-500/70
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-12"
                                }
                            `}
                            style={{
                                transitionDelay: `${200 + index * 100}ms`,
                            }}
                        >

                            {/* Red accent */}
                            <div
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    bottom-0
                                    w-px
                                    bg-red-500
                                    scale-y-0
                                    origin-top
                                    transition-transform
                                    duration-500
                                    group-hover:scale-y-100
                                "
                            />

                            <div className="p-6 md:p-8 lg:p-10">

                                {/* Top row */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                                    <div className="flex items-start gap-5 md:gap-7">

                                        {/* Number */}
                                        <div className="shrink-0">

                                            <span
                                                className="
                                                    text-red-500
                                                    text-sm
                                                    font-semibold
                                                    tracking-[0.2em]
                                                "
                                            >
                                                {item.number}
                                            </span>

                                            <div
                                                className="
                                                    text-[#202020]
                                                    text-4xl
                                                    md:text-5xl
                                                    font-bold
                                                    leading-none
                                                    mt-2
                                                    transition-colors
                                                    duration-300
                                                    group-hover:text-[#303030]
                                                "
                                            >
                                                {item.number}
                                            </div>

                                        </div>


                                        {/* Main information */}
                                        <div>

                                            <p
                                                className="
                                                    text-red-500
                                                    text-xs
                                                    font-semibold
                                                    tracking-[0.2em]
                                                    uppercase
                                                "
                                            >
                                                {item.tag}
                                            </p>

                                            <h2
                                                className="
                                                    text-2xl
                                                    md:text-4xl
                                                    font-bold
                                                    mt-2
                                                    tracking-tight
                                                    transition-transform
                                                    duration-300
                                                    group-hover:translate-x-1
                                                "
                                            >
                                                {item.title}
                                                <span className="text-red-500">
                                                    .
                                                </span>
                                            </h2>

                                        </div>

                                    </div>


                                    {/* Year */}
                                    <div className="md:text-right md:pl-6">

                                        <p className="text-xs text-gray-600 tracking-[0.2em] uppercase">
                                            Timeline
                                        </p>

                                        <p
                                            className="
                                                text-xl
                                                md:text-2xl
                                                font-semibold
                                                text-gray-300
                                                mt-1
                                                transition-colors
                                                duration-300
                                                group-hover:text-white
                                            "
                                        >
                                            {item.year}
                                        </p>

                                    </div>

                                </div>


                                {/* Divider */}
                                <div className="h-px bg-[#242424] my-7 group-hover:bg-[#333] transition-colors duration-300" />


                                {/* Description */}
                                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">

                                    <p className="text-gray-400 leading-relaxed max-w-3xl">
                                        {item.description}
                                    </p>

                                    <div
                                        className="
                                            hidden
                                            md:flex
                                            items-center
                                            justify-center
                                            w-10
                                            h-10
                                            rounded-full
                                            border
                                            border-[#292929]
                                            text-gray-600
                                            transition-all
                                            duration-300
                                            group-hover:border-red-500
                                            group-hover:text-red-500
                                            group-hover:translate-x-1
                                        "
                                    >
                                        →
                                    </div>

                                </div>

                            </div>

                        </article>
                    ))}

                </div>


                {/* Bottom statement */}
                <div
                    className={`
                        mt-14
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
                        transitionDelay: "1200ms",
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
