"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { blogService } from "@/services/blog";
import { useApi } from "@/hooks/useApi";
import { Blog, ApiResponse } from "@/types";
import { useTranslations } from "next-intl";

interface Props {
  blogId: string;
}

export default function Section2({ blogId }: Props) {
  const t = useTranslations("Blog.detail.section2");
  const fetchRelatedPosts = useCallback(() => blogService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Blog[]>, []>(fetchRelatedPosts);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0 animate-pulse">
            <div className="h-96 bg-base-200 rounded-xl"></div>
          </div>
          <aside className="w-full lg:w-80 animate-pulse">
            <div className="bg-base-200 rounded-xl p-6 shadow">
              <div className="h-6 bg-base-300 rounded w-1/3 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-20 h-16 bg-base-300 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-base-300 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading related posts: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No related posts found</div>;
  }

  // Filter out the current blog post and get up to 6 related posts
  const relatedPosts = data.data
    .filter(post => post.slug !== blogId)
    .slice(0, 6);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0" data-aos="fade-up">
          <article className="prose max-w-none prose-headings:font-normal prose-headings:italic prose-a:text-primary prose-a:underline hover:prose-a:text-accent prose-img:rounded-xl prose-img:mx-auto">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: data.data.find(post => post.slug === blogId)?.content || '' }} />
          </article>
        </div>
        {/* Related Posts */}
        <aside className="w-full lg:w-80" data-aos="fade-left" data-aos-delay="200">
          <div className="bg-base-200 rounded-xl p-6 shadow">
            <div className="text-lg italic mb-4">{t("relatedPosts")}</div>
            <ul className="space-y-4">
              {relatedPosts.map((post, idx) => (
                <li key={post.id} className="flex items-center gap-4" data-aos="fade-left" data-aos-delay={300 + idx * 100}>
                  <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
                    <Image 
                      src={post.thumbnail || "https://picsum.photos/400/300"} 
                      alt={post.title} 
                      width={80}
                      height={64}
                      className="object-cover rounded-lg" 
                    />
                  </Link>
                  <Link href={`/blog/${post.slug}`} className="flex-1 text-sm text-base-content/80 line-clamp-2 hover:text-accent transition-colors">
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