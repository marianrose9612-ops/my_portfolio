"use client";

import { ContactForm } from "@/components/contact-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SCROLL_RING_R = 20;
const SCROLL_RING_C = 2 * Math.PI * SCROLL_RING_R;

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "get-in-touch", label: "Get in Touch" },
];

const skillGroups = [
  {
    title: "FullStack",
    description: "End-to-end product engineering—UI, APIs, and persistence.",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "REST & GraphQL",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "WebSockets",
      "Microservices",
      "Testing (Jest / Vitest)",
      "Performance & caching",
    ],
  },
  {
    title: "AI Integration",
    description: "Production LLM workflows, retrieval, and evaluation.",
    items: [
      "LLM APIs",
      "OpenAI / Anthropic",
      "LangChain",
      "LangGraph",
      "RAG & retrieval",
      "Vector search",
      "Embeddings",
      "Prompt engineering",
      "Agents & tools",
      "Model evaluation",
      "Streaming responses",
      "Fine-tuning basics",
    ],
  },
  {
    title: "Tools & Workflow",
    description: "Shipping, infrastructure, and how teams collaborate.",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "Terraform",
      "AWS / cloud",
      "Logging & tracing",
      "Agile / Scrum",
      "Code review",
      "Technical writing",
      "Figma",
      "Documentation",
    ],
  },
];

const projects = [
  {
    platform: "FITNESS PLATFORM",
    title: "GYYM",
    description:
      "Japan-based fitness marketplace for booking partner gyms and classes on demand with a point-based subscription and pay-as-you-go model.",
    stack: ["Web platform", "Reservations", "Payments", "LINE auth"],
    href: "https://service.gyym.jp/",
    image: "/images/GYYM.png",
  },
  {
    platform: "CREATOR PLATFORM",
    title: "Playto",
    description:
      "All-in-one stack for creators to launch community apps, courses, and memberships with mobile-first experiences and global payments.",
    stack: ["SaaS", "Mobile web", "Payments", "Memberships"],
    href: "https://www.playto.so/",
    image: "/images/playto.png",
  },
  {
    platform: "HEALTH TECH",
    title: "Ubie",
    description:
      "Medical AI partner that guides users from symptom questions to the right care path, with chat-style triage and provider-facing workflows.",
    stack: ["Healthcare AI", "Symptom triage", "Mobile", "Compliance"],
    href: "https://ubie.life/",
    image: "/images/ubie.png",
  },
  {
    platform: "HIRING & ASSESSMENT",
    title: "TestDome",
    description:
      "Online skills screening with work-sample tests, live coding interviews, proctoring, and a large library across languages and domains.",
    stack: ["Assessment", "Live coding", "Proctoring", "B2B SaaS"],
    href: "https://www.testdome.com/",
    image: "/images/testdome.com.png",
  },
  {
    platform: "FINTECH MOBILE",
    title: "Trading 212",
    description:
      "Commission-free investing app for stocks, ETFs, and fractional instruments with real-time markets and portfolio tools on Android.",
    stack: ["Android", "Kotlin", "Finance", "Real-time data"],
    href: "https://play.google.com/store/apps/details?id=com.avuscapital.trading212&gl=gb&hl=en",
    image: "/images/Trading%20212.png",
  },
  {
    platform: "CREATIVE MOBILE",
    title: "EPIK",
    description:
      "AI photo and video editor with retouching, cutouts, filters, RAW support, and batch workflows for creators on Android.",
    stack: ["Android", "Image AI", "Media", "SNOW Corp"],
    href: "https://play.google.com/store/apps/details?id=com.snowcorp.epik",
    image: "/images/epik.png",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

function fadeUp(reduce: boolean | null) {
  return {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export function PortfolioPage() {
  const reduce = useReducedMotion();
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) {
        setScrollPct(0);
        return;
      }
      const pct = Math.round((window.scrollY / maxScroll) * 100);
      setScrollPct(Math.min(100, Math.max(0, pct)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (id === "home") {
      scrollToTop();
      return;
    }
    scrollToId(id);
  };

  return (
    <div className="relative isolate overflow-x-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-[20%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.22),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_65%)]"
          animate={
            reduce
              ? undefined
              : {
                y: [0, 24, 0],
                x: [0, 12, 0],
              }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[15%] top-[25%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_65%)]"
          animate={
            reduce
              ? undefined
              : {
                y: [0, -20, 0],
                x: [0, -16, 0],
              }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))] opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      <motion.header
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--border)]/80 bg-[var(--background)]/75 pt-[env(safe-area-inset-top)] backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--background)]/60"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <a
            href="#home"
            onClick={scrollToSection("home")}
            className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
          >
            Iori Yoshida
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollToSection(item.id)}
                className="rounded-lg px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--accent-muted)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <nav className="flex max-w-[52vw] items-center gap-0.5 overflow-x-auto pb-0.5 md:hidden">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={scrollToSection(item.id)}
                  className="shrink-0 rounded-lg px-2 py-1.5 text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-[calc(3.5rem+3rem+env(safe-area-inset-top))] sm:px-6 sm:pt-[calc(4rem+4rem+env(safe-area-inset-top))] lg:px-8 lg:pt-[calc(4rem+5rem+env(safe-area-inset-top))]">
        <section id="home" className="scroll-mt-[calc(5rem+env(safe-area-inset-top))] sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.h1
              variants={fadeUp(reduce)}
              className="mt-6 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl sm:leading-[1.08] lg:text-6xl"
            >
              Building{" "}
              <span className="bg-gradient-to-r from-[var(--accent)] via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
                thoughtful
              </span>{" "}
              digital products.
            </motion.h1>
            <motion.p
              variants={fadeUp(reduce)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
            >
              I am Iori Yoshida, a senior software engineer. I build full-stack systems and
              AI-powered products—from architecture and APIs to reliable, observable production
              services.
            </motion.p>
            <motion.div variants={fadeUp(reduce)} className="mt-10 flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                onClick={scrollToSection("projects")}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-[var(--accent-foreground)] shadow-lg shadow-[var(--ring)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                View projects
              </motion.a>
              <motion.a
                href="#get-in-touch"
                onClick={scrollToSection("get-in-touch")}
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--background)]"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="mt-28 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--border)] pt-20 sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={fadeUp(reduce)} className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              About
            </h2>
            <p className="max-w-md text-sm text-[var(--muted)]">
              Full-stack engineering, AI in production, and how I partner with teams.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,300px)] lg:items-start">
            <motion.div variants={fadeUp(reduce)} className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>
                I am a senior software engineer with a track record of owning features and
                platforms end to end: designing APIs and data models, building reliable services,
                shipping modern web experiences, and operating software with observability,
                security, and performance in mind. I am comfortable moving between product
                requirements, system design, and hands-on implementation.
              </p>
              <p>
                I specialize in AI-powered software—integrating models into production
                workflows, building retrieval and tooling around them, and hardening the
                infrastructure so they behave predictably and scale. I work closely with product
                and design, support engineers through code review and mentoring, and focus on
                outcomes that are measurable, maintainable, and safe to run in the real world.
              </p>
            </motion.div>
            <motion.dl
              variants={fadeUp(reduce)}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex justify-between gap-4 border-b border-[var(--border)] pb-4">
                <dt className="text-sm text-[var(--muted)]">Role</dt>
                <dd className="text-sm font-medium text-[var(--foreground)]">Senior Software Engineer</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[var(--border)] py-4">
                <dt className="text-sm text-[var(--muted)]">Focus</dt>
                <dd className="text-sm font-medium text-[var(--foreground)]">Full stack &amp; AI</dd>
              </div>
              <div className="flex justify-between gap-4 pt-4">
                <dt className="text-sm text-[var(--muted)]">Status</dt>
                <dd className="text-sm font-medium text-[var(--accent)]">Open to opportunities</dd>
              </div>
            </motion.dl>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="mt-28 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--border)] pt-20 sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={fadeUp(reduce)} className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              Skills
            </h2>
            <p className="max-w-md text-sm text-[var(--muted)]">
              Where I spend depth across stack, AI, and delivery.
            </p>
          </motion.div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <motion.li
                key={group.title}
                variants={fadeUp(reduce)}
                custom={i}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <article className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 p-6 shadow-sm transition-shadow hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--ring)]">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{group.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{group.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] transition-colors group-hover:border-[var(--accent)]/25 group-hover:text-[var(--foreground)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          id="projects"
          className="mt-28 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--border)] pt-20 sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={fadeUp(reduce)} className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              Projects
            </h2>
            <p className="max-w-md text-sm text-[var(--muted)]">
              Products and platforms I have shipped or contributed to.
            </p>
          </motion.div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, i) => (
              <motion.li
                key={project.title}
                variants={fadeUp(reduce)}
                custom={i}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1c23] p-5 shadow-xl ring-1 ring-slate-900/50">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {project.platform}
                  </p>
                  <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-white p-2">
                    <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={project.image}
                        alt={`${project.title} product preview`}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-white">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    View Project
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5a2.25 2.25 0 002.25-2.25V10.5M7.5 16.5L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </article>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          id="get-in-touch"
          className="mt-28 scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--border)] pt-20 sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={fadeUp(reduce)} className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              Get in Touch
            </h2>
            <p className="max-w-md text-sm text-[var(--muted)]">Let us build something together.</p>
          </motion.div>
          <motion.div
            variants={fadeUp(reduce)}
            className="relative mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] via-[var(--card)] to-[var(--accent-muted)] p-8 shadow-lg sm:p-12"
          >
            <div className="relative">
              <p className="text-[var(--muted)] leading-relaxed">
                Want to collaborate or say hello? Send a message and I will get back to you.
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </motion.section>
      </main>

      <footer className="relative border-t border-[var(--border)] bg-[linear-gradient(to_top,var(--accent-muted),transparent_45%)] py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/25 to-transparent"
        />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:gap-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              © {new Date().getFullYear()} Iori Yoshida. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <a
                href="legendaryfighter93@gmail.com"
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/45 hover:bg-[var(--background)] hover:shadow-md hover:shadow-[var(--ring)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                Email
              </a>
              <a
                href="https://github.com/LegendaryFighter93"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/45 hover:bg-[var(--background)] hover:shadow-md hover:shadow-[var(--ring)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {scrollPct > 0 && (
        <motion.button
          type="button"
          aria-label={`Back to top, ${scrollPct} percent scrolled`}
          onClick={scrollToTop}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-40 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]/95 text-[var(--foreground)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] cursor-pointer"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          whileTap={reduce ? undefined : { scale: 0.95 }}
        >
          <span className="pointer-events-none absolute inset-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
              <circle
                cx="24"
                cy="24"
                r={SCROLL_RING_R}
                fill="none"
                className="stroke-[var(--border)]"
                strokeWidth="2.5"
              />
              <circle
                cx="24"
                cy="24"
                r={SCROLL_RING_R}
                fill="none"
                className="stroke-[var(--accent)]"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={SCROLL_RING_C}
                strokeDashoffset={SCROLL_RING_C * (1 - scrollPct / 100)}
              />
            </svg>
          </span>
          <span className="relative flex flex-col items-center justify-center gap-0.5">
            <svg
              className="h-5 w-5 text-[var(--accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.25}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </span>
        </motion.button>
      )}
    </div>
  );
}
