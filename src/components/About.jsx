import { useEffect, useRef, useState } from "react";

function About({ name }) {
    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = useRef(null);

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

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={aboutRef}
            id="about"
            className="bg-black text-white px-6 md:px-10 py-28 scroll-mt-24"
        >
            <div className="max-w-6xl mx-auto">

                {/* Section Label */}
                <div
                    className={`
                        flex items-center gap-4 mb-16
                        transition-all duration-700
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }
                    `}
                >
                    <span
                        className="
                            w-10 h-px
                            bg-red-500
                            transition-all duration-500
                            hover:w-16
                        "
                    ></span>

                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                        About Me
                    </p>
                </div>

                {/* Main Heading */}
                <div
                    className={`
                        mb-16
                        transition-all duration-700
                        delay-100
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }
                    `}
                >
                    <p className="text-[#555] text-sm tracking-[0.3em] uppercase mb-5">
                        A little bit about
                    </p>

                    <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                        Who
                        <br />
                        <span className="text-[#777] transition-colors duration-500 hover:text-[#999]">
                            I am<span className="text-red-500">.</span>
                        </span>
                    </h1>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">

                    {/* LEFT INTRO */}
                    <div
                        className={`
                            transition-all duration-700
                            delay-200
                            ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }
                        `}
                    >
                        <div
                            className="
                                flex items-start gap-4
                                group
                            "
                        >
                            <span
                                className="
                                    w-1 h-24
                                    bg-red-500
                                    shrink-0
                                    transition-all duration-500
                                    group-hover:h-28
                                    group-hover:bg-red-400
                                "
                            ></span>

                            <p
                                className="
                                    text-xl md:text-2xl
                                    text-[#a3a3a3]
                                    leading-relaxed
                                    transition-colors duration-500
                                    group-hover:text-white
                                "
                            >
                                A student, a learner, and someone who enjoys
                                building things with technology.
                            </p>
                        </div>

                        <p className="text-[#555] text-sm leading-relaxed mt-10 max-w-sm">
                            Currently exploring web development while building
                            projects and learning how different technologies
                            work together.
                        </p>
                    </div>

                    {/* RIGHT DESCRIPTION */}
                    <div
                        className={`
                            space-y-6
                            text-[#a3a3a3]
                            text-lg
                            leading-relaxed
                            transition-all
                            duration-700
                            delay-300
                            ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }
                        `}
                    >
                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            I'm{" "}
                            <span className="text-white font-medium">
                                {name}
                            </span>
                            , a 3rd-year BSIT student at PHINMA University
                            of Iloilo with a passion for web development
                            and technology.
                        </p>

                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            I'm currently learning frontend development using
                            HTML, CSS, JavaScript, Tailwind CSS, and React.
                            I'm also exploring backend development with
                            Python, Flask, and FastAPI.
                        </p>

                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            Along the way, I'm learning tools such as Git,
                            GitHub, Figma, VS Code, and MySQL while applying
                            what I learn through actual projects.
                        </p>

                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            I started this journey from scratch, and I'm still
                            learning every day. I'm focused on improving,
                            building, experimenting, and gradually finding
                            my direction as a developer.
                        </p>

                        <p
                            className="
                                text-white
                                font-medium
                                transition-all duration-300
                                hover:text-red-400
                                hover:translate-x-1
                            "
                        >
                            I'm still learning, building, and figuring things
                            out — one project at a time.
                        </p>
                    </div>
                </div>

                {/* Quick Information */}
                <div
                    className={`
                        mt-24
                        pt-8
                        border-t
                        border-[#242424]
                        transition-all
                        duration-700
                        delay-500
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }
                    `}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3">

                        {/* Currently */}
                        <div
                            className="
                                group
                                py-5
                                sm:pr-8
                                sm:border-r
                                border-[#242424]
                                transition-all duration-300
                                hover:-translate-y-1
                            "
                        >
                            <p
                                className="
                                    text-red-500
                                    text-xs
                                    font-semibold
                                    tracking-[0.2em]
                                    uppercase
                                    transition-colors duration-300
                                    group-hover:text-red-400
                                "
                            >
                                01 · Currently
                            </p>

                            <p
                                className="
                                    text-lg
                                    text-white
                                    mt-3
                                    transition-transform duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                3rd-year BSIT Student
                            </p>
                        </div>

                        {/* Focus */}
                        <div
                            className="
                                group
                                py-5
                                sm:px-8
                                sm:border-r
                                border-[#242424]
                                transition-all duration-300
                                hover:-translate-y-1
                            "
                        >
                            <p
                                className="
                                    text-red-500
                                    text-xs
                                    font-semibold
                                    tracking-[0.2em]
                                    uppercase
                                    transition-colors duration-300
                                    group-hover:text-red-400
                                "
                            >
                                02 · Focus
                            </p>

                            <p
                                className="
                                    text-lg
                                    text-white
                                    mt-3
                                    transition-transform duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                Web Development
                            </p>
                        </div>

                        {/* Mindset */}
                        <div
                            className="
                                group
                                py-5
                                sm:pl-8
                                transition-all duration-300
                                hover:-translate-y-1
                            "
                        >
                            <p
                                className="
                                    text-red-500
                                    text-xs
                                    font-semibold
                                    tracking-[0.2em]
                                    uppercase
                                    transition-colors duration-300
                                    group-hover:text-red-400
                                "
                            >
                                03 · Mindset
                            </p>

                            <p
                                className="
                                    text-lg
                                    text-white
                                    mt-3
                                    transition-transform duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                Still learning. Still building.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default About;
