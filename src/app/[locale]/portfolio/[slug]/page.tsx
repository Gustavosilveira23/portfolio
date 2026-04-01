import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { CaseStudyContent } from "@/components/case-study-content";

const caseMeta: Record<string, { title: string; description: string }> = {
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
  "duo-ai": {
    title: "Duo AI — Conversational AI Platform",
    description: "Conversational AI platform design. Interface and experience design for natural interaction with language models.",
  },
  "softruck-redesign": {
    title: "Softruck — Tracking App Redesign",
    description: "Complete redesign of a vehicle tracking mobile app. Usability, visual design, and feature expansion.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = caseMeta[slug];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
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
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return <CaseStudyContent project={project} prev={prev} next={next} />;
}
