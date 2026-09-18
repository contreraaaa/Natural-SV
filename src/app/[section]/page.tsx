import { NaturalSVApp } from "@/components/NaturalSVApp";

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return <NaturalSVApp section={section} />;
}
