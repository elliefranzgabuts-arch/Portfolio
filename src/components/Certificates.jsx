import { useEffect, useRef, useState } from "react";

import certificate1 from "../assets/images/certificate1.jpeg";
import certificate2 from "../assets/images/certificate2.jpeg";

function Certificates() {
    const [isVisible, setIsVisible] = useState(false);
    const certificatesRef = useRef(null);

    const certificates = [
        {
            number: "01",
            title: "Certificate of Completion",
            description:
                "A certificate I received in recognition of my contribution as a Challenge Master during CITE 2025: Level Up! The Glitch Tower, held at PHINMA University of Iloilo.",
            year: "2025",
            image: certificate1,
        },
        {
            number: "02",
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

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={certificatesRef}
            id="certificates"
            className="bg-black text-white px-6 md:px-10 py-28 scroll-mt-24 overflow-hidden"
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
                            Certificates
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

                        <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                            Learning
                            <br />
                            <span className="text-[#777]">
                                Along The Way
                                <span className="text-red-500">.</span>
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            Certificates and experiences I've gained through
                            school activities, events, and opportunities to
                            learn beyond the classroom.
                        </p>

                    </div>
                </div>

                {/* CERTIFICATES */}
                <div>
                    {certificates.map((certificate, index) => (
                        <article
                            key={certificate.number}
                            className={`
                                group
                                border-t
                                border-[#242424]
                                py-10
                                md:py-14
                                transition-all
                                duration-700
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-12"
                                }
                            `}
                            style={{
                                transitionDelay: `${200 + index * 180}ms`,
                            }}
                        >
                            {/* RED TOP LINE */}
                            <div
                                className="
                                    absolute
                                    left-0
                                    w-0
                                    h-px
                                    bg-red-500
                                    transition-all
                                    duration-500
                                    group-hover:w-full
                                "
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">

                                {/* CERTIFICATE IMAGE */}
                                <div className="relative overflow-hidden bg-[#080808]">
                                    <img
                                        src={certificate.image}
                                        alt={certificate.title}
                                        className="
                                            block
                                            w-full
                                            h-auto
                                            transition-transform
                                            duration-700
                                            group-hover:scale-[1.02]
                                        "
                                    />

                                    {/* YEAR */}
                                    <div
                                        className="
                                            absolute
                                            top-4
                                            right-4
                                            md:top-6
                                            md:right-6
                                            bg-black/80
                                            backdrop-blur-sm
                                            px-3
                                            py-2
                                        "
                                    >
                                        <span className="text-xs text-gray-300 tracking-[0.15em]">
                                            {certificate.year}
                                        </span>
                                    </div>
                                </div>

                                {/* DETAILS */}
                                <div>

                                    <div className="flex items-center gap-4 mb-5">
                                        <span className="text-red-500 text-sm font-semibold tracking-[0.2em]">
                                            {certificate.number}
                                        </span>

                                        <span className="w-8 h-px bg-[#333]"></span>

                                        <p className="text-gray-600 text-xs font-semibold tracking-[0.2em] uppercase">
                                            Certificate
                                        </p>
                                    </div>

                                    <h2
                                        className="
                                            text-3xl
                                            md:text-4xl
                                            font-bold
                                            tracking-tight
                                            leading-tight
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    >
                                        {certificate.title}
                                        <span className="text-red-500">.</span>
                                    </h2>

                                    <p className="text-gray-400 leading-relaxed mt-6 max-w-xl">
                                        {certificate.description}
                                    </p>

                                    <div className="mt-8 flex items-center gap-4">
                                        <span className="text-xs text-gray-600 tracking-[0.2em] uppercase">
                                            Year
                                        </span>

                                        <span className="text-sm text-gray-300">
                                            {certificate.year}
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </article>
                    ))}
                </div>

                {/* BOTTOM */}
                <div
                    className={`
                        border-t
                        border-[#242424]
                        pt-6
                        mt-0
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
                        transitionDelay: "700ms",
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
