import { useEffect, useRef, useState } from "react";

function Contact(props) {
    const [isVisible, setIsVisible] = useState(false);
    const contactRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (status.message) {
            setStatus({
                type: "",
                message: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSending) return;

        setIsSending(true);

        setStatus({
            type: "",
            message: "",
        });

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/contact`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to send message."
                );
            }

            setFormData({
                name: "",
                email: "",
                message: "",
            });

            setStatus({
                type: "success",
                message: "Message sent successfully.",
            });
        } catch (error) {
            console.error("Error sending message:", error);

            setStatus({
                type: "error",
                message:
                    "Something went wrong. Please try again or send me an email.",
            });
        } finally {
            setIsSending(false);
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
            className="
                relative
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
            {/* SUBTLE BACKGROUND DETAILS */}
            <div className="absolute top-0 left-0 w-full h-px bg-[#171717]"></div>

            <div className="absolute top-28 right-0 w-32 h-px bg-red-500/20"></div>

            <div className="absolute bottom-28 left-0 w-24 h-px bg-red-500/10"></div>

            <div className="relative max-w-6xl mx-auto">
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
                    {/* LEFT SIDE */}
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

                        {/* PRIMARY EMAIL CTA */}
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

                    {/* RIGHT SIDE */}
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
                        {/* CONTACT DETAILS */}
                        <p className="text-xs font-semibold tracking-[0.25em] text-gray-600 uppercase mb-2">
                            Get in touch
                        </p>

                        <div className="border-t border-[#242424]">
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

                                <span
                                    className="
                                        text-gray-600
                                        text-xl
                                        shrink-0
                                        transition-all
                                        duration-300
                                        group-hover:text-red-500
                                        group-hover:translate-x-1
                                    "
                                >
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

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* NAME */}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="
                                        w-full
                                        bg-transparent
                                        border-b
                                        border-[#242424]
                                        py-3
                                        text-white
                                        placeholder:text-gray-700
                                        outline-none
                                        transition-colors
                                        duration-300
                                        focus:border-red-500
                                    "
                                />

                                {/* EMAIL */}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="
                                        w-full
                                        bg-transparent
                                        border-b
                                        border-[#242424]
                                        py-3
                                        text-white
                                        placeholder:text-gray-700
                                        outline-none
                                        transition-colors
                                        duration-300
                                        focus:border-red-500
                                    "
                                />

                                {/* MESSAGE */}
                                <textarea
                                    name="message"
                                    placeholder="Your message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full
                                        bg-transparent
                                        border-b
                                        border-[#242424]
                                        py-3
                                        text-white
                                        placeholder:text-gray-700
                                        outline-none
                                        resize-none
                                        transition-colors
                                        duration-300
                                        focus:border-red-500
                                    "
                                ></textarea>

                                {/* STATUS MESSAGE */}
                                {status.message && (
                                    <p
                                        className={`
                                            text-xs
                                            leading-relaxed
                                            ${
                                                status.type === "success"
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }
                                        `}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        {status.message}
                                    </p>
                                )}

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="
                                        border
                                        border-red-500
                                        px-6
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:bg-red-500
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                    "
                                >
                                    {isSending
                                        ? "Sending..."
                                        : "Send Message"}
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
                                    rel="noopener noreferrer"
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

                                <span className="text-[#333]">/</span>

                                {/* GITHUB */}
                                <a
                                    href="https://github.com/elliefranzgabuts-arch"
                                    target="_blank"
                                    rel="noopener noreferrer"
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

                                <span className="text-[#333]">/</span>

                                {/* LINKEDIN */}
                                <a
                                    href="https://www.linkedin.com/in/ellie-franz-gabutin-9881783b3"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
            </div>
        </section>
    );
}

export default Contact;
