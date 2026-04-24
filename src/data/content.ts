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
    body: "Pixel-perfect interfaces built with modern frameworks and exceptional attention to user experience.",
    description:
      "We craft responsive, accessible, and performant user interfaces using React, Next.js, and Astro. From design systems to interactive prototypes, our frontend team delivers production-ready applications.",
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
    body: "Scalable APIs, microservices, and server architecture built for reliability at scale.",
    description:
      "We architect robust backend systems using Node.js, Python, and Go. Our APIs handle millions of requests with sub-100ms latency, backed by PostgreSQL, Redis, and event-driven architectures that grow with your business.",
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
    body: "Custom ML models, RAG systems, and intelligent automation tailored to your domain.",
    description:
      "From custom LLM chatbots to computer vision pipelines, we build AI-powered applications that learn and adapt. Our ML engineers deliver production-ready models with monitoring, retraining pipelines, and enterprise-grade RAG systems.",
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
    body: "AWS, Azure, and GCP deployments with CI/CD pipelines and automated scaling.",
    description:
      "We deploy and manage cloud infrastructure across AWS, Azure, and GCP using infrastructure-as-code practices. From Kubernetes orchestration to serverless architectures, we keep your systems reliable, secure, and cost-optimized.",
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
    body: "PostgreSQL, MongoDB, and distributed data systems optimized for your workload.",
    description:
      "We design and optimize database systems for performance, scalability, and data integrity. Whether you need relational databases, document stores, or distributed caching layers, we architect data solutions that handle your scale.",
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
    body: "Custom WordPress themes, plugins, and WooCommerce solutions for content-driven sites.",
    description:
      "We build high-performance WordPress sites with custom themes, plugins, and headless CMS architectures. From e-commerce with WooCommerce to editorial platforms, we deliver WordPress solutions that are fast, secure, and easy to manage.",
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
