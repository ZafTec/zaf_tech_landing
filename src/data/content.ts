import type { ImageMetadata } from "astro";

import girumgizaw from "@/assets/projects/girumgizaw.png";
import akoyaproperties from "@/assets/projects/akoyapropertises.png";
import bathra from "@/assets/projects/bathra.png";
import mizan from "@/assets/projects/mizan.png";
import bitbricks from "@/assets/projects/bitbricks.png";
import genericAvatar from "@/assets/people/Generic.jpg";

/* ============================================================
   Services (used on /services page and homepage ServicesPreview)
   ============================================================ */
export interface Service {
  title: string;
  slug: string;
  icon: string;
  body: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

export const services: Service[] = [
  {
    title: "UI/UX & Frontend Design",
    slug: "frontend",
    icon: "palette",
    body: "Accessible, fast interfaces. Component libraries that survive design handoffs and the next two product pivots.",
    description:
      "Responsive React / Next.js / Astro interfaces with WCAG-conformant components, a real design system, and Core Web Vitals scores we'll back in writing.",
    deliverables: [
      "Custom UI component libraries",
      "Responsive web applications",
      "Design system implementation",
      "Performance optimization and Core Web Vitals",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Astro"],
  },
  {
    title: "Backend & API Development",
    slug: "backend",
    icon: "dns",
    body: "APIs and services with predictable latency, real observability, and a clear migration path when the schema changes.",
    description:
      "Node, Python, and Go services backed by Postgres, Redis, and message queues. Tracing, structured logs, p99 SLOs, and runbooks — not just code.",
    deliverables: [
      "RESTful and GraphQL APIs",
      "Microservices architecture",
      "Real-time systems (WebSocket, SSE)",
      "Third-party integrations and webhooks",
    ],
    tags: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    title: "Machine Learning & AI",
    slug: "ml-ai",
    icon: "psychology",
    body: "RAG, fine-tunes, and inference pipelines built on your data — with evals, cost ceilings, and a fallback path when the model misbehaves.",
    description:
      "LLM apps, RAG over private corpora, embedding pipelines, and CV models — wired up with eval suites, prompt versioning, latency budgets, and the monitoring you need to catch drift before users do.",
    deliverables: [
      "Custom LLM and RAG systems",
      "ML model training and deployment",
      "AI-powered automation workflows",
      "Natural language processing solutions",
    ],
    tags: ["PyTorch", "TensorFlow", "OpenAI", "LangChain", "Python"],
  },
  {
    title: "Cloud & DevOps",
    slug: "cloud",
    icon: "cloud",
    body: "AWS / GCP / Azure infra defined in Terraform, deployed by CI, observable from day one. Bills you can reason about.",
    description:
      "Terraform-managed VPCs, Kubernetes or serverless workloads, GitHub Actions pipelines, and the kind of cost dashboards that flag a runaway job before payroll does.",
    deliverables: [
      "Cloud architecture and migration",
      "CI/CD pipeline automation",
      "Kubernetes and container orchestration",
      "Infrastructure as Code (Terraform)",
    ],
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "Database Architecture",
    slug: "database",
    icon: "storage",
    body: "Schemas, indexes, and migrations that survive your next 10x in traffic. Postgres, Mongo, Redis, search.",
    description:
      "Relational and document schemas, partitioning strategies, zero-downtime migrations, replica topologies, and query-plan reviews — designed against your actual workload, not a blog post's.",
    deliverables: [
      "Schema design and optimization",
      "Database migration strategies",
      "Caching and performance tuning",
      "Data pipeline architecture",
    ],
    tags: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "GraphQL"],
  },
  {
    title: "WordPress & CMS",
    slug: "wordpress",
    icon: "language",
    body: "Headless or classic WordPress, custom blocks, WooCommerce stores. PHP that won't haunt you in two years.",
    description:
      "Custom block themes, plugin architecture, WooCommerce checkouts, and headless WP/GraphQL setups — security-hardened, cache-friendly, and editable by people who aren't engineers.",
    deliverables: [
      "Custom theme and plugin development",
      "WooCommerce e-commerce setup",
      "Headless WordPress (REST API or GraphQL)",
      "Performance optimization and security hardening",
    ],
    tags: ["WordPress", "PHP", "WooCommerce", "Elementor", "REST API"],
  },
];

/* ============================================================
   Portfolio gallery (used on homepage + future /portfolio)
   ============================================================ */
export interface GalleryItem {
  title: string;
  tag: string;
  image: ImageMetadata;
  link: string;
}

export const gallery: GalleryItem[] = [
  { title: "Girum Gizaw",       tag: "Personal portfolio",                        image: girumgizaw,      link: "https://girumgizaw.com/" },
  { title: "Akoya Properties",  tag: "Real estate platform",                      image: akoyaproperties, link: "https://akoyaproperties.com/" },
  { title: "Bathra",            tag: "Startup and VC connecting platform",        image: bathra,          link: "https://www.bathra.co/" },
  { title: "Mizan",             tag: "AI nutrition platform",                     image: mizan,           link: "https://mizan.euaell.me/" },
  { title: "Bitbricks",         tag: "E-learning platform",                       image: bitbricks,       link: "https://bitbricks.ai/" },
];

/* ============================================================
   Testimonials (used on homepage)
   ============================================================ */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: ImageMetadata;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "ZafTech built our support system and entire backend infrastructure from scratch. The system handles millions of requests daily with zero downtime.",
    name: "Robel Befirdu",
    role: "Manager, RnE Consultancy",
    image: genericAvatar,
  },
  {
    quote:
      "Working with ZafTech was excellent. Their work was immaculate, they communicated clearly at every stage, and the project was completed successfully.",
    name: "Kalab Assefa",
    role: "VP Engineering, mBar",
    image: genericAvatar,
  },
  {
    quote:
      "The full-stack team delivered a complex multi-tenant platform on time. Their architecture decisions were spot-on for our scale.",
    name: "Munis Badar",
    role: "Founder, Securetron",
    image: genericAvatar,
  },
];

/* ============================================================
   Products (external subdomain landing pages)
   ============================================================ */
export type ProductStatus = "live" | "beta" | "private-beta" | "in-development";

export interface ProductEntry {
  slug: "convia" | "mizan" | "rms" | "anchor" | "talos" | "tarik";
  name: string;
  tagline: string;
  description: string;
  price: string;
  url: string;
  domain: string;
  status: ProductStatus;
  featured?: boolean;
}

export const productEntries: ProductEntry[] = [
  {
    slug: "convia",
    name: "Convia",
    tagline: "Conversational forms, AI assisted",
    description:
      "Ask one question at a time. Branch on answers. Draft surveys by typing a goal. 10x the completion rate of a Google Form for a fifth of the price of Typeform.",
    price: "from $19/mo",
    url: "https://convia.zaftech.co",
    domain: "convia.zaftech.co",
    status: "beta",
    featured: true,
  },
  {
    slug: "mizan",
    name: "Mizan",
    tagline: "Nutrition tracking, done your way",
    description:
      "Log meals, plan macros, track body measurements, follow a coach. The tracker our founder uses every day.",
    price: "free + Pro $9/mo",
    url: "https://mizan.zaftech.co",
    domain: "mizan.zaftech.co",
    status: "live",
    featured: true,
  },
  {
    slug: "rms",
    name: "RMS",
    tagline: "Restaurant POS, no hardware lock-in",
    description:
      "POS, inventory, ordering, and reporting for independent restaurants. Runs on the tablet you already have.",
    price: "from $79/mo",
    url: "https://rms.zaftech.co/landing",
    domain: "rms.zaftech.co",
    status: "private-beta",
    featured: true,
  },
  {
    slug: "anchor",
    name: "Anchor",
    tagline: "RAG platform, one API call",
    description:
      "Upload documents, ask questions, get grounded answers with citations. The RAG infrastructure we built for AfroChat, packaged.",
    price: "usage-based",
    url: "https://anchor.zaftech.co",
    domain: "anchor.zaftech.co",
    status: "live",
  },
  {
    slug: "talos",
    name: "Talos",
    tagline: "Auth + sandboxed code execution",
    description:
      "RS256-signed JWTs and a Docker-isolated sandbox for running user-submitted code safely. Built for AI agent platforms.",
    price: "usage-based",
    url: "https://talos.zaftech.co",
    domain: "talos.zaftech.co",
    status: "live",
  },
  {
    slug: "tarik",
    name: "Tarik",
    tagline: "Ethiopian heritage archive",
    description:
      "A non-commercial archive of Ethiopian history, culture, and artefacts. Open to researchers, students, and the curious.",
    price: "free",
    url: "https://tarik.zaftech.co",
    domain: "tarik.zaftech.co",
    status: "live",
  },
];

/* ============================================================
   Open positions (used on /careers)
   ============================================================ */
export interface OpenPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export const openPositions: OpenPosition[] = [
  {
    title: "Skilled Software Engineer",
    department: "Engineering",
    location: "Remote or Addis Ababa",
    type: "Full-time",
    description:
      "Join our core engineering team to build scalable full-stack applications, architect robust cloud infrastructure, and develop innovative software solutions.",
    requirements: [
      "Solid experience in software engineering across the full stack",
      "Proficiency in modern programming languages and frameworks (e.g., TypeScript, React, Node.js, Python)",
      "Experience with database design and cloud platforms",
      "Strong problem-solving skills and a proactive mindset",
    ],
  },
];
