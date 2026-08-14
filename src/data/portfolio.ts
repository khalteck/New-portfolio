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

const projectImage = (
  slug: "afrogrids" | "greencity-financial" | "mfbi",
  name: string,
  width: number,
  height: number,
  alt: string,
  variants: readonly number[],
  caption?: string
): ProjectImage => ({
  src: `/images/projects/${slug}/${name}.avif`,
  webpSrc: `/images/projects/${slug}/${name}.webp`,
  width,
  height,
  alt,
  sizes: "(max-width: 767px) 92vw, (max-width: 1199px) 86vw, 1120px",
  avifSrcSet:
    variants.length > 1
      ? variants
          .map((variant) => {
            const suffix = variant === width ? "" : `-${variant}`;
            return `/images/projects/${slug}/${name}${suffix}.avif ${variant}w`;
          })
          .join(", ")
      : undefined,
  webpSrcSet:
    variants.length > 1
      ? variants
          .map((variant) => {
            const suffix = variant === width ? "" : `-${variant}`;
            return `/images/projects/${slug}/${name}${suffix}.webp ${variant}w`;
          })
          .join(", ")
      : undefined,
  caption
});

const socialPreview = (
  slug: "afrogrids" | "greencity-financial" | "mfbi",
  alt: string
): ProjectImage => ({
  src: `/images/projects/${slug}/social-preview.avif`,
  webpSrc: `/images/projects/${slug}/social-preview.webp`,
  width: 1200,
  height: 630,
  alt,
  sizes: "(max-width: 767px) 92vw, 560px"
});

export const portfolio: PortfolioContent = {
  profile: {
    name: "Khalid Oyeneye",
    role: "Senior Frontend Engineer",
    location: "Lagos, Nigeria",
    email: "khalidoyeneye@gmail.com",
    summary:
      "I build production SaaS products across web and mobile, from frontend architecture and interfaces to APIs, data, testing, and delivery.",
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
      value: "Global",
      label: "Product delivery",
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
      title: "Product / full-stack engineering",
      description: "Architecture and end-to-end delivery from idea to production."
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
      title: "Frontend & Mobile",
      icon: "code",
      technologies: [
        { name: "React", iconKey: "react" },
        { name: "React Native", iconKey: "react" },
        { name: "TypeScript", iconKey: "typescript" },
        { name: "JavaScript", iconKey: "javascript" },
        { name: "Vite", iconKey: "vite" },
        { name: "Next.js", iconKey: "nextjs" },
        { name: "Tailwind CSS", iconKey: "tailwind" },
        { name: "Expo", iconKey: "expo" }
      ]
    },
    {
      title: "Backend & APIs",
      icon: "server",
      technologies: [
        { name: "Node.js", iconKey: "nodejs" },
        { name: "Express", iconKey: "express" },
        { name: "REST APIs", iconKey: "rest" },
        { name: "Firebase", iconKey: "firebase" },
        { name: "Socket.IO", iconKey: "socketio" },
        { name: "Zod", iconKey: "zod" }
      ]
    },
    {
      title: "Data & State",
      icon: "state",
      technologies: [
        { name: "MongoDB", iconKey: "mongodb" },
        { name: "Redux Toolkit", iconKey: "redux" },
        { name: "TanStack Query", iconKey: "tanstack-query" },
        { name: "Zustand", iconKey: "zustand" },
        { name: "URL state", iconKey: "url-state" }
      ]
    },
    {
      title: "Testing & Delivery",
      icon: "quality",
      technologies: [
        { name: "Vitest", iconKey: "vitest" },
        { name: "Playwright", iconKey: "playwright" },
        { name: "Accessibility", iconKey: "accessibility" },
        { name: "Performance", iconKey: "performance" },
        { name: "Git", iconKey: "git" },
        { name: "CI/CD", iconKey: "cicd" }
      ]
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
      title: "Fullstack Web Developer",
      start: "Feb 2022",
      end: "Jan 2023",
      summary:
        "Built the React and Firebase voting product, administration workflows, and supporting services.",
      achievements: [
        "Built a responsive React and Firebase voting experience that made participation easier across devices.",
        "Built administration workflows that reduced manual vote-management work and significantly lowered operational errors."
      ],
      technologies: ["React", "Firebase", "Responsive UI", "Email workflows"]
    },
    {
      company: "Agrofeed Integrated Services",
      location: "Lagos, Nigeria",
      title: "Fullstack Web Developer",
      start: "Nov 2019",
      end: "Jan 2022",
      summary:
        "Built and maintained the company web platform, using Firebase for server-side functionality.",
      achievements: [
        "Built and launched the company website to support product discovery and sales.",
        "Implemented technical SEO improvements that increased the company's organic search visibility."
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Firebase", "SEO", "Responsive design"]
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
    {
      status: "published",
      number: "03",
      slug: "afrogrids",
      title: "Afro-Grids",
      role: "Fullstack web development · CMS architecture",
      shortDescription:
        "A digital storytelling platform with a custom CMS for artworks, publications, press, submissions, and evolving editorial content.",
      overview:
        "Afro-Grids examines digital colonialism, internet infrastructure, and alternative futures through storytelling and art. I built the public platform and its authenticated content system so the editorial experience can evolve without code changes.",
      technologies: [
        "React",
        "Vite",
        "Firebase Auth",
        "Firestore",
        "Firebase Storage",
        "TanStack Query",
        "Zustand",
        "Rich text editing"
      ],
      preview: socialPreview(
        "afrogrids",
        "Afro-Grids landing page with its illustrated internet infrastructure artwork"
      ),
      gallery: [
        projectImage(
          "afrogrids",
          "landing",
          1440,
          900,
          "Afro-Grids landing page with illustrated folklore and undersea cable imagery",
          [640, 960, 1440],
          "The public entry point combines art, research, and nonlinear storytelling."
        ),
        projectImage(
          "afrogrids",
          "storytelling",
          1440,
          1288,
          "Afro-Grids Bones of the Sea storytelling and book trailer page",
          [640, 960, 1440],
          "The publication experience supports long-form narrative, video, and downloadable material."
        ),
        projectImage(
          "afrogrids",
          "press",
          1440,
          720,
          "Afro-Grids press page presenting interviews and international coverage",
          [640, 960, 1440],
          "Structured press content is managed through the same editorial platform."
        )
      ],
      problem: [
        "A research-led art project needed to present several connected media formats without flattening its visual identity.",
        "Artworks, publications, press, awards, keynotes, and submissions needed to remain editable after launch."
      ],
      solution: [
        "A responsive React experience gives each content type a distinct public presentation while sharing navigation and accessibility foundations.",
        "An authenticated Firebase CMS models page content, lists, media, rich text, settings, and submissions for controlled editorial updates."
      ],
      responsibilities: [
        "Built the public React and Vite application and responsive interaction system.",
        "Designed the Firestore content model and Firebase Storage media workflow.",
        "Built authenticated administration for pages, artworks, publications, press, keynotes, awards, settings, and submissions.",
        "Added rich-text sanitization, client caching, analytics, and operational content fallbacks."
      ],
      challenges: [
        "Preserving an art-directed experience while making dynamic content responsive and maintainable.",
        "Keeping public rendering safe when editors can publish rich text and externally hosted media.",
        "Coordinating authentication, storage, Firestore updates, analytics, and submission workflows."
      ],
      outcomes: [
        "Delivered a public storytelling platform backed by a purpose-built editorial system.",
        "Enabled non-developer management of the project’s major content and media surfaces.",
        "Kept protected CMS views separate from the public application and portfolio evidence."
      ],
      liveUrl: "https://afrogrids.com",
      sourceNote:
        "Technical scope verified from the local Afro-Grids source repository. Public screenshots were captured from afrogrids.com on 6 August 2026; protected administration screens and source links are intentionally omitted."
    },
    {
      status: "published",
      number: "04",
      slug: "greencity-financial",
      title: "GreenCity Financial Limited",
      role: "Fullstack web development · Financial data integrations",
      shortDescription:
        "A financial-services platform combining wealth products with dynamic rates, market indices, news, analytics, and lead workflows.",
      overview:
        "GreenCity Financial Limited needed a credible public platform for its wealth and asset-management services alongside current financial information. I built the product experience and data integrations that bring rates, indices, news, and client journeys into one responsive application.",
      technologies: [
        "React 19",
        "Vite",
        "Mantine",
        "Tailwind CSS",
        "PHP endpoints",
        "Axios",
        "Market data APIs",
        "PWA"
      ],
      preview: socialPreview(
        "greencity-financial",
        "GreenCity Financial landing page with a market indices dashboard"
      ),
      gallery: [
        projectImage(
          "greencity-financial",
          "landing",
          1440,
          900,
          "GreenCity Financial landing page with wealth messaging and market data",
          [640, 960, 1440],
          "The landing experience combines brand positioning, market context, and a direct client pathway."
        ),
        projectImage(
          "greencity-financial",
          "markets",
          640,
          640,
          "GreenCity Financial market panel showing indices and digital asset rates",
          [640],
          "A compact market surface integrates independently fetched indices with partial-failure resilience."
        ),
        projectImage(
          "greencity-financial",
          "businesses",
          1440,
          654,
          "GreenCity Financial wealth management and asset management services",
          [640, 960, 1440],
          "The service architecture directs visitors into the appropriate wealth or asset-management journey."
        )
      ],
      problem: [
        "The public site needed to communicate regulated financial services without becoming a static brochure.",
        "CBN and FX rates, market indices, and news arrive from separate services with different availability and response shapes."
      ],
      solution: [
        "A responsive React application connects the company narrative, service lines, market context, news, and client enquiry paths.",
        "Dedicated data adapters normalize third-party feeds, cache responses, and preserve the usable parts of the interface when one provider fails."
      ],
      responsibilities: [
        "Built the responsive public experience and reusable service presentation.",
        "Integrated CBN and FX rates, global and Nigerian indices, digital assets, and dynamic news.",
        "Implemented API caching, loading, empty, and partial-failure states across independent data sources.",
        "Added PWA behavior, analytics events, and the Wealth Control Check lead workflow."
      ],
      challenges: [
        "Normalizing financial data with inconsistent symbols, schedules, and availability.",
        "Keeping data surfaces informative when individual providers time out or return partial results.",
        "Balancing financial-services credibility with a clear, responsive conversion path."
      ],
      outcomes: [
        "Delivered a unified public platform for GreenCity’s services, market information, news, and lead journeys.",
        "Reduced dependence on manually updated market content through dynamic data integrations and caching.",
        "Provided resilient empty and partial-data states without presenting fabricated values."
      ],
      liveUrl: "https://greencityfin.com",
      sourceNote:
        "Technical scope verified from the local GreenCity source and production build. Public screenshots were captured on 6 August 2026; GreenCity’s Cloudflare protection prevented automated live capture, so the portfolio uses the genuine local production build and public data responses without mocked values."
    },
    {
      status: "published",
      number: "05",
      slug: "mfbi",
      title: "Marriage & Family Bible Institute",
      year: "2026",
      role: "Product architecture · Fullstack engineering · Platform delivery",
      shortDescription:
        "A production learning and commerce platform unifying enrollment, payments, structured courses, progress, certificates, resources, and multi-role administration.",
      overview:
        "Marriage & Family Bible Institute brings its public programme, enrollment journey, learning environment, commerce workflows, and operational administration into one production platform. I built the system across its public experience, protected portals, backend automation, data model, and deployment.",
      technologies: [
        "React 18",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Firebase Auth",
        "Firestore",
        "Cloud Functions",
        "Stripe",
        "Resend",
        "TanStack Query",
        "Zustand",
        "PWA",
        "Vitest"
      ],
      preview: socialPreview(
        "mfbi",
        "Marriage & Family Bible Institute dark landing page with its featured certificate course"
      ),
      gallery: [
        projectImage(
          "mfbi",
          "student-dashboard-dark",
          1440,
          1389,
          "MFBI student dashboard with learning progress, certificates, resources, and couple account access",
          [640, 960, 1440],
          "The protected student workspace combines continuation context, progress analytics, certificates, resources, and linked couple access using demonstration data."
        ),
        projectImage(
          "mfbi",
          "landing-dark",
          1440,
          4086,
          "Marriage & Family Bible Institute landing page in dark mode",
          [640, 960, 1440],
          "The dark public experience connects the programme narrative, course catalogue, credentials, and student stories."
        ),
        projectImage(
          "mfbi",
          "landing-light",
          1440,
          4862,
          "Marriage & Family Bible Institute landing page in light mode",
          [640, 960, 1440],
          "The complete landing journey in its responsive light theme."
        ),
        projectImage(
          "mfbi",
          "course-catalog-light",
          1440,
          3815,
          "MFBI public course catalogue in light mode",
          [640, 960, 1440],
          "A filterable public catalogue introduces available courses and the broader curriculum."
        ),
        projectImage(
          "mfbi",
          "course-catalog-dark",
          1440,
          3815,
          "MFBI public course catalogue in dark mode",
          [640, 960, 1440],
          "The same catalogue remains legible and consistent in the product’s dark theme."
        ),
        projectImage(
          "mfbi",
          "course-detail-light",
          1440,
          2061,
          "Human and AI-Robot Marriage public course details in light mode",
          [640, 960, 1440],
          "Public course details expose outcomes, format, and lesson structure before enrollment."
        ),
        projectImage(
          "mfbi",
          "course-detail-dark",
          1440,
          2061,
          "Human and AI-Robot Marriage public course details in dark mode",
          [640, 960, 1440],
          "Course information and curriculum structure adapted to the dark interface."
        )
      ],
      problem: [
        "The institute needed more than a public course website: enrollment, payment, protected learning, downloadable resources, support, and administration all had to operate as one coherent product.",
        "Individual, couple, organization-student, organization-admin, and platform-admin journeys required distinct capabilities without weakening subscription, course, progress, or data boundaries."
      ],
      solution: [
        "A pnpm monorepo separates the React application, Firebase Cloud Functions, and shared TypeScript contracts while keeping frontend and backend models aligned.",
        "The public experience leads into Stripe-backed enrollment and resource purchases, while protected portals coordinate course chapters, reading and video completion, quizzes, progress, certificates, resources, invitations, and reporting.",
        "Firebase Authentication, Firestore and Storage rules, callable functions, webhook processing, scheduled retries, and transactional email automation keep privileged operations behind explicit server and data boundaries."
      ],
      responsibilities: [
        "Architected and built the responsive public site and the student, platform-admin, and organization-admin applications.",
        "Designed the course-management workflow for structured chapters, rich text, video, quizzes, exercises, media, faculty, and downloadable resources.",
        "Implemented authentication, subscription gates, role capabilities, organization membership, couple-account invitations, and protected data access.",
        "Built Stripe enrollment and resource-purchase flows, webhook reconciliation, purchase records, subscription lifecycle handling, and failure states.",
        "Delivered automated certificates, transactional Resend email, scheduled retries and reports, PWA behavior, deployment recovery, Firebase configuration, and production delivery."
      ],
      challenges: [
        "Enforcing role, ownership, organization, couple, purchase, and active-subscription rules consistently across navigation, Firestore, Storage, and Cloud Functions.",
        "Keeping Stripe payment intents, recurring subscription events, user entitlements, purchases, and webhook-processing records synchronized through asynchronous callbacks.",
        "Calculating dependable course completion across reading, video, and quiz pages while preserving resumable progress and issuing a certificate only when completion requirements are met.",
        "Supporting a large set of public and protected routes with theme parity, responsive layouts, lazy loading, recoverable deployments, and useful loading, empty, and failure states."
      ],
      outcomes: [
        "Delivered a deployed end-to-end platform spanning discovery, enrollment, payment, learning, completion, certification, resources, support, and administration.",
        "Created dedicated student, platform-admin, and organization-admin experiences over shared course, user, progress, certificate, and resource data.",
        "Automated subscription activation, resource access, invitations, transactional email, certificate issuance, retries, cleanup, and scheduled reporting through Firebase Functions.",
        "Added focused tests for course UX, reading and quiz progress, invitation and email behavior, deployment safeguards, and source-policy boundaries."
      ],
      liveUrl: "https://mfbinstitute.org/",
      sourceNote:
        "Technical scope verified from the clean local MFBI monorepo, Firebase configuration, security rules, deployment documentation, and the live service on 11 August 2026. Public screenshots were captured from mfbinstitute.org; the authenticated student dashboard was supplied by the project owner and uses demonstration identities. The private source repository is intentionally omitted, and no adoption or commercial-impact metrics are claimed."
    },
    ...["06"].map((number) => ({
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
