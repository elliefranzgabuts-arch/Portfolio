import {
    Activity,
    ArrowLeft,
    Award,
    BarChart3,
    FolderKanban,
    ImagePlus,
    LogOut,
    Mail,
    Pencil,
    Plus,
    RefreshCw,
    Shield,
    Trash2,
    Upload,
    Users,
    X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const API_URL =
    "https://portfolio-production-881c.up.railway.app";

const DEMO_ANALYTICS = {
    uniqueVisitors: 0,
    totalVisits: 0,
    totalMessages: 0,
    totalProjects: 0,
    totalCertificates: 0,
    recentVisitors: [],
    recentMessages: [],
};

function getImageUrl(imageUrl) {
    if (!imageUrl) return "";

    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    return `${API_URL}${imageUrl}`;
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

async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong."
        );
    }

    return data;
}

async function authenticatedFetch(
    endpoint,
    token,
    options = {}
) {
    return apiFetch(endpoint, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        },
    });
}

async function authenticatedMultipartFetch(
    endpoint,
    token,
    formData,
    method = "POST"
) {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong."
        );
    }

    return data;
}

function StatCard({
    title,
    value,
    icon: Icon,
    description,
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.055]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-white/50">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                        {value}
                    </h3>

                    {description && (
                        <p className="mt-2 text-xs text-white/40">
                            {description}
                        </p>
                    )}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                    <Icon
                        size={20}
                        className="text-white/70"
                    />
                </div>
            </div>
        </div>
    );
}

function SectionHeader({
    icon: Icon,
    title,
    description,
    action,
}) {
    return (
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                    <Icon
                        size={18}
                        className="text-white/70"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm text-white/40">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {action}
        </div>
    );
}

/* =========================================================
   VISITOR ACTIVITY
========================================================= */

function VisitorsChart({ visitors }) {
    const rows = Array.isArray(visitors)
        ? visitors
        : [];

    const grouped = {};

    rows.forEach((visitor) => {
        if (!visitor?.visited_at) return;

        const date = new Date(visitor.visited_at);

        if (Number.isNaN(date.getTime())) return;

        const key = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-");

        grouped[key] =
            (grouped[key] || 0) + 1;
    });

    const chartData = Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, visits]) => ({
            date,
            visits,
            label: new Date(
                `${date}T00:00:00`
            ).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
            }),
        }));

    if (chartData.length === 0) {
        return (
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="text-center">
                    <BarChart3
                        className="mx-auto mb-3 text-white/20"
                        size={32}
                    />

                    <p className="text-sm text-white/40">
                        No visitor activity yet
                    </p>
                </div>
            </div>
        );
    }

    const chartHeight = 280;

    const chartWidth = Math.max(
        640,
        chartData.length * 80
    );

    const padding = {
        top: 24,
        right: 24,
        bottom: 48,
        left: 48,
    };

    const plotWidth =
        chartWidth -
        padding.left -
        padding.right;

    const plotHeight =
        chartHeight -
        padding.top -
        padding.bottom;

    const maxValue = Math.max(
        ...chartData.map(
            (item) => item.visits
        ),
        1
    );

    const tickStep = Math.max(
        1,
        Math.ceil(maxValue / 4)
    );

    const yMax = tickStep * 4;

    const getX = (index) => {
        if (chartData.length === 1) {
            return (
                padding.left +
                plotWidth / 2
            );
        }

        return (
            padding.left +
            (index * plotWidth) /
                (chartData.length - 1)
        );
    };

    const getY = (value) => {
        return (
            padding.top +
            plotHeight -
            (value / yMax) *
                plotHeight
        );
    };

    const points = chartData
        .map(
            (item, index) =>
                `${getX(index)},${getY(
                    item.visits
                )}`
        )
        .join(" ");

    const areaPoints = [
        `${getX(0)},${
            padding.top + plotHeight
        }`,
        ...chartData.map(
            (item, index) =>
                `${getX(index)},${getY(
                    item.visits
                )}`
        ),
        `${getX(
            chartData.length - 1
        )},${
            padding.top + plotHeight
        }`,
    ].join(" ");

    const labelStep = Math.max(
        1,
        Math.ceil(chartData.length / 6)
    );

    return (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                width={chartWidth}
                height={chartHeight}
                className="min-w-full"
                role="img"
                aria-label="Visitor activity line graph"
            >
                {Array.from({
                    length: 5,
                }).map((_, index) => {
                    const value =
                        tickStep * index;

                    const y = getY(value);

                    return (
                        <g key={value}>
                            <line
                                x1={
                                    padding.left
                                }
                                y1={y}
                                x2={
                                    chartWidth -
                                    padding.right
                                }
                                y2={y}
                                stroke="currentColor"
                                strokeOpacity="0.08"
                                strokeWidth="1"
                            />

                            <text
                                x={
                                    padding.left -
                                    10
                                }
                                y={y + 4}
                                textAnchor="end"
                                className="fill-white/30 text-[11px]"
                            >
                                {value}
                            </text>
                        </g>
                    );
                })}

                <line
                    x1={padding.left}
                    y1={
                        padding.top +
                        plotHeight
                    }
                    x2={
                        chartWidth -
                        padding.right
                    }
                    y2={
                        padding.top +
                        plotHeight
                    }
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                />

                <polygon
                    points={areaPoints}
                    fill="currentColor"
                    fillOpacity="0.04"
                />

                <polyline
                    points={points}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/80"
                />

                {chartData.map(
                    (item, index) => {
                        const x =
                            getX(index);

                        const y =
                            getY(
                                item.visits
                            );

                        return (
                            <g
                                key={
                                    item.date
                                }
                            >
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill="currentColor"
                                    className="text-white"
                                />

                                <circle
                                    cx={x}
                                    cy={y}
                                    r="9"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeOpacity="0.15"
                                    className="text-white"
                                />

                                <title>
                                    {
                                        item.label
                                    }
                                    :{" "}
                                    {
                                        item.visits
                                    }{" "}
                                    {item.visits ===
                                    1
                                        ? "visit"
                                        : "visits"}
                                </title>

                                {(index %
                                    labelStep ===
                                    0 ||
                                    index ===
                                        chartData.length -
                                            1) && (
                                    <text
                                        x={x}
                                        y={
                                            chartHeight -
                                            18
                                        }
                                        textAnchor="middle"
                                        className="fill-white/35 text-[11px]"
                                    >
                                        {
                                            item.label
                                        }
                                    </text>
                                )}
                            </g>
                        );
                    }
                )}
            </svg>
        </div>
    );
}

/* =========================================================
   TRAFFIC
   Same data source, completely separate visual design.
========================================================= */

function TrafficChart({ visitors }) {
    const rows = Array.isArray(visitors)
        ? visitors
        : [];

    const pathCounts = {};

    rows.forEach((visitor) => {
        const visitorPath =
            visitor?.path || "/";

        pathCounts[visitorPath] =
            (pathCounts[visitorPath] || 0) + 1;
    });

    const traffic = Object.entries(
        pathCounts
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    /*
     * IMPORTANT:
     * This is the total number of recorded page views
     * represented by the traffic list.
     */
    const totalPageViews = traffic.reduce(
        (sum, [, count]) =>
            sum + Number(count || 0),
        0
    );

    if (traffic.length === 0) {
        return (
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025]">
                <div className="text-center">
                    <Activity
                        size={28}
                        className="mx-auto text-white/20"
                    />

                    <p className="mt-3 text-sm text-white/40">
                        No traffic data yet.
                    </p>
                </div>
            </div>
        );
    }

    const circumference =
        2 * Math.PI * 72;

    let accumulated = 0;

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            {/* Traffic summary */}
            <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                    <p className="text-[11px] uppercase tracking-wider text-white/30">
                        Page Views
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        {totalPageViews}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                        Recorded visits
                    </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                    <p className="text-[11px] uppercase tracking-wider text-white/30">
                        Pages
                    </p>

                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        {traffic.length}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                        Page
                        {traffic.length === 1
                            ? ""
                            : "s"}{" "}
                        tracked
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                {/* Donut */}
                <div className="relative mx-auto shrink-0">
                    <svg
                        width="190"
                        height="190"
                        viewBox="0 0 190 190"
                        className="-rotate-90"
                        role="img"
                        aria-label="Traffic distribution chart"
                    >
                        {/* Background ring */}
                        <circle
                            cx="95"
                            cy="95"
                            r="72"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="14"
                            className="text-white/5"
                        />

                        {traffic.map(
                            (
                                [
                                    pathName,
                                    count,
                                ],
                                index
                            ) => {
                                const numericCount =
                                    Number(
                                        count ||
                                            0
                                    );

                                const percentage =
                                    totalPageViews >
                                    0
                                        ? numericCount /
                                          totalPageViews
                                        : 0;

                                const dashLength =
                                    percentage *
                                    circumference;

                                const dashOffset =
                                    -accumulated *
                                    circumference;

                                accumulated +=
                                    percentage;

                                const segmentClass =
                                    index === 0
                                        ? "text-white/80"
                                        : index ===
                                            1
                                          ? "text-white/60"
                                          : index ===
                                              2
                                            ? "text-white/45"
                                            : index ===
                                                3
                                              ? "text-white/30"
                                              : index ===
                                                  4
                                                ? "text-white/20"
                                                : "text-white/10";

                                return (
                                    <circle
                                        key={
                                            pathName
                                        }
                                        cx="95"
                                        cy="95"
                                        r="72"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="14"
                                        strokeLinecap="round"
                                        strokeDasharray={`${dashLength} ${circumference}`}
                                        strokeDashoffset={
                                            dashOffset
                                        }
                                        className={
                                            segmentClass
                                        }
                                    />
                                );
                            }
                        )}
                    </svg>

                    {/* Donut center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-semibold tracking-tight text-white">
                            {
                                totalPageViews
                            }
                        </span>

                        <span className="mt-1 text-xs text-white/30">
                            Page Views
                        </span>
                    </div>
                </div>

                {/* Page breakdown */}
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs uppercase tracking-wider text-white/25">
                            Traffic
                            distribution
                        </p>
                    </div>

                    <div className="space-y-4">
                        {traffic.map(
                            (
                                [
                                    pathName,
                                    count,
                                ],
                                index
                            ) => {
                                const numericCount =
                                    Number(
                                        count ||
                                            0
                                    );

                                /*
                                 * Keep this value between 0 and 100.
                                 * Do NOT multiply by 100 here because
                                 * the display already adds the % sign.
                                 */
                                const percentage =
                                    totalPageViews >
                                    0
                                        ? Math.round(
                                              (numericCount /
                                                  totalPageViews) *
                                                  100
                                          )
                                        : 0;

                                const dotClass =
                                    index === 0
                                        ? "bg-white/80"
                                        : index ===
                                            1
                                          ? "bg-white/60"
                                          : index ===
                                              2
                                            ? "bg-white/45"
                                            : index ===
                                                3
                                              ? "bg-white/30"
                                              : index ===
                                                  4
                                                ? "bg-white/20"
                                                : "bg-white/10";

                                return (
                                    <div
                                        key={
                                            pathName
                                        }
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`}
                                        />

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="truncate text-sm text-white/70">
                                                    {
                                                        pathName
                                                    }
                                                </span>

                                                <span className="shrink-0 text-xs font-medium tabular-nums text-white/60">
                                                    {
                                                        numericCount
                                                    }
                                                </span>
                                            </div>

                                            <div className="mt-1.5 flex items-center justify-between">
                                                <span className="text-[11px] text-white/25">
                                                    {
                                                        percentage
                                                    }
                                                    %
                                                </span>

                                                <span className="text-[11px] text-white/20">
                                                    visits
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   RECENT VISITORS
========================================================= */

function RecentVisitors({
    visitors,
}) {
    const rows = Array.isArray(visitors)
        ? visitors
        : [];

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            {rows.length === 0 ? (
                <div className="p-8 text-center text-sm text-white/40">
                    No visitors recorded yet.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-white/30">
                            <tr>
                                <th className="px-5 py-4">
                                    Visitor
                                </th>

                                <th className="px-5 py-4">
                                    Path
                                </th>

                                <th className="px-5 py-4">
                                    Time
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map(
                                (
                                    visitor,
                                    index
                                ) => (
                                    <tr
                                        key={
                                            visitor.id ||
                                            `${visitor.visitor_id}-${visitor.visited_at}-${index}`
                                        }
                                        className="border-b border-white/5 last:border-0"
                                    >
                                        <td className="px-5 py-4 text-sm text-white/70">
                                            {visitor.visitor_id ||
                                                "Unknown"}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-white/50">
                                            {visitor.path ||
                                                "/"}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-white/40">
                                            {visitor.visited_at
                                                ? new Date(
                                                      visitor.visited_at
                                                  ).toLocaleString()
                                                : "Unknown"}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

/* =========================================================
   RECENT MESSAGES
========================================================= */

function RecentMessages({
    messages,
}) {
    const rows = Array.isArray(messages)
        ? messages
        : [];

    return (
        <div className="space-y-3">
            {rows.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center text-sm text-white/40">
                    No messages yet.
                </div>
            ) : (
                rows.map(
                    (
                        message,
                        index
                    ) => (
                        <div
                            key={
                                message.id ||
                                `${message.email}-${message.created_at}-${index}`
                            }
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h3 className="font-medium text-white">
                                        {
                                            message.name
                                        }
                                    </h3>

                                    <p className="text-sm text-white/40">
                                        {
                                            message.email
                                        }
                                    </p>
                                </div>

                                <span className="text-xs text-white/30">
                                    {message.created_at
                                        ? new Date(
                                              message.created_at
                                          ).toLocaleString()
                                        : ""}
                                </span>
                            </div>

                            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-white/60">
                                {
                                    message.message
                                }
                            </p>
                        </div>
                    )
                )
            )}
        </div>
    );
}

/* =========================================================
   TECHNOLOGY INPUT
========================================================= */

function TechnologyInput({
    technologies,
    setTechnologies,
}) {
    const [newTechnology, setNewTechnology] =
        useState("");

    const addTechnology = () => {
        const value =
            newTechnology.trim();

        if (!value) return;

        const exists =
            technologies.some(
                (technology) =>
                    technology.toLowerCase() ===
                    value.toLowerCase()
            );

        if (exists) {
            setNewTechnology("");
            return;
        }

        setTechnologies([
            ...technologies,
            value,
        ]);

        setNewTechnology("");
    };

    const removeTechnology = (
        index
    ) => {
        setTechnologies(
            technologies.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            )
        );
    };

    const handleKeyDown = (
        event
    ) => {
        if (
            event.key === "Enter"
        ) {
            event.preventDefault();
            addTechnology();
        }
    };

    return (
        <div>
            <label className="mb-2 block text-sm text-white/60">
                Technology Stack
            </label>

            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                {technologies.length >
                    0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                        {technologies.map(
                            (
                                technology,
                                index
                            ) => (
                                <span
                                    key={`${technology}-${index}`}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/70"
                                >
                                    {
                                        technology
                                    }

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTechnology(
                                                index
                                            )
                                        }
                                        className="rounded-full text-white/30 transition hover:text-white"
                                        aria-label={`Remove ${technology}`}
                                        title={`Remove ${technology}`}
                                    >
                                        <X
                                            size={
                                                13
                                            }
                                        />
                                    </button>
                                </span>
                            )
                        )}
                    </div>
                )}

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={
                            newTechnology
                        }
                        onChange={(
                            event
                        ) =>
                            setNewTechnology(
                                event.target
                                    .value
                            )
                        }
                        onKeyDown={
                            handleKeyDown
                        }
                        placeholder="e.g. React, Node.js, MySQL"
                        className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-white/20"
                    />

                    <button
                        type="button"
                        onClick={
                            addTechnology
                        }
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/5 hover:text-white"
                    >
                        <Plus
                            size={14}
                        />
                        Add
                    </button>
                </div>
            </div>

            <p className="mt-2 text-xs text-white/25">
                Add the technologies actually used in this project.
            </p>
        </div>
    );
}

/* =========================================================
   PROJECT MANAGER
========================================================= */

function ProjectsManager({
    token,
    onProjectsChange,
}) {
    const [projects, setProjects] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [link, setLink] =
        useState("");

    const [technologies, setTechnologies] =
        useState([]);

    const [imageFile, setImageFile] =
        useState(null);

    const [imagePreview, setImagePreview] =
        useState("");

    const loadProjects =
        useCallback(async () => {
            try {
                setLoading(true);
                setError("");

                const data =
                    await authenticatedFetch(
                        "/api/projects",
                        token
                    );

                const loadedProjects =
                    Array.isArray(
                        data.projects
                    )
                        ? data.projects.map(
                              (project) => ({
                                  ...project,
                                  technologies:
                                      normalizeTechnologies(
                                          project.technologies
                                      ),
                              })
                          )
                        : [];

                setProjects(
                    loadedProjects
                );
            } catch (err) {
                setError(
                    err.message ||
                        "Unable to load projects."
                );
            } finally {
                setLoading(false);
            }
        }, [token]);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setLink("");
        setTechnologies([]);
        setImageFile(null);
        setImagePreview("");
        setError("");
    };

    const handleImageChange = (
        event
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
        ];

        if (
            !allowedTypes.includes(
                file.type
            )
        ) {
            setError(
                "Only JPG, JPEG, PNG, and WEBP images are allowed."
            );

            event.target.value = "";
            return;
        }

        if (
            file.size >
            20 * 1024 * 1024
        ) {
            setError(
                "Image is too large. Maximum size is 20MB."
            );

            event.target.value = "";
            return;
        }

        setError("");
        setImageFile(file);

        const reader =
            new FileReader();

        reader.onload = () => {
            setImagePreview(
                reader.result
            );
        };

        reader.readAsDataURL(file);
    };

    const startEdit = (project) => {
        setEditingId(project.id);
        setTitle(project.title || "");
        setDescription(
            project.description || ""
        );
        setLink(project.link || "");

        setTechnologies(
            normalizeTechnologies(
                project.technologies
            )
        );

        setImageFile(null);
        setError("");
        setSuccess("");

        setImagePreview(
            project.image_url
                ? getImageUrl(
                      project.image_url
                  )
                : ""
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        if (
            !title.trim() ||
            !description.trim()
        ) {
            setError(
                "Title and description are required."
            );

            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const formData =
                new FormData();

            formData.append(
                "title",
                title.trim()
            );

            formData.append(
                "description",
                description.trim()
            );

            formData.append(
                "link",
                link.trim()
            );

            formData.append(
                "technologies",
                JSON.stringify(
                    technologies
                )
            );

            if (imageFile) {
                formData.append(
                    "image",
                    imageFile
                );
            }

            const endpoint = editingId
                ? `/api/projects/${editingId}`
                : "/api/projects";

            const method = editingId
                ? "PUT"
                : "POST";

            await authenticatedMultipartFetch(
                endpoint,
                token,
                formData,
                method
            );

            setSuccess(
                editingId
                    ? "Project updated successfully."
                    : "Project created successfully."
            );

            resetForm();

            await loadProjects();

            if (onProjectsChange) {
                onProjectsChange();
            }
        } catch (err) {
            setError(
                err.message ||
                    "Unable to save project."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (
        project
    ) => {
        const confirmed =
            window.confirm(
                `Delete "${project.title}"? This cannot be undone.`
            );

        if (!confirmed) return;

        try {
            setError("");
            setSuccess("");

            await authenticatedFetch(
                `/api/projects/${project.id}`,
                token,
                {
                    method: "DELETE",
                }
            );

            setSuccess(
                "Project deleted successfully."
            );

            if (
                editingId ===
                project.id
            ) {
                resetForm();
            }

            await loadProjects();

            if (onProjectsChange) {
                onProjectsChange();
            }
        } catch (err) {
            setError(
                err.message ||
                    "Unable to delete project."
            );
        }
    };

    return (
        <div className="space-y-8">
            <SectionHeader
                icon={FolderKanban}
                title="Project Manager"
                description="Create, update, and manage projects displayed on your portfolio."
                action={
                    editingId ? (
                        <button
                            type="button"
                            onClick={
                                resetForm
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                        >
                            <X size={16} />
                            Cancel Edit
                        </button>
                    ) : null
                }
            />

            {(error || success) && (
                <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                        error
                            ? "border-red-400/20 bg-red-400/5 text-red-300"
                            : "border-emerald-400/20 bg-emerald-400/5 text-emerald-300"
                    }`}
                >
                    {error || success}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
            >
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-white/60">
                                Project Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(
                                    event
                                ) =>
                                    setTitle(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="My Project"
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-white/60">
                                Description
                            </label>

                            <textarea
                                value={
                                    description
                                }
                                onChange={(
                                    event
                                ) =>
                                    setDescription(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="Describe your project..."
                                rows={6}
                                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>

                        <TechnologyInput
                            technologies={
                                technologies
                            }
                            setTechnologies={
                                setTechnologies
                            }
                        />

                        <div>
                            <label className="mb-2 block text-sm text-white/60">
                                Project Link
                            </label>

                            <input
                                type="url"
                                value={link}
                                onChange={(
                                    event
                                ) =>
                                    setLink(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="https://github.com/..."
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-white/60">
                            Project Image
                        </label>

                        <label className="group relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-black/20 transition hover:border-white/30 hover:bg-white/[0.025]">
                            {imagePreview ? (
                                <>
                                    <img
                                        src={
                                            imagePreview
                                        }
                                        alt="Project preview"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                                        <div className="text-center">
                                            <Upload
                                                size={
                                                    24
                                                }
                                                className="mx-auto text-white"
                                            />

                                            <p className="mt-2 text-sm text-white">
                                                Change image
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ImagePlus
                                        size={32}
                                        className="text-white/25"
                                    />

                                    <p className="mt-3 text-sm text-white/60">
                                        Upload project image
                                    </p>

                                    <p className="mt-1 text-center text-xs text-white/30">
                                        JPG, JPEG,
                                        PNG or
                                        WEBP ·
                                        Maximum
                                        20MB
                                    </p>
                                </>
                            )}

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/jpg"
                                onChange={
                                    handleImageChange
                                }
                                className="hidden"
                            />
                        </label>

                        {imageFile && (
                            <p className="mt-2 truncate text-xs text-white/30">
                                Selected:{" "}
                                {
                                    imageFile.name
                                }
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    {editingId && (
                        <button
                            type="button"
                            onClick={
                                resetForm
                            }
                            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <RefreshCw
                                    size={16}
                                    className="animate-spin"
                                />
                                Saving...
                            </>
                        ) : (
                            <>
                                {editingId ? (
                                    <Pencil
                                        size={16}
                                    />
                                ) : (
                                    <Plus
                                        size={16}
                                    />
                                )}

                                {editingId
                                    ? "Update Project"
                                    : "Add Project"}
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white/70">
                        Existing Projects
                    </h3>

                    <span className="text-xs text-white/30">
                        {projects.length}{" "}
                        total
                    </span>
                </div>

                {loading ? (
                    <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025]">
                        <RefreshCw
                            size={22}
                            className="animate-spin text-white/30"
                        />
                    </div>
                ) : projects.length ===
                  0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center">
                        <FolderKanban
                            size={30}
                            className="mx-auto text-white/20"
                        />

                        <p className="mt-3 text-sm text-white/40">
                            No projects yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map(
                            (project) => (
                                <div
                                    key={
                                        project.id
                                    }
                                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
                                >
                                    <div className="relative aspect-video overflow-hidden bg-black/20">
                                        {project.image_url ? (
                                            <img
                                                src={getImageUrl(
                                                    project.image_url
                                                )}
                                                alt={
                                                    project.title
                                                }
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <ImagePlus
                                                    size={
                                                        30
                                                    }
                                                    className="text-white/15"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h4 className="font-medium text-white">
                                            {
                                                project.title
                                            }
                                        </h4>

                                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/40">
                                            {
                                                project.description
                                            }
                                        </p>

                                        {project
                                            .technologies
                                            ?.length >
                                            0 && (
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {project.technologies.map(
                                                    (
                                                        technology,
                                                        index
                                                    ) => (
                                                        <span
                                                            key={`${project.id}-${technology}-${index}`}
                                                            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/50"
                                                        >
                                                            {
                                                                technology
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        <div className="mt-4 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startEdit(
                                                        project
                                                    )
                                                }
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                                            >
                                                <Pencil
                                                    size={
                                                        15
                                                    }
                                                />
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        project
                                                    )
                                                }
                                                className="inline-flex items-center justify-center rounded-xl border border-red-400/10 px-3 py-2.5 text-red-300/70 transition hover:bg-red-400/5 hover:text-red-300"
                                                aria-label={`Delete ${project.title}`}
                                                title={`Delete ${project.title}`}
                                            >
                                                <Trash2
                                                    size={
                                                        15
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

/* =========================================================
   MAIN ANALYTICS
========================================================= */

export default function Analytics() {
    const [token, setToken] =
        useState(() =>
            sessionStorage.getItem(
                "adminToken"
            )
        );

    const [authenticated, setAuthenticated] =
        useState(false);

    const [checkingAuth, setCheckingAuth] =
        useState(true);

    const [password, setPassword] =
        useState("");

    const [loginError, setLoginError] =
        useState("");

    const [loggingIn, setLoggingIn] =
        useState(false);

    const [analytics, setAnalytics] =
        useState(DEMO_ANALYTICS);

    const [loadingAnalytics, setLoadingAnalytics] =
        useState(false);

    const [refreshing, setRefreshing] =
        useState(false);

    const [activeTab, setActiveTab] =
        useState("analytics");

    const verifySession =
        useCallback(async () => {
            if (!token) {
                setAuthenticated(false);
                setCheckingAuth(false);
                return;
            }

            try {
                await authenticatedFetch(
                    "/api/admin/check",
                    token
                );

                setAuthenticated(true);
            } catch {
                sessionStorage.removeItem(
                    "adminToken"
                );

                setToken(null);
                setAuthenticated(false);
            } finally {
                setCheckingAuth(false);
            }
        }, [token]);

    useEffect(() => {
        verifySession();
    }, [verifySession]);

    const loadAnalytics =
        useCallback(
            async (
                showRefresh = false
            ) => {
                if (!token) return;

                try {
                    if (showRefresh) {
                        setRefreshing(true);
                    } else {
                        setLoadingAnalytics(
                            true
                        );
                    }

                    const data =
                        await authenticatedFetch(
                            "/api/analytics",
                            token
                        );

                    if (
                        data?.analytics
                    ) {
                        setAnalytics(
                            data.analytics
                        );
                    }
                } catch (error) {
                    const message =
                        error.message?.toLowerCase() ||
                        "";

                    if (
                        message.includes(
                            "token"
                        ) ||
                        message.includes(
                            "authentication"
                        )
                    ) {
                        sessionStorage.removeItem(
                            "adminToken"
                        );

                        setToken(null);
                        setAuthenticated(
                            false
                        );
                    }
                } finally {
                    setLoadingAnalytics(
                        false
                    );

                    setRefreshing(false);
                }
            },
            [token]
        );

    useEffect(() => {
        if (
            authenticated &&
            activeTab ===
                "analytics"
        ) {
            loadAnalytics();
        }
    }, [
        authenticated,
        activeTab,
        loadAnalytics,
    ]);

    const handleLogin = async (
        event
    ) => {
        event.preventDefault();

        if (!password.trim()) {
            setLoginError(
                "Password is required."
            );

            return;
        }

        try {
            setLoggingIn(true);
            setLoginError("");

            const data =
                await apiFetch(
                    "/api/login",
                    {
                        method: "POST",
                        body: JSON.stringify(
                            {
                                password,
                            }
                        ),
                    }
                );

            if (
                !data.success ||
                !data.token
            ) {
                throw new Error(
                    data.message ||
                        "Login failed."
                );
            }

            sessionStorage.setItem(
                "adminToken",
                data.token
            );

            setToken(data.token);
            setAuthenticated(true);
            setPassword("");
        } catch (error) {
            setLoginError(
                error.message ||
                    "Invalid password."
            );
        } finally {
            setLoggingIn(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(
            "adminToken"
        );

        setToken(null);
        setAuthenticated(false);
        setAnalytics(
            DEMO_ANALYTICS
        );
    };

    const refreshDashboard =
        async () => {
            if (!token) return;

            await loadAnalytics(true);
        };

    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="text-center">
                    <RefreshCw
                        size={28}
                        className="mx-auto animate-spin text-white/30"
                    />

                    <p className="mt-4 text-sm text-white/40">
                        Checking secure
                        session...
                    </p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                            <Shield
                                size={24}
                                className="text-white/70"
                            />
                        </div>

                        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
                            Private Area
                        </h1>

                        <p className="mt-2 text-sm text-white/40">
                            Enter your admin
                            password to
                            continue.
                        </p>
                    </div>

                    <form
                        onSubmit={
                            handleLogin
                        }
                        className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"
                    >
                        {loginError && (
                            <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                                {
                                    loginError
                                }
                            </div>
                        )}

                        <label className="mb-2 block text-sm text-white/60">
                            Admin Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(
                                event
                            ) =>
                                setPassword(
                                    event
                                        .target
                                        .value
                                )
                            }
                            placeholder="Enter password"
                            autoFocus
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                        />

                        <button
                            type="submit"
                            disabled={
                                loggingIn
                            }
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loggingIn ? (
                                <>
                                    <RefreshCw
                                        size={
                                            16
                                        }
                                        className="animate-spin"
                                    />
                                    Signing
                                    in...
                                </>
                            ) : (
                                <>
                                    <Shield
                                        size={
                                            16
                                        }
                                    />
                                    Enter
                                    Dashboard
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-white/20">
                        Protected admin
                        dashboard
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                            <Activity
                                size={18}
                                className="text-white/70"
                            />
                        </div>

                        <div>
                            <h1 className="text-sm font-semibold">
                                Admin
                                Dashboard
                            </h1>

                            <p className="text-xs text-white/30">
                                Portfolio
                                management
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={
                                refreshDashboard
                            }
                            disabled={
                                refreshing
                            }
                            aria-label="Refresh dashboard"
                            className="rounded-xl border border-white/10 p-2.5 text-white/50 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                        >
                            <RefreshCw
                                size={17}
                                className={
                                    refreshing
                                        ? "animate-spin"
                                        : ""
                                }
                            />
                        </button>

                        <button
                            type="button"
                            onClick={
                                handleLogout
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
                        >
                            <LogOut
                                size={16}
                            />

                            <span className="hidden sm:inline">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                        Control Center
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Welcome back.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                        Monitor your portfolio,
                        manage projects, and
                        review activity from
                        one place.
                    </p>
                </div>

                <div className="mb-8 flex gap-2 overflow-x-auto border-b border-white/10">
                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab(
                                "analytics"
                            )
                        }
                        className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm transition ${
                            activeTab ===
                            "analytics"
                                ? "border-white text-white"
                                : "border-transparent text-white/40 hover:text-white/70"
                        }`}
                    >
                        <BarChart3
                            size={16}
                        />
                        Analytics
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab(
                                "projects"
                            )
                        }
                        className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm transition ${
                            activeTab ===
                            "projects"
                                ? "border-white text-white"
                                : "border-transparent text-white/40 hover:text-white/70"
                        }`}
                    >
                        <FolderKanban
                            size={16}
                        />
                        Projects
                    </button>

                    <button
                        type="button"
                        disabled
                        className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm text-white/20"
                    >
                        <Award
                            size={16}
                        />
                        Certificates

                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wider">
                            Soon
                        </span>
                    </button>
                </div>

                {activeTab ===
                    "analytics" && (
                    <div className="space-y-8">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                            <StatCard
                                title="Unique Visitors"
                                value={
                                    analytics.uniqueVisitors ||
                                    0
                                }
                                icon={Users}
                                description="Distinct visitors recorded"
                            />

                            <StatCard
                                title="Total Visits"
                                value={
                                    analytics.totalVisits ||
                                    0
                                }
                                icon={
                                    Activity
                                }
                                description="All recorded visits"
                            />

                            <StatCard
                                title="Messages"
                                value={
                                    analytics.totalMessages ||
                                    0
                                }
                                icon={Mail}
                                description="Contact submissions"
                            />

                            <StatCard
                                title="Projects"
                                value={
                                    analytics.totalProjects ||
                                    0
                                }
                                icon={
                                    FolderKanban
                                }
                                description="Portfolio projects"
                            />

                            <StatCard
                                title="Certificates"
                                value={
                                    analytics.totalCertificates ||
                                    0
                                }
                                icon={Award}
                                description="Certificates stored"
                            />
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div>
                                <SectionHeader
                                    icon={
                                        BarChart3
                                    }
                                    title="Visitor Activity"
                                    description="Recent visitor activity"
                                />

                                <VisitorsChart
                                    visitors={
                                        analytics.recentVisitors
                                    }
                                />
                            </div>

                            <div>
                                <SectionHeader
                                    icon={
                                        Activity
                                    }
                                    title="Traffic"
                                    description="Most visited paths"
                                />

                                <TrafficChart
                                    visitors={
                                        analytics.recentVisitors
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <SectionHeader
                                icon={Users}
                                title="Recent Visitors"
                                description="Latest recorded visits to your portfolio"
                            />

                            <RecentVisitors
                                visitors={
                                    analytics.recentVisitors
                                }
                            />
                        </div>

                        <div>
                            <SectionHeader
                                icon={Mail}
                                title="Recent Messages"
                                description="Latest messages received through your contact form"
                            />

                            <RecentMessages
                                messages={
                                    analytics.recentMessages
                                }
                            />
                        </div>
                    </div>
                )}

                {activeTab ===
                    "projects" && (
                    <ProjectsManager
                        token={token}
                        onProjectsChange={() =>
                            loadAnalytics()
                        }
                    />
                )}
            </main>

            <a
                href="/"
                className="fixed bottom-5 left-5 hidden items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2 text-xs text-white/30 backdrop-blur transition hover:text-white/70 sm:flex"
            >
                <ArrowLeft
                    size={14}
                />
                Back to portfolio
            </a>
        </div>
    );
}
