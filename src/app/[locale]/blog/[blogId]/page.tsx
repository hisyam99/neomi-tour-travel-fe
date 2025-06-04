import Section1 from "../_components/detail/Section1";
import Section2 from "../_components/detail/Section2";

type Props = {
  params: Promise<{
    blogId: string;
    locale: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogDetailPage({ params, searchParams }: Props) {
  await Promise.all([params, searchParams]); // We need to await both even if we don't use them
  
  return (
    <main>
      <Section1 />
      <Section2 />
    </main>
  );
} 