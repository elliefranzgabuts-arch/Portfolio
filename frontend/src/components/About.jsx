import { useEffect, useRef, useState } from "react";
import {
    ArrowDownRight,
    Code2,
    GraduationCap,
    Music2,
} from "lucide-react";

const KUNADU_FB = "https://www.facebook.com/share/19bkUCLAtp/";

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
            className="bg-black text-white px-6 md:px-10 py-28 scroll-mt-24 overflow-hidden"
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
                    />

                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                        About Me
                    </p>
                </div>

                {/* Main Heading */}
                <div
                    className={`
                        mb-20
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
                        Beyond the code
                    </p>

                    <div className="flex items-end justify-between gap-8">
                        <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                            Who
                            <br />
                            <span className="text-[#777] transition-colors duration-500 hover:text-white">
                                I am<span className="text-red-500">.</span>
                            </span>
                        </h1>

                        <div className="hidden md:flex items-center gap-3 text-[#555] pb-2">
                            <ArrowDownRight
                                size={20}
                                strokeWidth={1.5}
                            />

                            <span className="text-xs uppercase tracking-[0.2em]">
                                Get to know me
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-24">

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
                        <div className="relative pl-6 group">
                            <span
                                className="
                                    absolute
                                    left-0
                                    top-0
                                    w-1
                                    h-full
                                    bg-red-500
                                    transition-all duration-500
                                    group-hover:h-[calc(100%+8px)]
                                    group-hover:bg-red-400
                                "
                            />

                            <p
                                className="
                                    text-xl md:text-2xl
                                    text-[#a3a3a3]
                                    leading-relaxed
                                    transition-colors duration-500
                                    group-hover:text-white
                                "
                            >
                                I'm a student and developer who enjoys
                                learning through the things I build,
                                create, and experience.
                            </p>
                        </div>

                        <p className="text-[#555] text-sm leading-relaxed mt-10 max-w-sm">
                            My journey started with curiosity about technology.
                            Since then, I've been exploring web development,
                            building projects, and finding different ways to
                            turn ideas into something real.
                        </p>

                        <div className="mt-10 flex items-center gap-3 text-[#444]">
                            <Code2 size={18} strokeWidth={1.5} />

                            <span className="text-xs uppercase tracking-[0.2em]">
                                Learning through building
                            </span>
                        </div>
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
                            of Iloilo with a growing interest in web
                            development and technology.
                        </p>

                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            I'm currently learning web development with
                            HTML, CSS, JavaScript, and Tailwind CSS. I'm also
                            exploring backend development and learning how
                            different parts of a system work together.
                        </p>

                        {/* Vibe Coding */}
                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            I also use{" "}
                            <span className="text-white font-medium">
                                vibe coding
                            </span>{" "}
                            as part of how I learn and build. I use AI as a
                            tool to explore ideas, understand unfamiliar code,
                            experiment with different approaches, and turn
                            concepts into working projects faster. I still
                            review, test, modify, and learn from what I build
                            along the way.
                        </p>

                        {/* Music */}
                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            Outside academics and development, music is also
                            a part of my life. I'm part of{" "}
                            <span className="text-white font-medium">
                                KUNADU
                            </span>
                            , an alternative rock band from Iloilo.
                        </p>

                        <p className="transition-colors duration-300 hover:text-[#d4d4d4]">
                            With influences from emo, punk, and post-hardcore,
                            KUNADU gives me another space to be creative,
                            collaborate with others, and experience something
                            completely different from technology.
                        </p>

                        {/* Closing Statement */}
                        <div className="pt-4">
                            <p
                                className="
                                    text-white
                                    font-medium
                                    border-l
                                    border-red-500
                                    pl-5
                                    transition-all duration-300
                                    hover:text-red-400
                                    hover:translate-x-1
                                "
                            >
                                I'm still learning, still building, and still
                                finding different ways to create things that
                                feel like my own.
                            </p>
                        </div>
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
                                py-6
                                sm:pr-8
                                sm:border-r
                                border-[#242424]
                                transition-all duration-300
                                hover:-translate-y-1
                            "
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <GraduationCap
                                    size={18}
                                    strokeWidth={1.5}
                                    className="text-red-500"
                                />

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
                                    Currently
                                </p>
                            </div>

                            <p
                                className="
                                    text-lg
                                    text-white
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
                                py-6
                                sm:px-8
                                sm:border-r
                                border-[#242424]
                                transition-all duration-300
                                hover:-translate-y-1
                            "
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Code2
                                    size={18}
                                    strokeWidth={1.5}
                                    className="text-red-500"
                                />

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
                                    Focus
                                </p>
                            </div>

                            <p
                                className="
                                    text-lg
                                    text-white
                                    transition-transform duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                Web Development
                            </p>
                        </div>

                        {/* Beyond Code */}
                        <div
                            className="
                                group
                                py-6
                                sm:pl-8
                                transition-all duration-300
                                hover:-translate-y-1
                            "
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Music2
                                    size={18}
                                    strokeWidth={1.5}
                                    className="
                                        text-red-500
                                        transition-transform duration-300
                                        group-hover:translate-x-1
                                    "
                                />

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
                                    Beyond Code
                                </p>
                            </div>

                            <a
                                href={KUNADU_FB}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-block
                                    text-lg
                                    text-white
                                    transition-all duration-300
                                    hover:text-red-400
                                    hover:translate-x-1
                                    focus:outline-none
                                    focus-visible:ring-1
                                    focus-visible:ring-red-500
                                "
                                aria-label="Visit KUNADU on Facebook"
                            >
                                KUNADU
                            </a>

                            <p className="text-sm text-[#555] mt-2">
                                Part of the band
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default About;
