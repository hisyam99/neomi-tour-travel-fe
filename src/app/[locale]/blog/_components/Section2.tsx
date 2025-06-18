"use client";

import React, { useEffect, useCallback, useState } from "react";
import { blogService } from "@/services/blog";
import { useApi } from "@/hooks/useApi";
import { Blog, ApiResponse } from "@/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const POSTS_PER_PAGE = 6;

// Helper function to strip HTML and get plain text
const stripHtml = (html: string) => {
  // Use DOMParser instead of creating an element (works both client and server-side)
  if (typeof window !== 'undefined') {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    // Replace multiple consecutive spaces, newlines, and tabs with a single space
    return (tmp.textContent || tmp.innerText || '')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    // Simple regex fallback for server-side
    return html
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
};

export default function Section2() {
  const t = useTranslations("Blog.section2");
  const [currentPage, setCurrentPage] = useState(1);
  const fetchBlogs = useCallback(() => blogService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Blog[]>, []>(fetchBlogs);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-base-200 rounded-xl p-6 shadow animate-pulse">
            <div className="h-48 bg-base-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-error">Error loading blog posts: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No blog posts found</div>;
  }

  const totalPages = Math.ceil(data.data.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = data.data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id} 
            className="block bg-base-200 rounded-xl p-6 shadow hover:shadow-lg transition-shadow" 
            data-aos="fade-up"
          >
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <Image 
                src={post.thumbnail || "https://picsum.photos/400/300"}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="text-sm text-base-content/70 mb-3">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
            <div className="text-base-content/70 mb-6 line-clamp-3">
              {stripHtml(post.content)}
            </div>
            <div className="btn btn-primary w-full">
              {t("readMore")}
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-8" data-aos="fade-up">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}