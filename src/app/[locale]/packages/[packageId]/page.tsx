import Section1 from "../_components/detail/Section1";
import Section2 from "../_components/detail/Section2";
import Section3 from "../_components/detail/Section3";
import Section4 from "../_components/detail/Section4";
import Section5 from "../_components/detail/Section5";
import Section6 from "../_components/detail/Section6";

type Props = {
  params: Promise<{
    packageId: string;
    locale: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PackageDetailPage({ params, searchParams }: Props) {
  const [{ packageId }] = await Promise.all([params, searchParams]);
  
  return (
    <main>
      <Section1 packageId={packageId} />
      <Section2 packageId={packageId} />
      <Section3 packageId={packageId} />
      <Section4 packageId={packageId} />
      <Section5 packageId={packageId} />
      <Section6 packageId={packageId} />
    </main>
  );
} 