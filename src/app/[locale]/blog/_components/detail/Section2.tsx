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

  const currentBlog = data.data.find(post => post.slug === blogId);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0" data-aos="fade-up">
          <article className="prose max-w-none prose-headings:font-normal prose-headings:italic prose-a:text-primary prose-a:underline hover:prose-a:text-accent prose-img:rounded-xl prose-img:mx-auto">
            <div 
              className="prose prose-lg max-w-none [&_.attachment]:my-8 [&_.attachment]:block [&_.attachment__caption]:text-sm [&_.attachment__caption]:text-base-content/70 [&_.attachment__caption]:mt-2 [&_.attachment__caption]:text-center [&_.attachment__name]:font-medium [&_.attachment__size]:text-base-content/50 [&_.attachment__size]:ml-2 [&_figure]:my-8 [&_figure]:block [&_figcaption]:text-sm [&_figcaption]:text-base-content/70 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_img]:rounded-xl [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto [&_p]:my-4 [&_p]:leading-relaxed [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl [&_h5]:text-lg [&_h6]:text-base [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-base-content/80 [&_pre]:bg-base-200 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:bg-base-200 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:break-words [&_code]:whitespace-pre-wrap [&_code]:overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-base-300 [&_th]:p-2 [&_td]:border [&_td]:border-base-300 [&_td]:p-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:font-mono [&_pre_code]:leading-relaxed [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words [&_pre_code]:overflow-x-auto"
              dangerouslySetInnerHTML={{ 
                __html: currentBlog?.content || '',
              }} 
            />
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