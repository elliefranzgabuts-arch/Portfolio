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

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={homeRef}
            id="home"
            className="
                relative
                min-h-screen
                scroll-mt-24
                bg-black
                text-white
                px-6
                md:px-10
                pt-28
                pb-16
                flex
                items-center
                overflow-hidden
            "
        >
            {/* Subtle background accent */}
            <div
                className="
                    absolute
                    top-0
                    right-0
                    w-[35vw]
                    h-[35vw]
                    max-w-[500px]
                    max-h-[500px]
                    rounded-full
                    bg-red-500/[0.025]
                    blur-3xl
                    pointer-events-none
                "
            ></div>

            <div className="relative max-w-7xl mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">

                    {/* LEFT SIDE */}
                    <div>

                        {/* Intro Label */}
                        <div
                            className={`
                                flex
                                items-center
                                gap-4
                                mb-7
                                transition-all
                                duration-700
                                ease-out
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                            `}
                        >
                            <span className="w-10 h-px bg-red-500"></span>

                            <p className="text-xs md:text-sm tracking-[0.28em] text-gray-500 uppercase">
                                BSIT Student / Developer
                            </p>
                        </div>

                        {/* Name */}
                        <h1
                            className={`
                                text-[4.5rem]
                                sm:text-7xl
                                md:text-8xl
                                lg:text-[7.5rem]
                                font-bold
                                leading-[0.82]
                                tracking-[-0.055em]
                                transition-all
                                duration-1000
                                ease-out
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }
                            `}
                        >
                            Ellie
                            <br />

                            <span className="text-[#555]">
                                Franz
                                <span className="text-red-500">.</span>
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            className={`
                                max-w-xl
                                text-gray-400
                                text-base
                                md:text-lg
                                leading-relaxed
                                mt-9
                                transition-all
                                duration-700
                                ease-out
                                delay-200
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
                                }
                            `}
                        >
                            I'm a 3rd-year BSIT student learning web
                            development and building projects along the way.
                            I enjoy turning ideas into something real through
                            code and design.
                        </p>

                        {/* Tagline */}
                        <div
                            className={`
                                flex
                                items-center
                                gap-3
                                mt-6
                                transition-all
                                duration-700
                                ease-out
                                delay-300
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                            `}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>

                            <p className="text-sm text-gray-600 tracking-wide">
                                Still learning. Still building.
                            </p>
                        </div>

                        {/* CTA */}
                        <div
                            className={`
                                flex
                                flex-wrap
                                items-center
                                gap-7
                                mt-10
                                transition-all
                                duration-700
                                ease-out
                                delay-400
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-5"
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
                                    text-sm
                                    md:text-base
                                    font-semibold
                                    transition-colors
                                    duration-300
                                    hover:text-red-400
                                "
                            >
                                <span>View Projects</span>

                                <span
                                    className="
                                        text-red-500
                                        text-lg
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-2
                                    "
                                >
                                    →
                                </span>
                            </a>

                            {/* Contact */}
                            <a
                                href="#contact"
                                className="
                                    group
                                    relative
                                    inline-flex
                                    items-center
                                    px-5
                                    py-2.5
                                    border
                                    border-[#292929]
                                    text-gray-400
                                    text-sm
                                    md:text-base
                                    font-semibold
                                    transition-all
                                    duration-300
                                    hover:border-red-500/60
                                    hover:text-white
                                    hover:bg-red-500/[0.04]
                                "
                            >
                                Contact Me

                                <span
                                    className="
                                        absolute
                                        -bottom-px
                                        left-0
                                        h-px
                                        w-0
                                        bg-red-500
                                        transition-all
                                        duration-300
                                        group-hover:w-full
                                    "
                                ></span>
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
                            delay-200
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-10"
                            }
                        `}
                    >
                        {/* Photo */}
                        <div className="relative w-72 h-[25rem] md:w-80 md:h-[30rem] lg:w-[22rem] lg:h-[32rem]">

                            {/* Back Frame */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    border
                                    border-[#252525]
                                    translate-x-4
                                    translate-y-4
                                    transition-all
                                    duration-500
                                    group-hover:translate-x-6
                                    group-hover:translate-y-6
                                "
                            ></div>

                            {/* Image Frame */}
                            <div
                                className="
                                    group
                                    relative
                                    w-full
                                    h-full
                                    overflow-hidden
                                    bg-[#080808]
                                    border
                                    border-[#292929]
                                    transition-all
                                    duration-500
                                    hover:border-red-500/50
                                    hover:-translate-y-1
                                "
                            >
                                <img
                                    src={aboutMe}
                                    alt="Ellie Franz"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                        transition-transform
                                        duration-700
                                        ease-out
                                        group-hover:scale-[1.035]
                                    "
                                />

                                {/* Image Gradient */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-gradient-to-t
                                        from-black/75
                                        via-transparent
                                        to-transparent
                                        opacity-80
                                        transition-opacity
                                        duration-500
                                        group-hover:opacity-60
                                    "
                                ></div>

                                {/* Bottom Information */}
                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        right-0
                                        px-5
                                        py-5
                                        border-t
                                        border-white/10
                                        bg-black/60
                                        backdrop-blur-sm
                                    "
                                >
                                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                                        Currently
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-white">
                                        Learning & Building
                                    </p>
                                </div>

                                {/* Red Corner */}
                                <div
                                    className="
                                        absolute
                                        top-0
                                        right-0
                                        w-12
                                        h-12
                                        border-t
                                        border-r
                                        border-red-500
                                        transition-all
                                        duration-500
                                        group-hover:w-16
                                        group-hover:h-16
                                    "
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    className={`
                        hidden
                        md:flex
                        items-center
                        gap-4
                        mt-20
                        text-gray-700
                        transition-all
                        duration-700
                        ease-out
                        delay-700
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }
                    `}
                >
                    <span className="w-8 h-px bg-[#252525]"></span>

                    <span className="text-[10px] tracking-[0.3em] uppercase">
                        Scroll to explore
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Home;

