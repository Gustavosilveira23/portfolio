import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { guides } from "@/content/skills";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gustavosilveira.com";

  const projectUrls = projects.flatMap((project) => [
    {
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pt/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  // Guias de skill: a data é a do conteúdo, não a do build (frescor conta para busca e IA).
  // O índice leva a data do guia atualizado por último.
  const day = (d: string) => new Date(`${d}T12:00:00Z`);
  const all = Object.values(guides);
  const latest = all.map((g) => g.updated).sort().at(-1)!;
  const skillUrls = [
    { path: "/skills", updated: latest, en: 0.7, pt: 0.6 },
    ...all.map((g) => ({ path: `/skills/${g.slug}`, updated: g.updated, en: 0.8, pt: 0.7 })),
  ].flatMap(({ path, updated, en, pt }) => [
    { url: `${baseUrl}${path}`, lastModified: day(updated), changeFrequency: "monthly" as const, priority: en },
    { url: `${baseUrl}/pt${path}`, lastModified: day(updated), changeFrequency: "monthly" as const, priority: pt },
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pt/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pt/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...projectUrls,
    ...skillUrls,
  ];
}
