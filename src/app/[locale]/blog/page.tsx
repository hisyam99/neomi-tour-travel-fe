import Section1 from "./_components/Section1";
import Section2 from "./_components/Section2";

export default function BlogPage() {
  return (
    <main>
      <Section1 />
      <div className="container mx-auto px-4">
        <Section2 />
      </div>
    </main>
  );
} 