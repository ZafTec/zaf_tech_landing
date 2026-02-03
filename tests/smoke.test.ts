import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const sectionsDir = join(import.meta.dir, "..", "src", "components", "sections");
const pagePath = join(import.meta.dir, "..", "src", "pages", "index.astro");

test("landing page includes core sections", () => {
  // Check that the page imports all the section components
  const pageContent = readFileSync(pagePath, "utf8");
  
  // Verify component imports exist
  expect(pageContent).toContain('import Features from "@/components/sections/Features.astro"');
  expect(pageContent).toContain('import About from "@/components/sections/About.astro"');
  expect(pageContent).toContain('import Services from "@/components/sections/Services.astro"');
  expect(pageContent).toContain('import Gallery from "@/components/sections/Gallery.astro"');
  expect(pageContent).toContain('import Contact from "@/components/sections/Contact.astro"');
  
  // Check that components are used in the page
  expect(pageContent).toContain("<Features");
  expect(pageContent).toContain("<About");
  expect(pageContent).toContain("<Services");
  expect(pageContent).toContain("<Gallery");
  expect(pageContent).toContain("<Contact");
  
  // Verify section IDs exist in component files
  const featuresContent = readFileSync(join(sectionsDir, "Features.astro"), "utf8");
  expect(featuresContent).toContain('id="features"');
  
  const aboutContent = readFileSync(join(sectionsDir, "About.astro"), "utf8");
  expect(aboutContent).toContain('id="about"');
  
  const servicesContent = readFileSync(join(sectionsDir, "Services.astro"), "utf8");
  expect(servicesContent).toContain('id="services"');
  
  const galleryContent = readFileSync(join(sectionsDir, "Gallery.astro"), "utf8");
  expect(galleryContent).toContain('id="portfolio"');
  
  const contactContent = readFileSync(join(sectionsDir, "Contact.astro"), "utf8");
  expect(contactContent).toContain('id="contact"');
  
  // Testimonials is currently commented out in index.astro, 
  // but the component has the id if needed
  const testimonialsContent = readFileSync(join(sectionsDir, "Testimonials.astro"), "utf8");
  expect(testimonialsContent).toContain('id="testimonials"');
});
