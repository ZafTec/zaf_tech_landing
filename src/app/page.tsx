const services = [
  {
    title: "Web Platforms & Apps",
    body: "Marketing sites, client portals, and product dashboards that load fast and convert.",
    tags: ["Conversion-first", "SEO friendly", "Responsive"],
  },
  {
    title: "RAG Assistants",
    body: "On-brand support and knowledge bots for customers, sales, or internal teams.",
    tags: ["Support bots", "Knowledge search", "Sales assist"],
  },
  {
    title: "UX & Product Design",
    body: "Research, prototyping, and design systems to launch confidently.",
    tags: ["Design systems", "Prototyping", "Usability"],
  },
  {
    title: "Dedicated WordPress",
    body: "Custom builds, migrations, and care plans for content-heavy brands.",
    tags: ["Custom themes", "Performance", "Care & support"],
  },
];

const offers = [
  {
    name: "Launch-Ready Site",
    detail: "Messaging, design, build, and analytics for your flagship site.",
  },
  {
    name: "RAG Support Sprint",
    detail: "Scope and ship a support or knowledge bot in 2–4 weeks.",
  },
  {
    name: "Experience Refresh",
    detail: "Redesign key funnels or dashboards to lift conversion.",
  },
];

const proof = [
  {
    title: "Support deflection",
    result: "RAG bot cut tickets by 35% and raised CSAT by 18 pts.",
  },
  {
    title: "Revenue lift",
    result: "New marketing site boosted demo requests by 42% in 60 days.",
  },
  {
    title: "Time to launch",
    result: "Client portal delivered in 3 weeks with ongoing care.",
  },
];

const valueList = [
  "Strategy, UX, content, build, and care in one team",
  "Clear timelines and weekly demos",
  "RAG assistants that stay on-brand",
  "WordPress specialists for content teams",
  "Speed, accessibility, and SEO baked in",
  "Ongoing care, not handoffs",
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
                Web, product, and RAG assistants
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
              Full-service web & software studio
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-slate-900">
              Web & RAG that win.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Conversion-ready sites, portals, and support bots that look great,
              load fast, and deflect tickets.
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
              {[
                { label: "Launch speed", value: "Pilot in 2–4 weeks" },
                { label: "Support deflection", value: "Up to 40%" },
                { label: "Care plans", value: "Design, build, maintain" },
              ].map((stat) => (
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
                  Delivery snapshot
                </p>
                <span className="text-xs rounded-full bg-emerald-100 text-emerald-700 px-3 py-1">
                  Live
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                {[
                  { label: "Launch timeline", value: "2–4 weeks" },
                  { label: "Support deflection", value: "+40%" },
                  { label: "CSAT lift", value: "+18 pts" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-slate-100 p-4 space-y-4">
                <p className="text-sm font-semibold text-slate-800">
                  Performance snapshots
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Traffic → Leads</p>
                    <svg viewBox="0 0 120 60" className="w-full h-20">
                      <polyline
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                        points="0,50 20,40 40,42 60,30 80,22 100,18 120,10"
                      />
                      <circle cx="120" cy="10" r="3" fill="#0ea5e9" />
                    </svg>
                    <p className="text-xs text-emerald-600 font-semibold">
                      +42% conversions
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Tickets deflected</p>
                    <svg viewBox="0 0 120 60" className="w-full h-20">
                      <rect x="10" y="30" width="18" height="20" fill="#0ea5e9" opacity="0.4" />
                      <rect x="40" y="22" width="18" height="28" fill="#0ea5e9" opacity="0.6" />
                      <rect x="70" y="14" width="18" height="36" fill="#0ea5e9" opacity="0.8" />
                      <rect x="100" y="10" width="18" height="40" fill="#0ea5e9" />
                    </svg>
                    <p className="text-xs text-emerald-600 font-semibold">
                      35% fewer tickets
                    </p>
                  </div>
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
                One team for web, product, and RAG support.
              </h2>
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-slate-400 transition"
            >
              Talk to the team
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
              Low-friction ways to start together.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Clear scope, fixed timelines, and visible results.
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
                  Clear process, transparent checkpoints.
                </h2>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                Weekly demos • Roadmaps • SLAs
              </span>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                "Discover & scope",
                "Experience blueprint",
                "Pilot in 2–4 weeks",
                "Launch & ongoing care",
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
            <p className="text-sm font-semibold text-sky-600">What you get</p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Business outcomes, not tech checklists.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We handle the build so you stay focused on customers and growth.
            </p>
            <div className="flex flex-wrap gap-2">
              {valueList.map((item) => (
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
              {proof.map((item) => (
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
                  Share your goal—traffic, conversion, or support. Get a plan in
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
                  <li>• Marketing or product web builds</li>
                  <li>• RAG assistants for support, sales, or knowledge</li>
                  <li>• WordPress redesigns and migrations</li>
                  <li>• UX refreshes for key funnels</li>
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
