import { useEffect, useRef, useState } from "react";

import ourLittleWorld from "../assets/images/our-little-world.png";
import jdServices from "../assets/images/jd&s.png";
import campusConnect from "../assets/images/campus.png";

const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : import.meta.env.VITE_API_URL || "";

function ExternalLinkIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path d="M14 5h5v5" />
            <path d="M19 5 10 14" />
            <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
        </svg>
    );
}

function normalizeTechnologies(technologies) {
    if (Array.isArray(technologies)) {
        return technologies
            .map((item) => String(item).trim())
            .filter(Boolean);
    }

    if (typeof technologies === "string") {
        try {
            const parsed = JSON.parse(technologies);

            if (Array.isArray(parsed)) {
                return parsed
                    .map((item) => String(item).trim())
                    .filter(Boolean);
            }
        } catch {
            return technologies
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
        }
    }

    return [];
}

function getImageUrl(imageUrl) {
    if (!imageUrl) {
        return "";
    }

    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    return `${API_URL}${imageUrl}`;
}

const teamProjects = [
    {
        id: "team-jds",
        title: "JD&S Services",
        description:
            "A team-based service website project designed to present services through a clean and accessible digital experience.",
        type: "Team Project",
        status: "Completed",
        technologies: [
            "Figma",
            "HTML",
            "CSS",
            "JavaScript",
        ],
        image: jdServices,
        github: "",
    },
    {
        id: "team-campus",
        title: "CampusConnect",
        description:
            "A student-focused web project designed to organize campus information and provide a simple digital experience.",
        type: "Team Project",
        status: "Completed",
        technologies: [
            "Flowchart",
            "HTML",
            "CSS",
            "JavaScript",
        ],
        image: campusConnect,
        github: "",
    },
];

function ProjectShowcase({ project, index }) {
    const cardRef = useRef(null);

    useEffect(() => {
        const element = cardRef.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add(
                        "project-visible"
                    );

                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <article
            ref={cardRef}
            className="project-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.05]"
            style={{
                transitionDelay: `${index * 120}ms`,
            }}
        >
            <div className="relative aspect-video overflow-hidden bg-black/20">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        onError={(event) => {
                            event.currentTarget.style.display =
                                "none";
                        }}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">
                        No project image
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
                        {project.type}
                    </span>
                </div>
            </div>

            <div className="p-6 md:p-7">
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                            {project.title}
                        </h3>

                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                            {project.status}
                        </p>
                    </div>

                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                            aria-label={`Open ${project.title}`}
                            title={`Open ${project.title}`}
                        >
                            <ExternalLinkIcon />
                        </a>
                    )}
                </div>

                <p className="mb-6 text-sm leading-7 text-white/55 md:text-[15px]">
                    {project.description}
                </p>

                {project.technologies &&
                    project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(
                                (
                                    technology,
                                    technologyIndex
                                ) => (
                                    <span
                                        key={`${project.id}-${technology}-${technologyIndex}`}
                                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white/80"
                                    >
                                        {technology}
                                    </span>
                                )
                            )}
                        </div>
                    )}
            </div>
        </article>
    );
}

function Projects() {
    const [personalProjects, setPersonalProjects] =
        useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        async function fetchProjects() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/projects`
                );

                if (!response.ok) {
                    throw new Error(
                        `Server returned ${response.status}`
                    );
                }

                const data =
                    await response.json();

                if (!data.success) {
                    throw new Error(
                        data.message ||
                            "Failed to load projects."
                    );
                }

                if (!mounted) {
                    return;
                }

                const projects = Array.isArray(
                    data.projects
                )
                    ? data.projects
                    : [];

                const formattedProjects =
                    projects.map((project) => ({
                        ...project,
                        type: "Personal Project",
                        status: "Built & Maintained",
                        technologies:
                            normalizeTechnologies(
                                project.technologies
                            ),
                        image: project.image_url
                            ? getImageUrl(
                                  project.image_url
                              )
                            : ourLittleWorld,
                        github:
                            project.link || "",
                    }));

                setPersonalProjects(
                    formattedProjects
                );
            } catch (fetchError) {
                console.error(
                    "Error loading projects:",
                    fetchError
                );

                if (!mounted) {
                    return;
                }

                setError(
                    "Unable to load projects from the database."
                );

                setPersonalProjects([]);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        fetchProjects();

        return () => {
            mounted = false;
        };
    }, []);

    const allProjects = [
        ...personalProjects,
        ...teamProjects,
    ];

    return (
        <section
            id="projects"
            className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        >
            <style>
                {`
                    .project-card {
                        transform: translateY(30px);
                    }

                    .project-card.project-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `}
            </style>

            <div className="mx-auto max-w-7xl">
                <div className="mb-14 max-w-2xl">
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
                        Selected Work
                    </p>

                    <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                        Projects
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-white/50 md:text-base">
                        A collection of projects
                        I've built, developed,
                        and worked on throughout
                        my journey in IT.
                    </p>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div
                            className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white/80"
                            aria-label="Loading projects"
                        />
                    </div>
                )}

                {!loading && error && (
                    <div className="mb-8 rounded-2xl border border-red-400/10 bg-red-400/[0.04] px-5 py-4 text-sm text-red-300/70">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    allProjects.length === 0 && (
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/40">
                            No projects available
                            yet.
                        </div>
                    )}

                {!loading &&
                    allProjects.length > 0 && (
                        <div className="grid gap-7 md:grid-cols-2">
                            {allProjects.map(
                                (
                                    project,
                                    index
                                ) => (
                                    <ProjectShowcase
                                        key={
                                            project.id
                                        }
                                        project={
                                            project
                                        }
                                        index={
                                            index
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
            </div>
        </section>
    );
}

export default Projects;
