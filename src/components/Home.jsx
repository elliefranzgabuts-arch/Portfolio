import { useEffect, useRef, useState } from "react";
import aboutMe from "../assets/images/aboutme.jpeg";

function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const homeRef = useRef(null);

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

        if (homeRef.current) {
            observer.observe(homeRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={homeRef}
            id="home"
            className="
                min-h-screen
                scroll-mt-24
                bg-black
                text-white
                px-6
                md:px-10
                pt-28
                pb-20
                flex
                items-center
                overflow-hidden
            "
        >
            <div className="max-w-6xl mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

                    {/* LEFT SIDE */}
                    <div>

                        {/* Section Label */}
                        <div
                            className={`
                                flex
                                items-center
                                gap-4
                                mb-8
                                transition-all
                                duration-700
                                ease-out
                                ${
                                    isVisible
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-8"
                                }
                            `}
                        >
                            <span className="w-10 h-px bg-red-500"></span>

                            <p className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                                BSIT Student / Developer
                            </p>
                        </div>

                        {/* Name */}
                        <h1
                            className={`
                                text-6xl
                                md:text-7xl
                                lg:text-8xl
                                font-bold
                                leading-[0.9]
                                tracking-tight
                                transition-all
                                duration-1000
                                ease-out
                                delay-100
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }
                            `}
                        >
                            Ellie
                            <br />

                            <span className="text-gray-500">
                                Franz
                                <span className="text-red-500">.</span>
                            </span>
                        </h1>

                        {/* Introduction */}
                        <p
                            className={`
                                text-gray-400
                                text-lg
                                md:text-xl
                                leading-relaxed
                                max-w-xl
                                mt-10
                                transition-all
                                duration-700
                                ease-out
                                delay-200
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-6"
                                }
                            `}
                        >
                            I'm a 3rd-year BSIT student learning web
                            development and building projects along the way.
                            I enjoy turning ideas into something real through
                            code and design.
                        </p>

                        {/* Tagline */}
                        <p
                            className={`
                                text-gray-600
                                mt-5
                                text-sm
                                tracking-wide
                                transition-all
                                duration-700
                                ease-out
                                delay-300
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                }
                            `}
                        >
                            Still learning. Still building.
                        </p>

                        {/* BUTTONS */}
                        <div
                            className={`
                                flex
                                flex-wrap
                                items-center
                                gap-8
                                mt-10
                                transition-all
                                duration-700
                                ease-out
                                delay-[400ms]
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-6"
                                }
                            `}
                        >

                            {/* View Projects */}
                            <a
                                href="#projects"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-3
                                    text-white
                                    font-semibold
                                "
                            >
                                <span className="relative pb-1">
                                    <span
                                        className="
                                            transition-colors
                                            duration-300
                                            group-hover:text-red-500
                                        "
                                    >
                                        View Projects
                                    </span>

                                    <span
                                        className="
                                            absolute
                                            left-0
                                            bottom-0
                                            h-px
                                            w-full
                                            bg-red-500
                                            origin-left
                                            transition-transform
                                            duration-500
                                            ease-out
                                            group-hover:scale-x-0
                                        "
                                    />
                                </span>

                                <span
                                    className="
                                        text-red-500
                                        text-xl
                                        transition-all
                                        duration-500
                                        ease-out
                                        group-hover:translate-x-2
                                        group-hover:text-white
                                    "
                                >
                                    →
                                </span>
                            </a>

                            {/* Contact Me */}
                            <a
                                href="#contact"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-3
                                    text-gray-400
                                    font-semibold
                                    transition-colors
                                    duration-300
                                    hover:text-white
                                "
                            >
                                <span className="relative pb-1">
                                    <span
                                        className="
                                            transition-colors
                                            duration-300
                                            group-hover:text-red-500
                                        "
                                    >
                                        Contact Me
                                    </span>

                                    <span
                                        className="
                                            absolute
                                            left-0
                                            bottom-0
                                            h-px
                                            w-full
                                            bg-red-500
                                            origin-left
                                            scale-x-0
                                            transition-transform
                                            duration-500
                                            ease-out
                                            group-hover:scale-x-100
                                        "
                                    />
                                </span>

                                <span
                                    className="
                                        text-gray-600
                                        text-xl
                                        transition-all
                                        duration-500
                                        ease-out
                                        group-hover:translate-x-2
                                        group-hover:text-red-500
                                    "
                                >
                                    →
                                </span>
                            </a>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div
                        className={`
                            relative
                            flex
                            justify-center
                            lg:justify-end
                            transition-all
                            duration-1000
                            ease-out
                            delay-300
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0 scale-100"
                                    : "opacity-0 translate-x-12 scale-95"
                            }
                        `}
                    >

                        {/* Decorative Number */}
                        <span
                            className={`
                                absolute
                                -top-10
                                -right-2
                                md:right-4
                                text-[8rem]
                                md:text-[11rem]
                                font-bold
                                text-gray-900
                                select-none
                                pointer-events-none
                                transition-all
                                duration-1000
                                ease-out
                                delay-500
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-6"
                                }
                            `}
                        >
                            01
                        </span>

                        {/* Photo Frame */}
                        <div
                            className="
                                relative
                                w-72
                                h-96
                                md:w-80
                                md:h-[28rem]
                                border
                                border-gray-800
                                rounded-2xl
                                p-3
                                bg-gray-950
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-red-500/60
                                hover:shadow-[0_0_30px_rgba(239,68,68,0.12)]
                            "
                        >
                            <div
                                className="
                                    relative
                                    w-full
                                    h-full
                                    rounded-xl
                                    overflow-hidden
                                    bg-black
                                "
                            >

                                {/* Profile Image */}
                                <img
                                    src={aboutMe}
                                    alt="Ellie"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                        transition-transform
                                        duration-700
                                        ease-out
                                        hover:scale-105
                                    "
                                />

                                {/* Bottom Label */}
                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        right-0
                                        bg-black/80
                                        backdrop-blur-sm
                                        border-t
                                        border-gray-800
                                        px-5
                                        py-4
                                    "
                                >
                                    <p className="text-sm text-gray-500">
                                        Currently
                                    </p>

                                    <p className="text-white font-medium mt-1">
                                        Learning & Building
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Red Accent */}
                        <div
                            className={`
                                absolute
                                -bottom-5
                                -left-2
                                md:left-6
                                w-20
                                h-20
                                border-l
                                border-b
                                border-red-500
                                transition-all
                                duration-1000
                                ease-out
                                delay-700
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                }
                            `}
                        />

                    </div>

                </div>

                {/* Bottom Indicator */}
                <div
                    className={`
                        hidden
                        md:flex
                        items-center
                        gap-4
                        mt-20
                        text-gray-600
                        transition-all
                        duration-1000
                        ease-out
                        delay-[900ms]
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                        }
                    `}
                >
                    <span className="w-8 h-px bg-gray-800"></span>

                    <span className="text-xs tracking-[0.25em] uppercase">
                        Scroll to explore
                    </span>
                </div>

            </div>
        </section>
    );
}

export default Home;    
