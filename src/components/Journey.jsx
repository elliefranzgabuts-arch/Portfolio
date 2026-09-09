function Journey() {
    const journey = [
        {
            number: "01",
            title: "Started From Scratch",
            description:
                "I started my journey in IT with curiosity and a lot of things I didn't know yet. I slowly began learning how websites and applications work.",
        },
        {
            number: "02",
            title: "Learning Web Development",
            description:
                "As I continued studying, I started exploring HTML, CSS, JavaScript, and other technologies while creating small projects along the way.",
        },
        {
            number: "03",
            title: "Exploring More",
            description:
                "I started exploring backend development, databases, Git, GitHub, and different tools that helped me understand how real applications are built.",
        },
        {
            number: "04",
            title: "Learning Beyond The Classroom",
            description:
                "I sometimes join seminars and school activities where I get to learn about different topics, meet new people, and gain experiences outside regular classes.",
        },
        {
            number: "05",
            title: "Still Learning. Still Building.",
            description:
                "Right now, I'm continuing to improve my skills, learn React, build projects, and prepare myself for the future I want in the technology industry.",
        },
    ];

    return (
        <section
            id="journey"
            className="bg-black text-white px-6 md:px-10 py-28"
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-20">

                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-10 h-px bg-red-500"></span>

                        <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                            My Journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

                        <h1 className="text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                            How I
                            <br />
                            <span className="text-red-500">
                                Got Here.
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg lg:ml-auto">
                            My journey in technology is still in progress.
                            These are some of the steps that brought me to
                            where I am today.
                        </p>

                    </div>

                </div>


                {/* Timeline */}
                <div className="relative">

                    {/* Timeline Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#242424] md:left-1/2 md:-translate-x-1/2"></div>


                    <div className="space-y-12">

                        {journey.map((item, index) => (
                            <div
                                key={item.number}
                                className={`
                                    relative
                                    grid
                                    grid-cols-[40px_1fr]
                                    md:grid-cols-2
                                    gap-6
                                    md:gap-16
                                    items-start
                                `}
                            >

                                {/* Mobile Number */}
                                <div className="relative z-10 md:hidden">

                                    <div className="w-10 h-10 rounded-full bg-black border border-red-500 flex items-center justify-center">
                                        <span className="text-red-500 text-xs font-semibold">
                                            {item.number}
                                        </span>
                                    </div>

                                </div>


                                {/* Left Side */}
                                <div
                                    className={`
                                        hidden
                                        md:block
                                        ${
                                            index % 2 === 0
                                                ? "text-right"
                                                : "md:order-2"
                                        }
                                    `}
                                >

                                    <p className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase">
                                        Step {item.number}
                                    </p>

                                    <h2 className="text-2xl lg:text-3xl font-bold mt-3">
                                        {item.title}
                                        <span className="text-red-500">
                                            .
                                        </span>
                                    </h2>

                                </div>


                                {/* Timeline Point */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-black border-2 border-red-500 items-center justify-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                </div>


                                {/* Content */}
                                <div
                                    className={`
                                        border
                                        border-[#242424]
                                        rounded-xl
                                        bg-[#080808]
                                        p-6
                                        md:p-7
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-red-500/60
                                        ${
                                            index % 2 === 0
                                                ? ""
                                                : "md:order-1"
                                        }
                                    `}
                                >

                                    {/* Mobile Title */}
                                    <div className="md:hidden mb-4">

                                        <p className="text-red-500 text-xs font-semibold tracking-[0.2em] uppercase">
                                            Step {item.number}
                                        </p>

                                        <h2 className="text-2xl font-bold mt-2">
                                            {item.title}
                                            <span className="text-red-500">
                                                .
                                            </span>
                                        </h2>

                                    </div>


                                    <p className="text-gray-400 leading-relaxed">
                                        {item.description}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>


                {/* Bottom Statement */}
                <div className="mt-20 border-t border-[#242424] pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <p className="text-gray-500">
                        The journey isn't finished yet.
                    </p>

                    <p className="text-red-500 font-semibold">
                        I'm just getting started.
                    </p>

                </div>

            </div>
        </section>
    );
}

export default Journey;
