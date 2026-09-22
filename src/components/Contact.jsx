import { useEffect, useRef, useState } from "react";

function Contact(props) {
    const [isVisible, setIsVisible] = useState(false);
    const contactRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert("Message sent successfully!");

                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    };

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

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={contactRef}
            id="contact"
            className="bg-black text-white px-6 md:px-10 py-28 scroll-mt-24 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">

                {/* SECTION LABEL */}
                <div
                    className={`
                        flex
                        items-center
                        gap-4
                        mb-16
                        transition-all
                        duration-700
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }
                    `}
                >
                    <span className="w-10 h-px bg-red-500"></span>

                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                        Contact
                    </p>
                </div>

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24">

                    {/* LEFT */}
                    <div
                        className={`
                            transition-all
                            duration-700
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-10"
                            }
                        `}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold leading-[0.82] tracking-tight">
                            LET'S
                            <br />
                            <span className="text-[#777]">
                                TALK
                                <span className="text-red-500">.</span>
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg mt-10">
                            Have an idea, project, or collaboration in mind?
                            I'd love to hear about it. I'm always open to
                            learning, building, and connecting with new people.
                        </p>

                        {/* EMAIL LINK */}
                        <a
                            href={`mailto:${props.email}`}
                            className="
                                inline-flex
                                items-center
                                gap-3
                                mt-10
                                text-white
                                font-semibold
                                group
                            "
                        >
                            <span
                                className="
                                    border-b
                                    border-red-500
                                    pb-1
                                    transition-colors
                                    duration-300
                                    group-hover:text-red-500
                                "
                            >
                                Send me an email
                            </span>

                            <span
                                className="
                                    text-red-500
                                    text-xl
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-2
                                "
                            >
                                →
                            </span>
                        </a>
                    </div>

                    {/* RIGHT */}
                    <div
                        className={`
                            transition-all
                            duration-700
                            ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-10"
                            }
                        `}
                        style={{
                            transitionDelay: "200ms",
                        }}
                    >
                        <p className="text-xs font-semibold tracking-[0.25em] text-gray-600 uppercase mb-2">
                            Get in touch
                        </p>

                        <div className="border-t border-[#242424]">

                            {/* EMAIL */}
                            <a
                                href={`mailto:${props.email}`}
                                className="
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    gap-6
                                    py-6
                                    border-b
                                    border-[#242424]
                                    transition-all
                                    duration-300
                                    hover:pl-3
                                "
                            >
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-600 uppercase tracking-[0.15em] mb-2">
                                        Email
                                    </p>

                                    <p className="text-gray-200 text-base md:text-lg break-all">
                                        {props.email}
                                    </p>
                                </div>

                                <span className="text-gray-600 text-xl shrink-0 transition-all duration-300 group-hover:text-red-500 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                            {/* PHONE */}
                            <a
                                href={`tel:${props.phone}`}
                                className="
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    gap-6
                                    py-6
                                    border-b
                                    border-[#242424]
                                    transition-all
                                    duration-300
                                    hover:pl-3
                                "
                            >
                                <div>
                                    <p className="text-xs text-gray-600 uppercase tracking-[0.15em] mb-2">
                                        Phone
                                    </p>

                                    <p className="text-gray-200 text-base md:text-lg">
                                        {props.phone}
                                    </p>
                                </div>

                                <span className="text-gray-600 text-xl shrink-0 transition-all duration-300 group-hover:text-red-500 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                            {/* LOCATION */}
                            <div className="py-6 border-b border-[#242424]">
                                <p className="text-xs text-gray-600 uppercase tracking-[0.15em] mb-2">
                                    Location
                                </p>

                                <p className="text-gray-200 text-base md:text-lg">
                                    Iloilo City, Philippines
                                </p>
                            </div>

                        </div>

                        {/* CONTACT FORM */}
                        <div className="mt-10">
                            <p className="text-xs font-semibold tracking-[0.25em] text-gray-600 uppercase mb-5">
                                Send a message
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full bg-transparent border-b border-[#242424] py-3 text-white outline-none focus:border-red-500"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full bg-transparent border-b border-[#242424] py-3 text-white outline-none focus:border-red-500"
                                />

                                <textarea
                                    name="message"
                                    placeholder="Your message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                    className="w-full bg-transparent border-b border-[#242424] py-3 text-white outline-none resize-none focus:border-red-500"
                                />

                                <button
                                    type="submit"
                                    className="border border-red-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* SOCIALS */}
                        <div className="mt-10">

                            <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-5">
                                Find me online
                            </p>

                            <div className="flex flex-wrap items-center gap-6">

                                {/* FACEBOOK */}
                                <a
                                    href="https://www.facebook.com/share/1DKUnE2q3L/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        text-gray-400
                                        text-sm
                                        font-medium
                                        transition-colors
                                        duration-300
                                        hover:text-red-500
                                    "
                                >
                                    Facebook
                                </a>

                                <span className="text-[#333]">
                                    /
                                </span>

                                {/* GITHUB */}
                                <a
                                    href="https://github.com/elliefranzgabuts-arch"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        text-gray-400
                                        text-sm
                                        font-medium
                                        transition-colors
                                        duration-300
                                        hover:text-red-500
                                    "
                                >
                                    GitHub
                                </a>

                                <span className="text-[#333]">
                                    /
                                </span>

                                {/* LINKEDIN */}
                                <a
                                    href="https://www.linkedin.com/in/ellie-franz-gabutin-9881783b3"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        text-gray-400
                                        text-sm
                                        font-medium
                                        transition-colors
                                        duration-300
                                        hover:text-red-500
                                    "
                                >
                                    LinkedIn
                                </a>

                            </div>

                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div
                    className={`
                        mt-24
                        pt-6
                        border-t
                        border-[#242424]
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
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
                        transitionDelay: "500ms",
                    }}
                >
                    <p className="text-sm text-gray-600">
                        Ellie Franz Gabutin
                    </p>

                    <p className="text-sm text-gray-600">
                        Still learning. Still building.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Contact;
