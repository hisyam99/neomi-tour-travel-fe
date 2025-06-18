"use client";

import React, { useEffect, useCallback, useState, useRef } from "react";
import { homestaysService } from "@/services/homestays";
import { useApi } from "@/hooks/useApi";
import { Homestay, ApiResponse } from "@/types";
import { FaUsers, FaRuler, FaBed, FaMountain } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface Props {
  roomId: number;
}

export default function Section3({ roomId }: Props) {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const fetchHomestay = useCallback(() => homestaysService.getById(roomId), [roomId]);
  const { data, loading, error, execute } = useApi<ApiResponse<Homestay>, []>(fetchHomestay);

  // Function to extract images from content
  const extractImagesFromContent = (content: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const imgElements = tempDiv.getElementsByTagName("img");
    const extractedImages = Array.from(imgElements).map((img) => ({
      src: img.src,
      alt: img.alt || "Homestay image",
    }));
    return extractedImages;
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

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data?.data?.description) {
      const extractedImages = extractImagesFromContent(data.data.description);
      setImages(extractedImages);
    }
  }, [data]);

  // Add click event listeners to images after content is rendered
  useEffect(() => {
    if (contentRef.current) {
      const imgElements = contentRef.current.getElementsByTagName("img");
      Array.from(imgElements).forEach((img) => {
        img.removeAttribute("onclick");
        img.removeAttribute("href");
        img.setAttribute("role", "button");
        img.setAttribute("tabIndex", "0");
        img.setAttribute("aria-label", `View image: ${img.alt || "Homestay image"}`);
        img.addEventListener("click", (e) => handleImageClick(e, img.src));
        img.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleImageClick(e, img.src);
          }
        });
      });
    }
  }, [handleImageClick]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-base-200 rounded w-1/4"></div>
            <div className="h-4 bg-base-200 rounded w-full"></div>
            <div className="h-4 bg-base-200 rounded w-2/3"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-base-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-error">Error loading homestay: {error.message}</div>;
  }

  if (!data?.data) {
    return <div className="text-center">Homestay not found</div>;
  }

  const homestay = data.data;
  const details = homestay.details;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-bold text-2xl mb-4">Description</h2>
          <div
            ref={contentRef}
            className="prose max-w-none prose-headings:font-normal prose-headings:italic prose-a:text-primary prose-a:underline hover:prose-a:text-accent prose-img:rounded-xl prose-img:mx-auto [&_.attachment]:my-8 [&_.attachment__caption]:text-sm [&_.attachment__caption]:text-base-content/70 [&_.attachment__caption]:mt-2 [&_.attachment__caption]:text-center [&_.attachment__name]:font-medium [&_.attachment__size]:text-base-content/50 [&_.attachment__size]:ml-2 [&_figure]:my-8 [&_figure]:block [&_figcaption]:text-sm [&_figcaption]:text-base-content/70 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_img]:rounded-xl [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:cursor-pointer [&_img]:hover:opacity-90 [&_img]:transition-opacity [&_img]:focus:outline-none [&_img]:focus:ring-2 [&_img]:focus:ring-primary [&_img]:focus:ring-offset-2 [&_p]:my-4 [&_p]:leading-relaxed [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl [&_h5]:text-lg [&_h6]:text-base [&_ul]:list-disc [&_ol]:list-decimal [&_li]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-base-content/80 [&_pre]:bg-base-200 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:bg-base-200 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:break-words [&_code]:whitespace-pre-wrap [&_code]:overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-base-300 [&_th]:p-2 [&_td]:border [&_td]:border-base-300 [&_td]:p-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:font-mono [&_pre_code]:leading-relaxed [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words [&_pre_code]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: processContentHtml(homestay.description) }}
          />
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-xl mb-4">Room Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaUsers className="text-primary text-xl" />
              </div>
              <span className="font-medium">{details.max_guest}</span>
              <span className="text-sm text-base-content/70">Max Guests</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaRuler className="text-primary text-xl" />
              </div>
              <span className="font-medium">{details.size}</span>
              <span className="text-sm text-base-content/70">Room Size</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaBed className="text-primary text-xl" />
              </div>
              <span className="font-medium">{details.type}</span>
              <span className="text-sm text-base-content/70">Room Type</span>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-base-200 rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <FaMountain className="text-primary text-xl" />
              </div>
              <span className="font-medium">Rp {parseInt(details.price).toLocaleString()}</span>
              <span className="text-sm text-base-content/70">Price</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-xl mb-4">Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {details.facilities.map((facility) => (
              <div key={facility.id} className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{facility.name}</span>
              </div>
            ))}
          </div>
        </div>
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