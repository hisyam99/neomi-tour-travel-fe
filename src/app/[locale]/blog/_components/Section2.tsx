import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const blogs = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  date: "12 Mei 2025",
  title: "5 Rekomendasi Bakso di Malang yang Wajib Dikunjungi",
  excerpt: "Malang dikenal sebagai salah satu kota kuliner di Jawa Timur, dan salah satu hidangan yang paling populer adalah bakso Malang.",
  image: `https://picsum.photos/400/300?random=${i + 1}`,
}));

export default function Section2() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {blogs.map((blog, index) => (
            <div key={blog.id} className="bg-base-200 rounded-xl shadow flex flex-col overflow-hidden" 
              data-aos="fade-up"
              data-aos-delay={100 * (index % 4)}
            >
              <Image 
                src={blog.image} 
                alt={blog.title} 
                width={400}
                height={160}
                className="object-cover w-full h-40" 
              />
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-base-content/60 mb-1">{blog.date}</div>
                <div className="font-semibold mb-1 text-sm line-clamp-2">{blog.title}</div>
                <div className="text-xs text-base-content/80 mb-2 line-clamp-3">{blog.excerpt}</div>
                <Link href={`/blog/${blog.id}`} className="mt-auto text-primary text-xs font-semibold hover:underline">Baca selengkapnya &gt;</Link>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-4" data-aos="fade-up" data-aos-delay="400">
          <button className="btn btn-outline btn-sm">Previous</button>
          <div className="flex gap-2">
            <button className="btn btn-circle btn-xs bg-base-200">1</button>
            <button className="btn btn-circle btn-xs bg-base-200">2</button>
            <button className="btn btn-circle btn-xs bg-base-200">3</button>
          </div>
          <button className="btn btn-outline btn-sm">Next</button>
        </div>
      </div>
    </section>
  );
} 