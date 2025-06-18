"use client";

import React, { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { blogService } from "@/services/blog";
import { useApi } from "@/hooks/useApi";
import { Blog, ApiResponse } from "@/types";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Props {
  blogId: string;
}

export default function Section2({ blogId }: Props) {
  const t = useTranslations("Blog.detail.section2");
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const fetchRelatedPosts = useCallback(() => blogService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Blog[]>, []>(
    fetchRelatedPosts
  );

  // Function to extract images from content
  const extractImagesFromContent = (content: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    
    // Find all figure elements with attachments
    const figureElements = tempDiv.getElementsByTagName("figure");
    Array.from(figureElements).forEach(figure => {
      const anchor = figure.querySelector("a");
      const img = figure.querySelector("img");
      const figcaption = figure.querySelector("figcaption");
      if (anchor && img) {
        // Remove the anchor and keep the image and figcaption
        const newFigure = document.createElement("figure");
        newFigure.className = figure.className;
        newFigure.setAttribute("data-trix-attachment", figure.getAttribute("data-trix-attachment") || "");
        newFigure.setAttribute("data-trix-content-type", figure.getAttribute("data-trix-content-type") || "");
        newFigure.setAttribute("data-trix-attributes", figure.getAttribute("data-trix-attributes") || "");
        
        newFigure.appendChild(img);
        if (figcaption) {
          newFigure.appendChild(figcaption);
        }
        
        figure.parentNode?.replaceChild(newFigure, figure);
      }
    });

    const imgElements = tempDiv.getElementsByTagName("img");
    const extractedImages = Array.from(imgElements).map((img) => ({
      src: img.src,
      alt: img.alt || "Blog image",
    }));
    return extractedImages;
  };

  // Function to process content before rendering
  const processContent = (content: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    
    // Find all figure elements with attachments
    const figureElements = tempDiv.getElementsByTagName("figure");
    Array.from(figureElements).forEach(figure => {
      const anchor = figure.querySelector("a");
      const img = figure.querySelector("img");
      const figcaption = figure.querySelector("figcaption");
      if (anchor && img) {
        // Remove the anchor and keep the image and figcaption
        const newFigure = document.createElement("figure");
        newFigure.className = figure.className;
        newFigure.setAttribute("data-trix-attachment", figure.getAttribute("data-trix-attachment") || "");
        newFigure.setAttribute("data-trix-content-type", figure.getAttribute("data-trix-content-type") || "");
        newFigure.setAttribute("data-trix-attributes", figure.getAttribute("data-trix-attributes") || "");
        
        newFigure.appendChild(img);
        if (figcaption) {
          newFigure.appendChild(figcaption);
        }
        
        figure.parentNode?.replaceChild(newFigure, figure);
      }
    });

    return tempDiv.innerHTML;
  };

  // Function to handle image click
  const handleImageClick = useCallback(
    (e: Event, imgSrc: string) => {
      e.preventDefault();
      e.stopPropagation();
      const imgIndex = images.findIndex((img) => img.src === imgSrc);
      if (imgIndex !== -1) {
        setIndex(imgIndex);
      }
    },
    [images]
  );
  // Helper function to process content HTML
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

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data?.data) {
      const currentBlog = data.data.find((post) => post.slug === blogId);
      if (currentBlog?.content) {
        const processedContent = processContent(currentBlog.content);
        const extractedImages = extractImagesFromContent(processedContent);
        setImages(extractedImages);
        
        // Update the content ref with processed content
        if (contentRef.current) {
          contentRef.current.innerHTML = processedContent;
        }
      }
    }
  }, [data, blogId]);

  // Add click event listeners to images after content is rendered
  useEffect(() => {
    if (contentRef.current) {
      const imgElements = contentRef.current.getElementsByTagName("img");
      Array.from(imgElements).forEach((img) => {
        img.removeAttribute("onclick");
        img.removeAttribute("href");
        img.setAttribute("role", "button");
        img.setAttribute("tabIndex", "0");
        img.setAttribute("aria-label", `View image: ${img.alt || "Blog image"}`);
        img.addEventListener("click", (e) => handleImageClick(e, img.src));
        img.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleImageClick(e, img.src);
          }
        });
      });
    }
  }, [handleImageClick, data]);

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
                {Array.from({ length: 6 }).map(() => (
                  <div
                    key={`skeleton-related-${crypto.randomUUID()}`}
                    className="flex items-center gap-4"
                  >
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
    return (
      <div className="text-error">
        Error loading related posts: {error.message}
      </div>
    );
  }
  if (!data?.data || data.data.length === 0) {
    return <div className="text-center">No related posts found</div>;
  }

  // Get the current blog post
  const currentBlog = data.data.find((post) => post.slug === blogId);
  if (!currentBlog) {
    return <div className="text-center">Blog post not found</div>;
  }

  // Filter out the current blog post and get up to 6 related posts
  const relatedPosts = data.data
    .filter((post) => post.slug !== blogId)
    .slice(0, 6);
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0" data-aos="fade-up">
          <article className="prose max-w-none prose-headings:font-normal prose-headings:italic prose-a:text-primary prose-a:underline hover:prose-a:text-accent prose-img:rounded-xl prose-img:mx-auto">
            <section
              aria-label="Blog content"
              className="prose prose-lg max-w-none [&_.attachment]:my-8 [&_.attachment]:block [&_.attachment]:mx-auto [&_.attachment]:max-w-full [&_.attachment__caption]:text-sm [&_.attachment__caption]:text-base-content/70 [&_.attachment__caption]:mt-2 [&_.attachment__caption]:text-center [&_.attachment__name]:font-medium [&_.attachment__size]:text-base-content/50 [&_.attachment__size]:ml-2 [&_figure]:my-8 [&_figure]:block [&_figure]:mx-auto [&_figure]:max-w-full [&_figcaption]:text-sm [&_figcaption]:text-base-content/70 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_img]:rounded-xl [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:max-h-[500px] [&_img]:object-contain [&_img]:cursor-pointer [&_img]:hover:opacity-90 [&_img]:transition-opacity [&_img]:focus:outline-none [&_img]:focus:ring-2 [&_img]:focus:ring-primary [&_img]:focus:ring-offset-2 [&_p]:my-4 [&_p]:leading-relaxed [&_p_figure]:my-6 [&_p_img]:my-6 [&_h1]:text-4xl [&_h2]:text-3xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-xl [&_h5]:text-lg [&_h6]:text-base [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-2 [&_li]:ml-6 [&_ul_li]:pl-2 [&_ol_li]:pl-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-base-content/80 [&_pre]:bg-base-200 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:bg-base-200 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:break-words [&_code]:whitespace-pre-wrap [&_code]:overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-base-300 [&_th]:p-2 [&_td]:border [&_td]:border-base-300 [&_td]:p-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:font-mono [&_pre_code]:leading-relaxed [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words [&_pre_code]:overflow-x-auto [&_strong]:font-bold [&_em]:italic [&_ul_ul]:mt-0 [&_ul_ul_li]:ml-6 [&_ol_ol]:mt-0 [&_ol_ol_li]:ml-6 [&_[data-trix-attachment]]:max-w-full [&_[data-trix-attachment]_img]:max-w-full [&_[data-trix-attachment]_img]:max-h-[500px] [&_[data-trix-attachment]_img]:object-contain [&_[data-trix-content-type='image/jpeg']]:mx-auto [&_[data-trix-content-type='image/png']]:mx-auto [&_[data-trix-content-type='image/gif']]:mx-auto"
            >
              <div
                ref={contentRef}
                dangerouslySetInnerHTML={{
                  __html: currentBlog.content ? processContentHtml(currentBlog.content) : ""
                }}
              />
            </section>
          </article>
        </div>
        {/* Related Posts */}
        <aside
          className="w-full lg:w-80"
          data-aos="zoom-in-up lg:fade-left"
          data-aos-delay="200"
        >
          <div className="bg-base-200 rounded-xl p-6 shadow">
            <div className="text-lg italic mb-4">{t("relatedPosts")}</div>
            <ul className="space-y-4">
              {relatedPosts.map((post) => (
                <li
                  key={`related-post-${post.id}`}
                  className="flex items-center gap-4"
                  data-aos="zoom-in-up"
                  data-aos-delay={300}
                >
                  <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
                    <Image
                      src={post.thumbnail || "https://picsum.photos/400/300"}
                      alt={post.title}
                      width={80}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  </Link>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex-1 text-sm text-base-content/80 line-clamp-2 hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Zoom, Fullscreen]}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          padding: 4,
          gap: 8,
          imageFit: "contain",
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        carousel={{
          finite: false,
          preload: 2,
          padding: "16px",
          spacing: "30%",
          imageFit: "contain",
        }}
        animation={{ fade: 300 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          },
          thumbnailsContainer: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          },
        }}
      />
    </section>
  );
}
