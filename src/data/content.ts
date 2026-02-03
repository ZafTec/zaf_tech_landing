// Import images
import heroImage from "@/assets/stock_images/ian-schneider-TamMbr4okv4-unsplash.jpg";
import aboutImage from "@/assets/stock_images/marvin-meyer-SYTO3xs06fU-unsplash.jpg";
import galleryOne from "@/assets/stock_images/kevin-woblick-MYdnS46KRDs-unsplash.jpg";
import galleryTwo from "@/assets/stock_images/ben-spray-gEvMA8O6Et4-unsplash.jpg";
import galleryThree from "@/assets/stock_images/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg";
import galleryFour from "@/assets/stock_images/louise-viallesoubranne-5EhN4wbfvBc-unsplash.jpg";
import galleryFive from "@/assets/stock_images/antonio-janeski-CHVTt0aGbx0-unsplash.jpg";
import gallerySix from "@/assets/stock_images/jakub-zerdzicki-C0s91Brvii4-unsplash.jpg";
import teamOne from "@/assets/stock_images/antonio-janeski-CHVTt0aGbx0-unsplash.jpg";
import teamTwo from "@/assets/stock_images/ben-spray-gEvMA8O6Et4-unsplash.jpg";
import teamThree from "@/assets/stock_images/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg";
import teamFour from "@/assets/stock_images/louise-viallesoubranne-5EhN4wbfvBc-unsplash.jpg";
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
    title: "Conversion focus",
    body: "Every section is designed to move visitors to a next step.",
  },
  {
    title: "AI ready",
    body: "RAG assistants, knowledge hubs, and support automation.",
  },
  {
    title: "Design systems",
    body: "Cohesive visuals and components that scale with your team.",
  },
  {
    title: "Launch support",
    body: "Post-launch optimization, analytics, and ongoing care.",
  },
];

// Services data
export const services: Service[] = [
  {
    title: "Marketing sites",
    body: "Storytelling, design, and speed to lift conversion.",
  },
  {
    title: "Product UX",
    body: "Flows and prototypes for portals, dashboards, and apps.",
  },
  {
    title: "RAG assistants",
    body: "Support and sales copilots grounded in your data.",
  },
];

// Gallery data
export const gallery: GalleryItem[] = [
  { title: "Launch campaign", tag: "Go to market", image: galleryOne },
  { title: "Customer portal", tag: "Client ops", image: galleryTwo },
  { title: "AI support hub", tag: "RAG", image: galleryThree },
  { title: "Product refresh", tag: "UX", image: galleryFour },
  { title: "Pricing engine", tag: "Growth", image: galleryFive },
  { title: "Sales enablement", tag: "B2B", image: gallerySix },
];

// Team data
export const team: TeamMember[] = [
  { name: "Samira Khan", role: "Creative Director", image: teamOne },
  { name: "Miles Carter", role: "Product Lead", image: teamTwo },
  { name: "Avery Cole", role: "Engineering Lead", image: teamThree },
  { name: "Jordan Park", role: "AI Strategist", image: teamFour },
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    quote:
      "ZafTech shipped our new site fast and tied it directly to revenue. The pipeline lift was immediate.",
    name: "Taylor Morgan",
    role: "VP Growth, Northwind",
    image: testimonialOne,
  },
  {
    quote:
      "Their RAG rollout reduced ticket load and finally gave support a clean knowledge flow.",
    name: "Rafael Diaz",
    role: "Head of Support, Signal Loop",
    image: testimonialTwo,
  },
  {
    quote:
      "Every touchpoint felt intentional. The redesign improved activation in weeks.",
    name: "Jamie Lee",
    role: "Product Lead, Forge",
    image: testimonialThree,
  },
];
