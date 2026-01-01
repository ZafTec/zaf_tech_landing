import { render, screen, within } from "@testing-library/react";
import Home from "../page";

describe("Home page", () => {
  it("shows the core hero pitch and CTAs", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Web & RAG that win/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Book a discovery call/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View starter offers/i })).toBeInTheDocument();
  });

  it("lists all service pillars", () => {
    render(<Home />);
    const servicesSection = screen.getByRole("heading", {
      name: /One team for web, product, and RAG support/i,
    }).closest("section") ?? screen.getByText(/What we do/i).parentElement;
    expect(servicesSection).toBeTruthy();
    const cards = within(servicesSection as HTMLElement).getAllByRole("heading", {
      level: 3,
    });
    expect(cards.length).toBe(4);
    expect(screen.getByText(/Web Platforms & Apps/i)).toBeInTheDocument();
    expect(screen.getAllByText(/RAG Assistants/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/UX & Product Design/i)).toBeInTheDocument();
    expect(screen.getByText(/Dedicated WordPress/i)).toBeInTheDocument();
  });

  it("shows starter offers", () => {
    render(<Home />);
    const offers = [
      /Launch-Ready Site/i,
      /RAG Support Sprint/i,
      /Experience Refresh/i,
    ];
    offers.forEach((offer) => {
      expect(screen.getByText(offer)).toBeInTheDocument();
    });
  });

  it("renders proof metrics", () => {
    render(<Home />);
    expect(screen.getAllByText(/Support deflection/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Revenue lift/i)).toBeInTheDocument();
    expect(screen.getByText(/Time to launch/i)).toBeInTheDocument();
  });

  it("exposes contact actions", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /Email the team/i })
    ).toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(
      screen.getByRole("link", { name: /Book a 15-min review/i })
    ).toBeInTheDocument();
  });
});
