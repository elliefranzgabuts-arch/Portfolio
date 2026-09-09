function Certificates() {
    const certificates = [
        {
            number: "01",
            title: "Certificate of Participation",
            description:
                "A certificate I received from participating in a school seminar. Experiences like these help me learn beyond the classroom and explore different areas of technology.",
            year: "2026",
        },
    ];

    return (
        <section
            id="certificates"
            className="bg-black text-white px-6 md:px-10 py-28"
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-16">

                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Certificates
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

                        <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                            Learning
                            <br />
                            <span className="text-red-500">
                                Along The Way.
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            Certificates and experiences I've gained through
                            school seminars, activities, and opportunities
                            to learn outside the classroom.
                        </p>

                    </div>

                </div>


                {/* Certificates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {certificates.map((certificate) => (
                        <article
                            key={certificate.number}
                            className="
                                group
                                relative
                                border
                                border-[#242424]
                                rounded-2xl
                                bg-[#080808]
                                p-5
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:border-red-500/70
                            "
                        >

                            {/* Red accent */}
                            <div
                                className="
                                    absolute
                                    top-0
                                    left-8
                                    right-8
                                    h-px
                                    bg-red-500
                                    scale-x-0
                                    origin-left
                                    transition-transform
                                    duration-500
                                    group-hover:scale-x-100
                                "
                            />


                            {/* Certificate Preview */}
                            <div
                                className="
                                    relative
                                    h-72
                                    md:h-80
                                    rounded-xl
                                    bg-black
                                    border
                                    border-[#242424]
                                    overflow-hidden
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <div className="text-center">

                                    <p className="text-[#333] text-5xl font-bold">
                                        {certificate.number}
                                    </p>

                                    <p className="text-[#444] text-sm mt-3 tracking-[0.2em] uppercase">
                                        Certificate Preview
                                    </p>

                                </div>


                                {/* Year */}
                                <div className="absolute top-5 right-5">
                                    <span
                                        className="
                                            border
                                            border-[#333]
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            text-gray-400
                                        "
                                    >
                                        {certificate.year}
                                    </span>
                                </div>

                            </div>


                            {/* Details */}
                            <div className="px-2 pt-7 pb-3">

                                <div className="flex items-start justify-between gap-5">

                                    <div>

                                        <p className="text-red-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                                            Certificate {certificate.number}
                                        </p>

                                        <h2 className="text-2xl md:text-3xl font-bold">
                                            {certificate.title}
                                            <span className="text-red-500">
                                                .
                                            </span>
                                        </h2>

                                    </div>

                                    <span className="text-[#333] text-4xl font-bold">
                                        {certificate.number}
                                    </span>

                                </div>


                                <p className="text-gray-400 leading-relaxed mt-5">
                                    {certificate.description}
                                </p>

                            </div>

                        </article>
                    ))}

                </div>


                {/* Bottom message */}
                <div className="mt-12 border-t border-[#1f1f1f] pt-6 flex items-center gap-4">

                    <span className="w-8 h-px bg-red-500"></span>

                    <p className="text-sm text-gray-600">
                        Every seminar is another opportunity to learn
                        something new.
                    </p>

                </div>

            </div>
        </section>
    );
}

export default Certificates;