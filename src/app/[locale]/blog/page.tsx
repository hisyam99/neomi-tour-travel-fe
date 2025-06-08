import Section1 from "./_components/Section1";
import Section2 from "./_components/Section2";

export default function BlogPage() {
  return (
    <main className="pt-16">
      <Section1 />
      <div className="container mx-auto px-4 py-16">
        <Section2 />
      </div>
    </main>
  );
} 