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
    role: "Fullstack SaaS Engineer",
    location: "Lagos, Nigeria",
    email: "khalidoyeneye@gmail.com",
    summary:
      "I build production SaaS products across web and mobile, from product architecture and interfaces to APIs, data, testing, and delivery.",
    availability: "Open to opportunities.",
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
  about: [
    "I build SaaS products end to end across web and mobile.",
    "My scope adapts to the product and team, whether that means fullstack delivery or focused ownership of frontend, mobile, backend, or another delivery area."
  ],
  capabilities: [
    {
      title: "SaaS product engineering",
      description: "Product architecture and fullstack delivery from idea to production."
    },
    {
      title: "Frontend and mobile",
      description: "Accessible interfaces, maintainable state, and responsive product experiences."
    },
    {
      title: "Backend and data",
      description: "APIs, data models, authentication, realtime workflows, and integrations."
    },
    {
      title: "Quality and delivery",
      description: "Testing, performance, CI/CD, review, and cross-functional execution."
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
        "Lead frontend architecture and delivery across recruitment, marketplace, and financial products.",
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
      summary: "Led Scorebox frontend architecture and built its reusable component system.",
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
        "Built the public voting experience and administration tools with React and Firebase.",
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
      summary: "Built and maintained the company website across product and business requirements.",
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
        "A multi-tenant incident operations platform for ownership, SLA tracking, collaboration, and audit history.",
      overview:
        "RelayOps gives distributed product teams one workflow for incident ownership, response, communication, and reporting. Permissions, tenant boundaries, realtime updates, and audit history remain explicit throughout.",
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
        "Distributed teams often reconstruct incident ownership, deadlines, and decisions across several tools.",
        "The interface needed to expose permissions, responsibility, SLA state, and history without becoming a dense control panel."
      ],
      solution: [
        "A focused workflow combines workspace context, assignment, SLA snapshots, comments, timeline entries, notifications, audit history, and analytics.",
        "The independently deployable frontend and API share validated contracts. URL state keeps incidents, filters, sorting, and saved views addressable."
      ],
      responsibilities: [
        "Designed the product architecture and responsive interface system.",
        "Built the React application, Express API, shared contracts, realtime layer, and MongoDB model.",
        "Implemented session security, CSRF protection, tenant authorization, lifecycle email, and role capabilities.",
        "Created the test, CI, and Render deployment pipelines for both services."
      ],
      challenges: [
        "Keeping optimistic state aligned with transactions and realtime revisions.",
        "Enforcing tenant and workspace permissions at both interface and API boundaries.",
        "Supporting keyboard, touch, reduced motion, color themes, and narrow screens."
      ],
      outcomes: [
        "Delivered independently buildable frontend and backend services.",
        "Created 29 test/spec files spanning contracts, business rules, integration behavior, UI states, accessibility, and browser workflows.",
        "Targeted coverage reports 96.29% for backend critical rules, 86.36% for frontend critical state, and 100% for shared contracts.",
        "Documented architecture, data boundaries, accessibility, deployment, and product tradeoffs."
      ],
      liveUrl: "https://relayops-frontend.onrender.com/",
      sourceUrl: "https://github.com/khalteck/RelayOps",
      sourceNote:
        "Verified from the public repository, project documentation, reports, and live Render services on 5 August 2026. Coverage figures apply only to the named critical surfaces."
    },
    {
      status: "published",
      number: "02",
      slug: "tci-podcast",
      title: "TCI Podcast",
      role: "Frontend application · Admin CMS",
      shortDescription:
        "A podcast website and episode administration workflow for migration stories.",
      overview:
        "The Chronicles of an Immigrant publishes migration stories from around the world. I built the listener website and the administration interface for its episode catalogue.",
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
        "The podcast needed a public home for its stories and a practical episode publishing workflow.",
        "The listener and administration experiences needed to share one clear visual system."
      ],
      solution: [
        "The client presents podcast details, producers, episode discovery, pagination, and playback options.",
        "A Firebase-backed dashboard supports episode creation, editing, publishing, and removal."
      ],
      responsibilities: [
        "Built the client-facing application and administrative dashboard.",
        "Implemented catalogue pagination, episode presentation, playback paths, and content operations.",
        "Built responsive React interfaces from the podcast visual identity."
      ],
      challenges: [
        "Balancing the brand palette with readable, repeatable content patterns.",
        "Keeping public episode data and administration workflows aligned through Firebase."
      ],
      outcomes: [
        "Delivered the public listener experience and internal episode management workflow.",
        "No quantitative outcome or currently reliable public URL is claimed."
      ],
      sourceNote:
        "Verified from the existing portfolio, current résumé, and retained product screenshot. Unreliable public links are omitted."
    },
    ...["03", "04", "05", "06"].map((number) => ({
      status: "incoming" as const,
      number,
      id: `incoming-${number}`,
      title: `Project ${number} | In progress`,
      shortDescription: "Reserved for a verified case study.",
      previewLabel: "Case study in preparation"
    }))
  ]
};

export const publishedProjects = portfolio.projects.filter(
  (project): project is PublishedProject => project.status === "published"
);
