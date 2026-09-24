import { useEffect, useRef, useState } from "react";

import certificate1 from "../assets/images/certificate1.jpeg";
import certificate2 from "../assets/images/certificate2.jpeg";

function Certificates() {
    const [isVisible, setIsVisible] = useState(false);
    const certificatesRef = useRef(null);

    const certificates = [
        {
            title: "Certificate of Completion",
            description:
                "A certificate I received in recognition of my contribution as a Challenge Master during CITE 2025: Level Up! The Glitch Tower, held at PHINMA University of Iloilo.",
            year: "2025",
            image: certificate1,
        },
        {
            title: "Certificate of Appreciation",
            description:
                "A certificate received for being part of a team that achieved Top 2 for exceptional website design in ITE 399 - Human Computer Interaction I.",
            year: "2025",
            image: certificate2,
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

        if (certificatesRef.current) {
            observer.observe(certificatesRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={certificatesRef}
            id="certificates"
            className="
                bg-black
                text-white
                px-6
                md:px-10
                py-28
                md:py-32
                scroll-mt-24
                overflow-hidden
            "
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
                                : "opacity-0 translate-y-8"
                        }
                    `}
                >
                    <div className="flex items-center gap-4 mb-7">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-xs font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Certificates
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
                            Learning
                            <br />
                            <span className="text-[#555]">
                                Along The Way
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
                            Certificates and experiences I've gained through
                            school activities, events, and opportunities to
                            learn beyond the classroom.
                        </p>
                    </div>
                </div>

                {/* Certificates */}
                <div className="space-y-16">
                    {certificates.map((certificate, index) => (
                        <article
                            key={certificate.title}
                            className={`
                                group
                                relative
                                transition-all
                                duration-700
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                }
                            `}
                            style={{
                                transitionDelay: `${200 + index * 180}ms`,
                            }}
                        >
                            {/* Top Border */}
                            <div
                                className="
                                    relative
                                    h-px
                                    w-full
                                    bg-[#222]
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
                                        duration-700
                                        group-hover:w-24
                                    "
                                ></span>
                            </div>

                            <div className="pt-8 md:pt-10">
                                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">

                                    {/* Certificate Image */}
                                    <div
                                        className="
                                            relative
                                            overflow-hidden
                                            bg-[#080808]
                                            border
                                            border-[#222]
                                            transition-all
                                            duration-500
                                            group-hover:border-[#3a3a3a]
                                            group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                                        "
                                    >
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
                                                Certificate
                                            </span>
                                        </div>

                                        <div className="relative overflow-hidden">
                                            <img
                                                src={certificate.image}
                                                alt={certificate.title}
                                                className="
                                                    block
                                                    w-full
                                                    h-auto
                                                    transition-transform
                                                    duration-700
                                                    group-hover:scale-[1.025]
                                                "
                                            />

                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-t
                                                    from-black/40
                                                    via-transparent
                                                    to-transparent
                                                    opacity-60
                                                    transition-opacity
                                                    duration-500
                                                    group-hover:opacity-30
                                                "
                                            ></div>

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

                                            <div
                                                className="
                                                    absolute
                                                    top-4
                                                    right-4
                                                    bg-black/80
                                                    border
                                                    border-white/10
                                                    px-3
                                                    py-2
                                                    backdrop-blur-sm
                                                "
                                            >
                                                <span className="text-xs text-gray-300 tracking-[0.15em]">
                                                    {certificate.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div>
                                        <div className="flex items-center gap-4 mb-5">
                                            <span className="w-8 h-px bg-red-500"></span>

                                            <p
                                                className="
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.25em]
                                                    text-gray-600
                                                    transition-colors
                                                    duration-300
                                                    group-hover:text-gray-400
                                                "
                                            >
                                                Certificate
                                            </p>
                                        </div>

                                        <h2
                                            className="
                                                text-3xl
                                                md:text-4xl
                                                font-bold
                                                tracking-tight
                                                leading-[1]
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        >
                                            {certificate.title}
                                            <span className="text-red-500">.</span>
                                        </h2>

                                        <p
                                            className="
                                                mt-6
                                                text-sm
                                                md:text-base
                                                text-gray-500
                                                leading-relaxed
                                                max-w-xl
                                                transition-colors
                                                duration-300
                                                group-hover:text-gray-300
                                            "
                                        >
                                            {certificate.description}
                                        </p>

                                        <div
                                            className="
                                                mt-8
                                                flex
                                                items-center
                                                gap-4
                                            "
                                        >
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                                                Year
                                            </span>

                                            <span className="w-8 h-px bg-[#333]"></span>

                                            <span
                                                className="
                                                    text-sm
                                                    text-gray-300
                                                    transition-colors
                                                    duration-300
                                                    group-hover:text-white
                                                "
                                            >
                                                {certificate.year}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Statement */}
                <div
                    className={`
                        mt-16
                        pt-8
                        border-t
                        border-[#181818]
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
                        transitionDelay: "650ms",
                    }}
                >
                    <span className="w-8 h-px bg-red-500"></span>

                    <p className="text-sm text-gray-600">
                        Every experience is another opportunity to learn
                        something new.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Certificates;
