const stats = [
  { label: "Latency targets", value: "<100ms p95 APIs" },
  { label: "Infra savings", value: "30-70% cost-down" },
  { label: "Deploy cadence", value: "Ship in 1-2 week pilots" },
];

const services = [
  {
    title: "AI & RAG Systems",
    body: "Custom LLM workflows, retrieval pipelines, evals, caching, and safety guardrails so answers stay accurate and fast.",
    tags: ["RAG", "LangChain", "LlamaIndex", "Observability"],
  },
  {
    title: "High-Concurrency Backends",
    body: "Event-driven or gRPC APIs built in FastAPI / .NET / Go with profiling, tracing, and automated load tests.",
    tags: ["FastAPI", ".NET", "Go", "Redis", "Postgres"],
  },
  {
    title: "Web & Product Engineering",
    body: "SEO-forward Next.js experiences, design systems, and component libraries tuned for Core Web Vitals.",
    tags: ["Next.js 16", "Tailwind v4", "TypeScript", "Design Systems"],
  },
  {
    title: "Cloud & DevOps",
    body: "Container-first delivery on Cloud Run with GitHub Actions, preview builds, SBOMs, and cost/perf dashboards.",
    tags: ["GCP", "Docker", "CI/CD", "Cost Optimization"],
  },
];

const offers = [
  {
    name: "RAG Feasibility Sprint",
    detail: "Data audit, retrieval eval, pilot endpoint, and latency/cost report in 1–2 weeks.",
  },
  {
    name: "API Performance Tune-Up",
    detail: "Profiling, pooling, caching, and observability with a p95 <100ms target and before/after metrics.",
  },
  {
    name: "Cloud Cost Reduction",
    detail: "Rightsizing, autoscaling policies, and traffic-shaping plan with a savings forecast.",
  },
];

const stack = [
  "Next.js 16",
  "Bun runtime",
  "Tailwind v4",
  "TypeScript",
  "FastAPI",
  ".NET 8",
  "Go",
  "Postgres + pgvector",
  "Redis",
  "MongoDB",
  "LangChain",
  "LlamaIndex",
  "Docker",
  "GCP Cloud Run",
  "GitHub Actions",
];

const cases = [
  {
    title: "Search relevance overhaul",
    result: "pgvector RAG → ticket volume down 35%, answer precision up 24%.",
  },
  {
    title: "API scale-up",
    result: "FastAPI + Redis cache → p95 180ms → 65ms at 5× traffic; infra −42%.",
  },
  {
    title: "Cloud Run migration",
    result: "Monolith → services; deploy time 20m → 3m, uptime 99.95%, spend −30%.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 shadow-elevated flex items-center justify-center text-white font-semibold">
              Z
            </div>
            <div>
              <p className="text-base font-semibold">ZafTech</p>
              <p className="text-sm text-slate-500">
                AI-first web & software studio
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a className="text-slate-700 hover:text-slate-900" href="#services">
              Services
            </a>
            <a className="text-slate-700 hover:text-slate-900" href="#offers">
              Offers
            </a>
            <a className="text-slate-700 hover:text-slate-900" href="#process">
              Process
            </a>
            <a className="text-slate-700 hover:text-slate-900" href="#contact">
              Contact
            </a>
            <a
              className="rounded-full bg-sky-500 text-white px-4 py-2 shadow-md shadow-sky-200 hover:scale-[1.02] transition"
              href="#contact"
            >
              Book a review
            </a>
          </div>
          <a
            className="md:hidden rounded-full bg-sky-500 text-white px-4 py-2 shadow-md shadow-sky-200"
            href="#contact"
          >
            Start
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20">
        <section className="pt-16 pb-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-600 shadow-sm shadow-sky-100 ring-1 ring-sky-100">
              Production-grade AI & web delivery
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-slate-900">
              AI-native backends and conversion-ready web experiences built with
              Next.js 16 + Bun.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We design and ship retrieval-safe AI systems, resilient APIs, and
              SEO-optimized sites that stay fast under load while keeping cloud
              spend lean.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-lg shadow-slate-300 hover:translate-y-[-1px] transition"
              >
                Book a discovery call
              </a>
              <a
                href="#offers"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-400 transition"
              >
                View starter offers
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white px-4 py-5 shadow-sm ring-1 ring-slate-100"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-br from-sky-200 to-emerald-100 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200 to-sky-100 blur-3xl" />
            <div className="relative rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-slate-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  Delivery dashboard
                </p>
                <span className="text-xs rounded-full bg-emerald-100 text-emerald-700 px-3 py-1">
                  Live
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Latency (p95)</p>
                  <p className="text-xl font-semibold text-slate-900">65ms</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Uptime</p>
                  <p className="text-xl font-semibold text-slate-900">99.95%</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Cost delta</p>
                  <p className="text-xl font-semibold text-emerald-600">-42%</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-800">
                  AI answer quality
                </p>
                <div className="mt-3 space-y-3">
                  {["Grounding", "Latency", "Cost"].map((metric, idx) => (
                    <div key={metric} className="flex items-center gap-3">
                      <div className="w-16 text-xs text-slate-500">
                        {metric}
                      </div>
                      <div className="relative h-2 flex-1 rounded-full bg-slate-100">
                        <div
                          className={`absolute inset-y-0 rounded-full ${
                            idx === 0
                              ? "bg-emerald-500 w-[82%]"
                              : idx === 1
                                ? "bg-sky-500 w-[76%]"
                                : "bg-slate-900 w-[68%]"
                          }`}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {idx === 0 ? "A+" : idx === 1 ? "A" : "B+"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-12 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-600">What we do</p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Full-stack coverage, AI-first by design.
              </h2>
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-slate-400 transition"
            >
              Talk to engineering
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <div className="h-10 w-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-semibold">
                    →
                  </div>
                </div>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {service.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="offers"
          className="py-12 grid gap-6 lg:grid-cols-[1fr,1.1fr] items-center"
        >
          <div className="space-y-4">
            <p className="text-sm font-semibold text-sky-600">Starter offers</p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Low-friction entry points with measurable outcomes.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Each sprint ships with dashboards and before/after benchmarks so
              you can see impact in production, not slideware.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-slate-300 hover:translate-y-[-1px] transition"
            >
              Get a slot this week
            </a>
          </div>
          <div className="grid gap-4">
            {offers.map((offer) => (
              <div
                key={offer.name}
                className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 flex items-start gap-4"
              >
                <div className="mt-1 h-10 w-10 shrink-0 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {offer.name}
                  </h3>
                  <p className="mt-2 text-slate-600">{offer.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="process"
          className="py-12 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-emerald-50 px-6"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-sky-600">Delivery</p>
                <h2 className="text-3xl font-semibold text-slate-900">
                  Clear process, transparent metrics.
                </h2>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                Weekly demos • Dashboards • SLAs
              </span>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                "Discover & scope",
                "Architecture blueprint",
                "Pilot in 1–2 weeks",
                "Hardening & launch",
              ].map((step, idx) => (
                <div
                  key={step}
                  className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-100"
                >
                  <div className="text-sm font-semibold text-slate-500">
                    Step {idx + 1}
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-sky-600">Tech stack</p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Modern, performance-first tooling.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Next.js 16 on the Bun runtime for faster dev loops, Tailwind v4
              for lean styling, and production stacks proven on SaaS, data, and
              marketplace workloads.
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-sky-600">Proof</p>
            <div className="grid gap-4">
              {cases.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {item.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-14">
          <div className="rounded-[32px] bg-slate-900 text-white px-8 py-10 shadow-xl">
            <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-center">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-sky-200">
                  Start a project
                </p>
                <h3 className="text-3xl font-semibold leading-tight">
                  Tell us your latency, cost, or conversion target—get a plan in
                  under 48 hours.
                </h3>
                <p className="text-slate-200">
                  We respond within 12 hours. Engagements available this week.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@zaftech.com?subject=Project%20discovery"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow-lg shadow-white/20 hover:translate-y-[-1px] transition"
                  >
                    Email the team
                  </a>
                  <a
                    href="https://cal.com"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-500 px-5 py-3 text-sm font-semibold text-white hover:border-white transition"
                  >
                    Book a 15-min review
                  </a>
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                <p className="text-sm font-semibold text-sky-200">
                  Preferred projects
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-100">
                  <li>• RAG agents connected to product data</li>
                  <li>• API latency & reliability audits</li>
                  <li>• Cloud Run migrations from monoliths</li>
                  <li>• SEO/site performance rebuilds</li>
                </ul>
                <p className="mt-4 text-xs text-slate-400">
                  Minimum engagement: $3k fixed or $40/hr+. Custom quotes on
                  request.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
