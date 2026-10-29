import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ pkg: string }>;
};

export default async function LegacyPackageDocs({ params }: PageProps) {
  const { pkg } = await params;
  if (pkg === "crafta-auth") {
    redirect("/docs/crafta-auth/overview");
  }
  redirect("/docs");
}