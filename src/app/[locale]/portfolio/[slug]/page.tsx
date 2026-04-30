import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { CaseStudyContent } from "@/components/case-study-content";

const caseMeta: Record<string, { title: string; description: string }> = {
  "duo-ai-buyer-redesign": {
    title: "Duo AI — Consumer Redesign",
    description: "Redesign and implementation of the main consumer surfaces in Duo AI — sign-in, agents, header, sidebar, and light mode — taken from Figma to code using Claude Code.",
  },
  "raio-x-creator": {
    title: "Raio X Creator — AI Analytics for Content Creators",
    description: "AI-powered analytics platform for content creators. Case study covering product design, UX research, AI integration, and frontend development.",
  },
  "hotmart-design-sprint": {
    title: "Design Sprint — Personalization at Hotmart",
    description: "4-day design sprint that solved a personalization pain point at Hotmart. Prototype validated in 1 week, shipped in 1 month.",
  },
  "hotmart-research-repository": {
    title: "Automated Research Repository — Hotmart",
    description: "Centralized feedback system combining CSAT, NPS, and support data. Built at Hotmart to drive evidence-based product decisions.",
  },
  "hotmart-club-jtbd": {
    title: "Hotmart Club — Creator Journey (JTBD)",
    description: "End-to-end mapping of the Hotmart Club creator journey using Jobs To Be Done methodology. Adopted as roadmap prioritization reference across multiple product teams.",
  },
  "duo-ai-creator-studio": {
    title: "Duo AI — Creator Studio",
    description: "Studio design for Duo AI: the creation tool where creators build and configure AI assistants. End-to-end product design for the creator side of the platform.",
  },
  "sonho-grande": {
    title: "Sonho Grande — School Dropout Prevention",
    description: "Web and mobile app designed for Instituto Sonho Grande to help public school managers monitor dropout risk and act on it. UX, UI, and data visualization for social impact.",
  },
  "softruck-redesign": {
    title: "Softruck — Tracking App Redesign",
    description: "Complete redesign of a vehicle tracking mobile app. Usability, visual design, and feature expansion.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const meta = caseMeta[slug];
  if (!meta) return {};
  const path = locale === "pt" ? `/pt/portfolio/${slug}` : `/portfolio/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        "en": `/portfolio/${slug}`,
        "pt-BR": `/pt/portfolio/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: `${meta.title} | Gustavo Silveira`,
      description: meta.description,
      url: path,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      siteName: "Gustavo Silveira",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | Gustavo Silveira`,
      description: meta.description,
    },
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  const lang = locale === "pt" ? "pt" : "en";
  const baseUrl = "https://gustavosilveira.com";
  const pagePath = locale === "pt" ? `/pt/portfolio/${slug}` : `/portfolio/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[lang],
    description: project.description[lang],
    url: `${baseUrl}${pagePath}`,
    inLanguage: lang === "pt" ? "pt-BR" : "en",
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    image: project.coverImage
      ? `${baseUrl}${project.coverImage}`
      : undefined,
    author: {
      "@type": "Person",
      name: "Gustavo Silveira",
      url: baseUrl,
    },
    creator: {
      "@type": "Person",
      name: "Gustavo Silveira",
      url: baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyContent project={project} prev={prev} next={next} />
    </>
  );
}
