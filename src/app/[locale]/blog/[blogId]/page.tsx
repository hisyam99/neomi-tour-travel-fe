import React from "react";
import Section1 from "../_components/detail/Section1";
import Section2 from "../_components/detail/Section2";

type Props = {
  params: Promise<{
    blogId: string;
    locale: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogDetailPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const [{ blogId }] = await Promise.all([params, searchParams]);

  return (
    <main className="pt-16">
      <Section1 blogId={blogId} />
      <Section2 blogId={blogId} />
    </main>
  );
}
