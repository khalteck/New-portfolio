import type { PortfolioContent, ProjectImage, PublishedProject } from "@/types/portfolio";

const relayImage = (
  name: string,
  width: number,
  height: number,
  alt: string,
  variants: readonly number[],
  caption?: string
): ProjectImage => ({
  src: `/images/projects/relayops/${name}.avif`,
  webpSrc: `/images/projects/relayops/${name}.webp`,
  width,
  height,
  alt,
  sizes: "(max-width: 767px) 92vw, (max-width: 1199px) 86vw, 1120px",
  avifSrcSet: variants
    .map((variant) => {
      const suffix = variant === width ? "" : `-${variant}`;
      return `/images/projects/relayops/${name}${suffix}.avif ${variant}w`;
    })
    .join(", "),
  webpSrcSet: variants
    .map((variant) => {
      const suffix = variant === width ? "" : `-${variant}`;
      return `/images/projects/relayops/${name}${suffix}.webp ${variant}w`;
    })
    .join(", "),
  caption
});

const relayPreview: ProjectImage = {
  src: "/images/projects/relayops/social-preview.avif",
  webpSrc: "/images/projects/relayops/social-preview.webp",
  width: 1200,
  height: 630,
  alt: "RelayOps product preview reading Incident coordination, without the noise",
  sizes: "(max-width: 767px) 92vw, 560px"
};

const tciPreview: ProjectImage = {
  src: "/images/projects/tci-podcast/tci-podcast.avif",
  webpSrc: "/images/projects/tci-podcast/tci-podcast.webp",
  width: 1860,
  height: 1136,
  alt: "Composite preview of The Chronicles of an Immigrant podcast website",
  sizes: "(max-width: 767px) 92vw, (max-width: 1199px) 80vw, 1120px",
  avifSrcSet:
    "/images/projects/tci-podcast/tci-podcast-640.avif 640w, /images/projects/tci-podcast/tci-podcast-960.avif 960w, /images/projects/tci-podcast/tci-podcast-1440.avif 1440w, /images/projects/tci-podcast/tci-podcast.avif 1860w",
  webpSrcSet:
    "/images/projects/tci-podcast/tci-podcast-640.webp 640w, /images/projects/tci-podcast/tci-podcast-960.webp 960w, /images/projects/tci-podcast/tci-podcast-1440.webp 1440w, /images/projects/tci-podcast/tci-podcast.webp 1860w"
};

export const portfolio: PortfolioContent = {
  profile: {
    name: "Khalid Oyeneye",
    role: "Senior Frontend Engineer",
    location: "Lagos, Nigeria",
    email: "khalidoyeneye@gmail.com",
    summary:
      "I architect and ship accessible, high-performance product experiences—and the systems behind them—for teams working across borders.",
    availability: "Open to strong remote frontend roles and select paid product engagements.",
    resumeUrl: "/khalid-oyeneye-resume.pdf"
  },
  socialLinks: [
    { platform: "GitHub", href: "https://github.com/khalteck" },
    { platform: "LinkedIn", href: "https://www.linkedin.com/in/khalid-oyeneye/" }
  ],
  metrics: [
    {
      value: "6+",
      label: "Years of experience",
      basis: "Professional experience documented from November 2019 to the present.",
      visible: true
    },
    {
      value: "3",
      label: "International remote teams",
      basis: "Resume-verified remote roles with teams in the United States, Sweden, and Hungary.",
      visible: true
    }
  ],
  philosophy:
    "Great interfaces make complex systems feel clear, fast, and trustworthy—without hiding the engineering underneath.",
  about: [
    "I’m Khalid, a Senior Frontend Engineer based in Lagos. I build product interfaces where architecture, interaction design, accessibility, and performance are treated as one engineering problem.",
    "My work spans frontend systems, product delivery, technical leadership, API and realtime integrations, and the practical tooling that helps teams ship with confidence. I’m at my best turning complex operational needs into calm, legible software."
  ],
  capabilities: [
    {
      title: "Frontend architecture",
      description:
        "Scalable React systems, typed boundaries, reusable components, and deliberate state ownership."
    },
    {
      title: "Product engineering",
      description:
        "End-to-end delivery that connects user needs, interface craft, APIs, data, and deployment."
    },
    {
      title: "Quality by design",
      description:
        "Accessibility, responsive behavior, performance, testing, and failure states built into the work."
    },
    {
      title: "Technical leadership",
      description:
        "Task breakdown, reviews, mentoring, cross-functional alignment, and dependable delivery practices."
    }
  ],
  technologyGroups: [
    {
      title: "Frontend",
      icon: "code",
      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "Vite",
        "Next.js",
        "Tailwind CSS",
        "React Native / Expo"
      ]
    },
    {
      title: "State & data",
      icon: "state",
      technologies: ["Redux Toolkit", "TanStack Query", "Zustand", "REST APIs", "URL state"]
    },
    {
      title: "Full-stack & realtime",
      icon: "server",
      technologies: ["Node.js", "Express", "MongoDB", "Firebase", "Socket.IO", "Zod"]
    },
    {
      title: "Quality & delivery",
      icon: "quality",
      technologies: ["Vitest", "Playwright", "Accessibility", "Performance", "Git", "CI/CD"]
    }
  ],
  experiences: [
    {
      company: "1840 & Company",
      location: "Kansas, United States · Remote",
      title: "Senior Frontend Engineer",
      start: "Jun 2024",
      end: "Present",
      summary:
        "Architecting core frontend systems and leading delivery across recruitment, marketplace, and financial-service products.",
      achievements: [
        "Breaks down work, reviews pull requests, and supports frontend engineers and interns.",
        "Contributed to 1840 Global Talent Cloud, Link-able and its AI LinkFinder search experience, and First Market."
      ],
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Redux Toolkit",
        "TanStack Query",
        "Zustand"
      ],
      companyUrl: "https://www.1840andco.com/"
    },
    {
      company: "Atop Web Technologies",
      location: "Stockholm, Sweden · Remote",
      title: "Frontend Engineer",
      start: "Apr 2023",
      end: "Jan 2024",
      summary:
        "Led Scorebox frontend architecture and built a component system focused on quality, performance, and product stability.",
      achievements: [
        "Established reusable interface foundations for a pre-launch product.",
        "Delivered frontend performance, reliability, and product-quality improvements."
      ],
      technologies: ["React", "TypeScript", "Component architecture", "Performance"]
    },
    {
      company: "Iroko Events International",
      location: "Budapest, Hungary · Remote",
      title: "Frontend Developer",
      start: "Feb 2022",
      end: "Jan 2023",
      summary:
        "Built the public voting experience and admin tooling for a modern events platform using React and Firebase.",
      achievements: [
        "Resume-reported voter participation increased by 50%.",
        "Resume-reported admin effort fell by 70% and voting errors by 95%."
      ],
      technologies: ["React", "Firebase", "Responsive UI", "Email workflows"]
    },
    {
      company: "Agrofeed Integrated Services",
      location: "Lagos, Nigeria",
      title: "Frontend Developer",
      start: "Nov 2019",
      end: "Jan 2022",
      summary:
        "Built and maintained the company web experience while collaborating across product and business needs.",
      achievements: [
        "Resume-reported sales increased by 20% after the company website launch.",
        "Resume-reported search ranking improved by 100% through SEO work."
      ],
      technologies: ["HTML", "CSS", "JavaScript", "SEO", "Responsive design"]
    }
  ],
  projects: [
    {
      status: "published",
      number: "01",
      slug: "relayops",
      title: "RelayOps",
      year: "2026",
      role: "Product architecture · Frontend · Backend · Delivery",
      shortDescription:
        "A multi-tenant incident-operations platform that keeps ownership, SLA pressure, collaboration, and audit history in one workflow.",
      overview:
        "RelayOps is a production-oriented service-operations platform for distributed product teams. It turns incident response into a clear, tenant-aware workflow backed by explicit permissions, durable history, realtime updates, and measurable service commitments.",
      technologies: [
        "React 19",
        "TypeScript",
        "Express 5",
        "MongoDB",
        "Socket.IO",
        "TanStack Query",
        "Zod",
        "Playwright"
      ],
      preview: relayPreview,
      gallery: [
        relayImage(
          "landing-dark",
          1440,
          1000,
          "RelayOps dark landing page introducing incident coordination",
          [720, 1080, 1440],
          "The public product narrative and responsive product preview."
        ),
        relayImage(
          "dashboard-dark",
          1280,
          720,
          "RelayOps dark dashboard showing operating context and incident performance",
          [640, 960, 1280],
          "A workspace dashboard with live operational context and SLA reporting."
        ),
        relayImage(
          "incident-drawer",
          1280,
          720,
          "RelayOps incident queue with a detailed incident drawer",
          [640, 960, 1280],
          "The URL-addressable response workspace with seeded demonstration data."
        ),
        relayImage(
          "analytics",
          1280,
          720,
          "RelayOps analytics with incident trend and distribution charts",
          [640, 960, 1280],
          "Operational reporting based on seeded demonstration data."
        ),
        relayImage(
          "audit-log",
          1280,
          720,
          "RelayOps audit log showing traceable account actions",
          [640, 960, 1280],
          "Tenant-aware audit history for accountable operational changes."
        ),
        relayImage(
          "settings",
          1280,
          720,
          "RelayOps member and workspace settings",
          [640, 960, 1280],
          "Role and membership administration using seeded demo identities."
        ),
        relayImage(
          "landing-mobile",
          390,
          844,
          "RelayOps landing page on a mobile viewport",
          [390],
          "The product narrative adapted for a 390-pixel viewport."
        ),
        relayImage(
          "mobile-navigation",
          390,
          844,
          "RelayOps authenticated mobile navigation",
          [390],
          "Responsive authenticated navigation with seeded demo data."
        )
      ],
      problem: [
        "Distributed response teams often reconstruct ownership, deadlines, and decisions across several tools while an incident is active.",
        "The product needed to make tenant boundaries, permissions, responsibility, SLA state, and the incident record explicit without turning the interface into a dense control panel."
      ],
      solution: [
        "A focused incident workflow combines organisation and workspace context, assignment, status transitions, SLA snapshots, comments, immutable timeline entries, notifications, audit history, and analytics.",
        "The frontend and backend share validated contracts while remaining independently deployable. URL state keeps incidents, filters, sorting, pagination, and saved views addressable."
      ],
      responsibilities: [
        "Designed the product architecture and responsive interface system.",
        "Built the React application, Express API, shared contracts, realtime layer, and MongoDB persistence model.",
        "Implemented secure session rotation, CSRF protection, tenant-scoped authorization, account lifecycle email, and role capabilities.",
        "Created unit, integration, accessibility, and browser-test infrastructure.",
        "Configured CI workflows for linting, strict types, targeted coverage, production builds, and browser suites, plus Render deployment for both services."
      ],
      challenges: [
        "Keeping optimistic frontend state aligned with transaction-backed changes and duplicate or stale realtime revisions.",
        "Enforcing tenant and workspace permissions at both the interface and API boundaries without treating the client as a security layer.",
        "Making data-heavy incident workflows usable across keyboard, touch, reduced motion, light/dark presentation, and narrow screens."
      ],
      outcomes: [
        "Delivered a public two-service deployment with independently buildable frontend and backend applications.",
        "Created 29 test/spec files spanning contracts, business rules, integration behavior, UI states, accessibility, and browser workflows.",
        "Targeted coverage artifacts report 96.29% backend critical-rule lines, 86.36% frontend critical-state lines, and 100% shared-contract lines. These are scoped surfaces, not whole-repository coverage.",
        "Documented architecture, data boundaries, accessibility expectations, deployment, and deliberate product trade-offs."
      ],
      liveUrl: "https://relayops-frontend.onrender.com/",
      sourceUrl: "https://github.com/khalteck/RelayOps",
      sourceNote:
        "Verified from the public RelayOps repository, local documentation, tracked reports, and live Render endpoints on 5 August 2026. No adoption, business-impact, green-CI, or currently passing browser-job claim is published."
    },
    {
      status: "published",
      number: "02",
      slug: "tci-podcast",
      title: "TCI Podcast",
      role: "Frontend application · Admin CMS",
      shortDescription:
        "A bright, editorial podcast experience sharing migration stories, supported by a purpose-built episode administration workflow.",
      overview:
        "The Chronicles of an Immigrant shares migration stories from around the world. I built the listener-facing product and the administrative experience used to manage its episode catalogue.",
      technologies: ["React", "Redux Toolkit", "Firebase", "Tailwind CSS"],
      preview: tciPreview,
      gallery: [
        {
          ...tciPreview,
          caption:
            "A composite of the public listening experience and community page from the delivered product."
        }
      ],
      problem: [
        "The podcast needed a distinctive public home for its stories and a manageable way to keep episode content current.",
        "Both the audience experience and routine publishing workflow had to feel coherent with the TCI visual identity."
      ],
      solution: [
        "The client application presents podcast details, producers, episode discovery, pagination, and audio playback options.",
        "A Firebase-backed admin dashboard supports create, read, update, and delete workflows for episode management."
      ],
      responsibilities: [
        "Built the client-facing application and administrative dashboard.",
        "Implemented catalogue pagination, episode presentation, audio playback paths, and content-management operations.",
        "Translated the podcast’s bright visual identity into responsive React interfaces."
      ],
      challenges: [
        "Balancing a highly expressive brand palette with readable, repeatable content patterns.",
        "Keeping listener-facing data and administrative CRUD workflows aligned through Firebase."
      ],
      outcomes: [
        "Delivered both the public listener experience and an internal episode-management workflow.",
        "No quantitative outcome, public source permission, or currently reliable live URL is claimed."
      ],
      sourceNote:
        "Verified from the existing portfolio, current resume, and retained public screenshot. The broken live URL and unrelated commented source link are intentionally omitted."
    },
    ...["03", "04", "05", "06"].map((number) => ({
      status: "incoming" as const,
      number,
      id: `incoming-${number}`,
      title: `Project ${number} — Incoming`,
      shortDescription: "A new verified case study will replace this editorial placeholder.",
      previewLabel: "New work in preparation"
    }))
  ]
};

export const publishedProjects = portfolio.projects.filter(
  (project): project is PublishedProject => project.status === "published"
);
