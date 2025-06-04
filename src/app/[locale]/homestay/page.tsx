import Section1 from "./_components/Section1";
import Section2 from "./_components/Section2";
import Section3 from "./_components/Section3";
import Section4 from "./_components/Section4";

export default function HomestayPage() {
  return (
    <main>
      <Section1 />
      <Section2 />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <Section3 />
          </div>
          <div className="w-full md:w-2/3">
            <Section4 />
          </div>
        </div>
      </div>
    </main>
  );
} 