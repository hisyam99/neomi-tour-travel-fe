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
  // Helper function to process content HTML for better formatting
  const processContentHtml = (htmlContent: string) => {
    if (!htmlContent) return "";
    
    // Create a temporary DOM element to manipulate the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    
    // Process images and figures to restrict their size
    const figures = tempDiv.querySelectorAll("figure");
    figures.forEach((figure) => {
      // Add responsive image classes
      figure.classList.add("mx-auto", "my-6");
      figure.setAttribute("style", "max-width: 100%; margin: 1.5rem auto;");
      
      // Process all images inside figures
      const images = figure.querySelectorAll("img");
      images.forEach((img) => {
        // Make images responsive
        img.classList.add("mx-auto", "h-auto", "rounded-lg");
        img.setAttribute("style", "max-width: 100%; height: auto; max-height: 500px; object-fit: contain;");
      });
      
      // Process figcaptions
      const figcaptions = figure.querySelectorAll("figcaption");
      figcaptions.forEach((caption) => {
        caption.classList.add("text-center", "text-sm", "mt-2", "text-base-content/70");
      });
    });
    
    // Process standalone images (not in figures)
    const images = tempDiv.querySelectorAll("img:not(figure img)");
    images.forEach((img) => {
      img.classList.add("mx-auto", "h-auto", "my-4", "rounded-lg");
      img.setAttribute("style", "max-width: 100%; height: auto; max-height: 500px; object-fit: contain;");
    });
    
    // Process Trix-specific attachments
    const attachments = tempDiv.querySelectorAll("[data-trix-attachment]");
    attachments.forEach((attachment) => {
      attachment.classList.add("mx-auto", "my-6");
      attachment.setAttribute("style", "max-width: 100%; margin: 1.5rem auto;");
      
      // Find images inside attachments
      const attachmentImages = attachment.querySelectorAll("img");
      attachmentImages.forEach((img) => {
        img.classList.add("mx-auto", "h-auto", "rounded-lg");
        img.setAttribute("style", "max-width: 100%; height: auto; max-height: 500px; object-fit: contain;");
      });
    });
    
    // Fix indentation and spacing
    // Clean list indentation
    const listItems = tempDiv.querySelectorAll("li");
    listItems.forEach((li) => {
      li.classList.add("ml-6");
    });
    
    // Fix heading spacing
    const h2Elements = tempDiv.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
      h2.classList.add("mt-8", "mb-4");
    });
    
    const h3Elements = tempDiv.querySelectorAll("h3");
    h3Elements.forEach((h3) => {
      h3.classList.add("mt-6", "mb-3");
    });
    
    // Remove excessive whitespace at start of paragraphs
    const paragraphs = tempDiv.querySelectorAll("p");
    paragraphs.forEach((p) => {
      if (p.innerHTML.startsWith("&nbsp;")) {
        p.innerHTML = p.innerHTML.replace(/^(&nbsp;)+/, "");
      }
    });
    
    return tempDiv.innerHTML;
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
                dangerouslySetInnerHTML={{ __html: processContentHtml(post.content) }}
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