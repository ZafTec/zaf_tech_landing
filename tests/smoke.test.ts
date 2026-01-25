import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const pagePath = join(import.meta.dir, "..", "src", "pages", "index.astro");

test("landing page includes core sections", () => {
  const content = readFileSync(pagePath, "utf8");
  expect(content).toContain("id=\"features\"");
  expect(content).toContain("id=\"about\"");
  expect(content).toContain("id=\"services\"");
  expect(content).toContain("id=\"portfolio\"");
  expect(content).toContain("id=\"testimonials\"");
  expect(content).toContain("id=\"contact\"");
});
