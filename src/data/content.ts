// Import images
import girumgizaw from "@/assets/projects/girumgizaw.png";
import weventurehub from "@/assets/projects/weventure.png";
import bathra from "@/assets/projects/bathra.png";
import mizan from "@/assets/projects/mizan.png";
import bitbricks from "@/assets/projects/bitbricks.png";
import afrochat from "@/assets/projects/afrochat.png";
import nahomProfile from "@/assets/people/nahom-profile.jpg";
import euaelProfile from "@/assets/people/euael-profile.jpg";
import milkiyasProfile from "@/assets/people/milkiyas-profile.jpg";
import genericAvatar from "@/assets/people/Generic.jpg";
import anchorImage from "@/assets/product/anchor.png";
import anchorLightImage from "@/assets/product/anchor_light.png";
import talosImage from "@/assets/product/talos.png";
import talosLightImage from "@/assets/product/talos_light.png";
import tarikImage from "@/assets/product/tarik.png";
import tarikLightImage from "@/assets/product/tarik_light.png";
import type { ImageMetadata } from "astro";

// Type definitions
export interface TabItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  stack: string[];
}

export interface StatsItem {
  value: string;
  label: string;
}

// Stats data
export const stats: StatsItem[] = [
  { value: "50+", label: "Projects Delivered" },
  { value: "99.9%", label: "Uptime" },
  { value: "<24h", label: "Response Time" },
  { value: "4+", label: "Years Experience" },
];

// About Tabs data
export const aboutTabs: TabItem[] = [
  {
    id: "fullstack",
    icon: "code",
    title: "Full-Stack Engineering",
    description: "Frontend design and development, scalable APIs, microservices, and server architecture built for performance and maintainability.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    id: "ml",
    icon: "psychology",
    title: "Machine Learning",
    description: "Custom ML models, RAG systems, and AI-powered applications that learn and adapt. From prototyping to production deployment.",
    stack: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain"],
  },
  {
    id: "cloud",
    icon: "cloud",
    title: "Cloud Infrastructure",
    description: "AWS, Azure, and GCP deployments with CI/CD pipelines and automated scaling. Infrastructure as code for reproducible environments.",
    stack: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    id: "wordpress",
    icon: "language",
    title: "WordPress Development",
    description: "Custom WordPress themes, plugins, and WooCommerce solutions. Performance-optimized sites with headless and traditional architectures.",
    stack: ["WordPress", "PHP", "WooCommerce", "Elementor", "REST API"],
  },
  {
    id: "security",
    icon: "security",
    title: "Security & DevOps",
    description: "CI/CD pipelines, penetration testing, and automated workflows. Building secure systems from the ground up.",
    stack: ["CI/CD", "InfoSec", "Vault", "SonarQube", "OWASP"],
  },
];

export interface Product {
  name: string;
  tagline: string;
  headline: string;
  description: string;
  image: ImageMetadata;
  imageLight?: ImageMetadata;
  link: string;
}

export interface Feature {
  title: string;
  body: string;
}

export type TestimonialSource =
  | "upwork"
  | "fiverr"
  | "gumroad"
  | "direct";

export interface TestimonialSourceConfig {
  label: string;
  icon: string;
  color: string;
}

export const testimonialSourceConfigs: Record<TestimonialSource, TestimonialSourceConfig> = {
  upwork: { label: "Upwork", icon: "work", color: "#14a800" },
  fiverr: { label: "Fiverr", icon: "storefront", color: "#1dbf73" },
  gumroad: { label: "Gumroad", icon: "shopping_bag", color: "#ff90e8" },
  direct: { label: "Direct Feedback", icon: "chat_bubble", color: "#75bfa7" },
};

export interface Service {
  title: string;
  slug: string;
  icon: string;
  body: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

export interface GalleryItem {
  title: string;
  tag: string;
  image: ImageMetadata;
  link: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: ImageMetadata;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: ImageMetadata;
  source: TestimonialSource;
}

export interface RoleConfig {
  icon: string;
  label: string;
  skills: string[];
}

export interface OpenPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

// Products data
export const products: Product[] = [
  {
    name: "Anchor Systems",
    tagline: "AI Solutions for Modern Enterprises",
    headline: "Intelligent AI Solutions",
    description: "We build custom LLM chatbots and enterprise-grade RAG systems that transform your data into actionable intelligence with 95% accuracy.",
    image: anchorImage,
    imageLight: anchorLightImage,
    link: "https://anchor.zaftech.co",
  },
  {
    name: "Talos",
    tagline: "Security Platform",
    headline: "Fortified Execution. Absolute Control.",
    description: "Enterprise-grade authentication meets secure remote code execution. Features RS256 Signed JWT Tokens and Docker Sandbox Execution Engine.",
    image: talosImage,
    imageLight: talosLightImage,
    link: "https://talos.zaftech.co",
  },
  {
    name: "Tarik",
    tagline: "Digital Heritage Archive",
    headline: "Discover Ethiopia's Rich Heritage",
    description: "A comprehensive digital archive preserving and sharing Ethiopia's history, culture, and traditions. From ancient Aksum to modern times.",
    image: tarikImage,
    imageLight: tarikLightImage,
    link: "https://tarik.zaftech.co",
  },
];

// Features data
export const features: Feature[] = [
  {
    title: "Fullstack Applications",
    body: "Frontend desing and development, Scalable APIs, microservices, and server architecture built for performance.",
  },
  {
    title: "Machine learning",
    body: "Custom ML models, RAG systems, and AI-powered applications that learn and adapt.",
  },
  {
    title: "Cloud infrastructure",
    body: "AWS, Azure, and GCP deployments with CI/CD pipelines and automated scaling.",
  },
  {
    title: "Database design",
    body: "PostgreSQL, MongoDB, and distributed data systems optimized for your workload.",
  },
];

// Services data
export const services: Service[] = [
  {
    title: "UI/UX & Frontend Design",
    slug: "frontend",
    icon: "palette",
    body: "Pixel-perfect interfaces built with modern frameworks and exceptional attention to user experience.",
    description: "We craft responsive, accessible, and performant user interfaces using React, Next.js, and Astro. From design systems to interactive prototypes, our frontend team delivers production-ready applications that delight users and convert visitors.",
    deliverables: [
      "Custom UI component libraries",
      "Responsive web applications",
      "Design system implementation",
      "Performance optimization & Core Web Vitals",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Astro"],
  },
  {
    title: "Backend & API Development",
    slug: "backend",
    icon: "dns",
    body: "Scalable APIs, microservices, and server architecture built for reliability at scale.",
    description: "We architect robust backend systems using Node.js, Python, and Go. Our APIs handle millions of requests with sub-100ms latency, backed by PostgreSQL, Redis, and event-driven architectures that grow with your business.",
    deliverables: [
      "RESTful & GraphQL APIs",
      "Microservices architecture",
      "Real-time systems (WebSocket, SSE)",
      "Third-party integrations & webhooks",
    ],
    tags: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    title: "Machine Learning & AI",
    slug: "ml-ai",
    icon: "psychology",
    body: "Custom ML models, RAG systems, and intelligent automation tailored to your domain.",
    description: "From custom LLM chatbots to computer vision pipelines, we build AI-powered applications that learn and adapt. Our ML engineers deliver production-ready models with monitoring, retraining pipelines, and enterprise-grade RAG systems.",
    deliverables: [
      "Custom LLM & RAG systems",
      "ML model training & deployment",
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
    description: "We deploy and manage cloud infrastructure across AWS, Azure, and GCP using infrastructure-as-code practices. From Kubernetes orchestration to serverless architectures, we ensure your systems are reliable, secure, and cost-optimized.",
    deliverables: [
      "Cloud architecture & migration",
      "CI/CD pipeline automation",
      "Kubernetes & container orchestration",
      "Infrastructure as Code (Terraform)",
    ],
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "Database Architecture",
    slug: "database",
    icon: "storage",
    body: "PostgreSQL, MongoDB, and distributed data systems optimized for your workload.",
    description: "We design and optimize database systems for performance, scalability, and data integrity. Whether you need relational databases, document stores, or distributed caching layers, we architect data solutions that handle your scale.",
    deliverables: [
      "Schema design & optimization",
      "Database migration strategies",
      "Caching & performance tuning",
      "Data pipeline architecture",
    ],
    tags: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "GraphQL"],
  },
  {
    title: "WordPress & CMS",
    slug: "wordpress",
    icon: "language",
    body: "Custom WordPress themes, plugins, and WooCommerce solutions for content-driven sites.",
    description: "We build high-performance WordPress sites with custom themes, plugins, and headless CMS architectures. From e-commerce with WooCommerce to editorial platforms, we deliver WordPress solutions that are fast, secure, and easy to manage.",
    deliverables: [
      "Custom theme & plugin development",
      "WooCommerce e-commerce setup",
      "Headless WordPress (REST API / GraphQL)",
      "Performance optimization & security hardening",
    ],
    tags: ["WordPress", "PHP", "WooCommerce", "Elementor", "REST API"],
  },
];

// Gallery data
export const gallery: GalleryItem[] = [
  {
    title: "Girum Gizaw",
    tag: "Personal Portfolio Website",
    image: girumgizaw,
    link: "https://girumgizaw.com/",
  },
  {
    title: "weVenture Hub",
    tag: "Service provider website",
    image: weventurehub,
    link: "https://weventurehub.com/",
  },
  {
    title: "Bathra",
    tag: "Startup and VC connecting platform",
    image: bathra,
    link: "https://www.bathra.co/",
  },
  {
    title: "Mizan",
    tag: "Fullstack AI powered nutrition platform",
    image: mizan,
    link: "https://mizan.euaell.me/",
  },
  {
    title: "Bitbricks",
    tag: "E-learning platform",
    image: bitbricks,
    link: "https://bitbricks.ai/",
  },
  {
    title: "Afrochat",
    tag: "Generative AI for Africans",
    image: afrochat,
    link: "https://afrochat.app/en",
  },
];

// Team data
export const team: TeamMember[] = [
  { name: "Euael Eshete", role: "Backend and ML Lead", image: euaelProfile },
  {
    name: "Nahom Tamru",
    role: "Backend and Database Lead",
    image: nahomProfile,
  },
  {
    name: "Milkiyas Gebremichael",
    role: "Fullstack Architect and Cloud Lead",
    image: milkiyasProfile,
  },
];

// Role configurations
export const roleConfigs: Record<string, RoleConfig> = {
  "Backend and ML Lead": {
    icon: "psychology",
    label: "ML Engineer",
    skills: ["Python", "TensorFlow", "PyTorch", "CUDA"],
  },
  "Backend and Database Lead": {
    icon: "storage",
    label: "Database Lead",
    skills: ["PostgreSQL", "Redis", "MongoDB", "GraphQL"],
  },
  "Fullstack Architect and Cloud Lead": {
    icon: "dns",
    label: "Architect",
    skills: ["System Design", "Cloud", "Kubernetes"],
  },
  "Frontend and UI/UX Lead": {
    icon: "palette",
    label: "Design Lead",
    skills: ["React", "TypeScript", "Figma"],
  },
};

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    quote:
      "ZafTech built our support system and entire backend infrastructure from scratch. The system handles millions of requests daily with zero downtime.",
    name: "Robel Befirdu",
    role: "Manager, RnE Consultancy",
    image: genericAvatar,
    source: "direct",
  },
  {
    quote:
      "Working with ZafTech was excellent. Their work was immaculate, they communicated clearly at every stage, and the project was completed successfully. A reliable partner for production-grade development.",
    name: "Kalab Assefa",
    role: "VP Engineering, mBar",
    image: genericAvatar,
    source: "upwork",
  },
  {
    quote:
      "The full-stack team delivered a complex multi-tenant platform on time. Their architecture decisions were spot-on for our scale.",
    name: "Munis Badar",
    role: "Founder, Securetron",
    image: genericAvatar,
    source: "fiverr",
  },
];

// Open Positions data
export const openPositions: OpenPosition[] = [
  {
    title: "Skilled Software Engineer",
    department: "Engineering",
    location: "Remote / Addis Ababa",
    type: "Full-time",
    description: "Join our core engineering team to build scalable full-stack applications, architect robust cloud infrastructure, and develop innovative software solutions.",
    requirements: [
      "Solid experience in software engineering across the full stack",
      "Proficiency in modern programming languages and frameworks (e.g., TypeScript, React, Node.js, Python)",
      "Experience with database design and cloud platforms",
      "Strong problem-solving skills and a proactive mindset"
    ],
  },
];
