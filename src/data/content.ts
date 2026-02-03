// Import images
import heroImage from "@/assets/stock_images/ian-schneider-TamMbr4okv4-unsplash.jpg";
import aboutImage from "@/assets/stock_images/marvin-meyer-SYTO3xs06fU-unsplash.jpg";
import girumgizaw from "@/assets/projects/girumgizaw.png";
import weventurehub from "@/assets/projects/weventure.png";
import bathra from "@/assets/projects/bathra.png";
import mizan from "@/assets/projects/mizan.png";
import bitbricks from "@/assets/projects/bitbricks.png";
import afrochat from "@/assets/projects/afrochat.png";
import placeholderProject from "@/assets/placeholderproject.jpg"
import nahomProfile from "@/assets/people/nahom-profile.jpg";
import euaelProfile from "@/assets/people/euael-profile.jpg";
import milkiyasProfile from "@/assets/people/milkiyas-profile.jpg";
import teamPlaceholder from "@/assets/people/team-placeholder.avif";
import testimonialOne from "@/assets/stock_images/kevin-woblick-MYdnS46KRDs-unsplash.jpg";
import testimonialTwo from "@/assets/stock_images/jakub-zerdzicki-C0s91Brvii4-unsplash.jpg";
import testimonialThree from "@/assets/stock_images/marvin-meyer-SYTO3xs06fU-unsplash.jpg";
import type { ImageMetadata } from "astro";

// Type definitions
export interface Feature {
  title: string;
  body: string;
}

export interface Service {
  title: string;
  body: string;
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
}

// Images
export const images = {
  hero: heroImage,
  about: aboutImage,
};

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
    title: "UI/UX & Frontend",
    body: "React, Next.js, and modern web applications with exceptional user experience.",
  },
  {
    title: "Backend & Infrastructure",
    body: "Scalable APIs, databases, cloud architecture, and DevOps automation.",
  },
  {
    title: "Machine Learning & AI",
    body: "Custom ML models, RAG systems, and intelligent automation tailored to your domain.",
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
  {
    name: "Abel Yifru",
    role: "Frontend and UI/UX Lead",
    image: teamPlaceholder,
  },
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    quote:
      "ZafTech built our entire backend infrastructure from scratch. The system handles millions of requests daily with zero downtime.",
    name: "Taylor Morgan",
    role: "CTO, Northwind Systems",
    image: testimonialOne,
  },
  {
    quote:
      "Their ML team built a RAG system that transformed our support operations. The accuracy and response quality exceeded our expectations.",
    name: "Rafael Diaz",
    role: "VP Engineering, Signal Loop",
    image: testimonialTwo,
  },
  {
    quote:
      "The full-stack team delivered a complex multi-tenant platform on time. Their architecture decisions were spot-on for our scale.",
    name: "Jamie Lee",
    role: "VP Product, Forge Technologies",
    image: testimonialThree,
  },
];
