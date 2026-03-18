import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { CaseStudyContent } from "@/components/case-study-content";

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
