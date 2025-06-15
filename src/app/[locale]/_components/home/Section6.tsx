"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { blogService } from "@/services/blog";
import { useApi } from "@/hooks/useApi";
import { Blog, ApiResponse } from "@/types";

export default function Section6() {
  const t = useTranslations("Home.section6");
  const commonT = useTranslations("Common");
  const carouselRef = useRef<HTMLDivElement>(null);
  const fetchBlogs = useCallback(() => blogService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Blog[]>, []>(fetchBlogs);

  useEffect(() => {
    execute();
  }, [execute]);

  const scroll = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-base-200 rounded w-1/4 mb-8 animate-pulse"></div>
          <div className="flex justify-end mb-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-base-200 rounded-full animate-pulse"></div>
              <div className="w-12 h-12 bg-base-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 max-w-xs bg-transparent">
                <div className="h-48 bg-base-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 bg-base-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-6 bg-base-200 rounded w-2/3 mb-2 animate-pulse"></div>
                <div className="h-4 bg-base-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-base-200 rounded w-1/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading blog posts: {error.message}</div>;
  }

  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No blog posts found</div>;
  }

  // Get latest 6 posts
  const latestPosts = data.data.slice(0, 6);

  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl mb-4 italic" data-aos="fade-up">{t("title")}</h2>
        <div className="flex justify-end mb-6" data-aos="fade-up" data-aos-delay="100">
          <div className="flex gap-4">
            <button className="btn btn-circle bg-base-200 border-none" onClick={() => scroll("left")} aria-label="Previous">
              <FaChevronLeft className="text-xl" />
            </button>
            <button className="btn btn-circle bg-base-200 border-none" onClick={() => scroll("right")} aria-label="Next">
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide"
          style={{ 
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            pointerEvents: "none"
          }}
        >
          {latestPosts.map((post, i) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="flex-shrink-0 w-80 max-w-xs bg-transparent hover:opacity-90 transition-opacity"
              style={{ 
                scrollSnapAlign: "start",
                pointerEvents: "auto"
              }}
              data-aos="fade-up"
              data-aos-delay={100 * (i + 1)}
            >
              <div className="mb-4">
                <Image
                  src={post.thumbnail || "https://picsum.photos/400/300"}
                  alt={post.title}
                  width={320}
                  height={240}
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              <div className="text-sm text-base-content/70 mb-1">{new Date(post.created_at).toLocaleDateString()}</div>
              <div className="font-semibold mb-1">{post.title}</div>
              <div 
                className="text-sm text-base-content/80 mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="italic font-semibold text-primary text-sm hover:underline">
                {commonT("readMore")} &gt;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 