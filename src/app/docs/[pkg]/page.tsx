import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { craftaPackages, packageBySlug } from "../../../lib/site-data";
import { PackageDocsLayout } from "../../../components/package-docs-layout";

type PageProps = {
  params: Promise<{ pkg: string }>;
};

export async function generateStaticParams() {
  return craftaPackages.map((pkg) => ({ pkg: pkg.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pkg } = await params;
  const data = packageBySlug[pkg];

  if (!data) {
    return { title: "Package Docs" };
  }

  return {
    title: `${data.name} Docs`,
    description: `${data.name} documentation, sections, highlights, and implementation guidance in the Crafta ecosystem.`,
  };
}

export default async function PackageDocsPage({ params }: PageProps) {
  const { pkg } = await params;
  const data = packageBySlug[pkg];

  if (!data) {
    notFound();
  }

  return <PackageDocsLayout data={data} packageList={craftaPackages} routeBase="docs" />;
}
