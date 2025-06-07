"use client";

import React, { useEffect, useCallback } from "react";
import { blogService } from "@/services/blog";
import { useApi } from "@/hooks/useApi";
import { Blog, ApiResponse } from "@/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Props {
  blogId: string;
}

const blogs = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  date: "12 Mei 2025",
  title: "5 Rekomendasi Bakso di Malang yang Wajib Dikunjungi",
  excerpt: "Malang dikenal sebagai salah satu kota kuliner di Jawa Timur, dan salah satu hidangan yang paling populer adalah bakso Malang.",
  image: `https://picsum.photos/400/300?random=${i + 1}`,
}));

const dummyContent = `
  <h2>Judul Blog Panjang</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</p>
  <p>Aliquam erat volutpat. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.</p>
  <h3>Subjudul</h3>
  <ul>
    <li>Poin pertama dengan penjelasan yang sangat panjang dan detail, bisa lebih dari satu baris.</li>
    <li>Poin kedua dengan penjelasan yang sangat panjang dan detail, bisa lebih dari satu baris.</li>
    <li>Poin ketiga dengan penjelasan yang sangat panjang dan detail, bisa lebih dari satu baris.</li>
  </ul>
  <p>Paragraf penutup yang juga cukup panjang untuk simulasi konten blog yang dihasilkan dari WYSIWYG editor. Bisa mengandung <strong>teks tebal</strong>, <em>teks miring</em>, dan <a href='#'>tautan</a>.</p>
`;

export default function Section2({ blogId }: Props) {
  const t = useTranslations("Blog.detail.section2");
  const fetchBlog = useCallback(() => blogService.getById(blogId), [blogId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Blog>>(fetchBlog);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-4 bg-base-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-base-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-base-200 rounded w-5/6 mb-4"></div>
              <div className="h-4 bg-base-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading blog post: {error.message}</div>;
  }

  if (!data?.data) {
    return <div className="text-center">Blog post not found</div>;
  }

  const blog = data.data;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0" data-aos="fade-up">
          <article className="prose max-w-none prose-headings:font-normal prose-headings:italic prose-a:text-primary prose-a:underline hover:prose-a:text-accent prose-img:rounded-xl prose-img:mx-auto">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        </div>
        {/* Related Posts */}
        <aside className="w-full lg:w-80" data-aos="fade-left" data-aos-delay="200">
          <div className="bg-base-200 rounded-xl p-6 shadow">
            <div className="text-lg italic mb-4">{t("relatedPosts")}</div>
            <ul className="space-y-4">
              {blogs.slice(0, 6).map((post, idx) => (
                <li key={post.id} className="flex items-center gap-4" data-aos="fade-left" data-aos-delay={300 + idx * 100}>
                  <Link href={`/blog/${post.id}`} className="flex-shrink-0">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      width={80}
                      height={64}
                      className="object-cover rounded-lg" 
                    />
                  </Link>
                  <Link href={`/blog/${post.id}`} className="flex-1 text-sm text-base-content/80 line-clamp-2 hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
} 