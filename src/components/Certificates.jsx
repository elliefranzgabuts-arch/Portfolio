import certificate1 from "../assets/images/certificate1.jpeg";
import certificate2 from "../assets/images/certificate2.jpeg";

function Certificates() {
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
                            school activities, events, and opportunities to
                            learn beyond the classroom.
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

                            {/* Red Accent */}
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

                            {/* Certificate Image */}
                            <div
                                className="
                                    relative
                                    rounded-xl
                                    bg-black
                                    border
                                    border-[#242424]
                                    overflow-hidden
                                "
                            >
                                <img
                                    src={certificate.image}
                                    alt={certificate.title}
                                    className="
                                        w-full
                                        h-auto
                                        object-cover
                                        transition-transform
                                        duration-500
                                        group-hover:scale-[1.02]
                                    "
                                />

                                {/* Year */}
                                <div className="absolute top-5 right-5">
                                    <span
                                        className="
                                            border
                                            border-white/20
                                            bg-black/70
                                            backdrop-blur-sm
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            text-gray-300
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


                {/* Bottom Message */}
                <div className="mt-12 border-t border-[#1f1f1f] pt-6 flex items-center gap-4">

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