"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { blogService } from "@/services/blog";
import ImageViewer from "@/app/_components/common/ImageViewer";
import { Blog } from "@/types";

interface Props {
  blogId: string;
}

export default function Section2({ blogId }: Readonly<Props>) {
  const t = useTranslations("Blog");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [contentImages, setContentImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll();
        setBlogs(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog posts';
        setError(errorMessage);
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const currentBlog = blogs.find(blog => blog.id === Number(blogId));
    if (currentBlog?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(currentBlog.content, "text/html");
      const images = Array.from(doc.getElementsByTagName("img")).map(img => img.src);
      setContentImages(images);
    }
  }, [blogs, blogId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const currentBlog = blogs.find(blog => blog.id === Number(blogId));
  if (!currentBlog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-gray-500">{t("noBlogFound")}</div>
      </div>
    );
  }

  const relatedPosts = blogs
    .filter(blog => blog.id !== Number(blogId))
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentBlog.content }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">{t("relatedPosts")}</h2>
          <div className="space-y-6">
            {relatedPosts.map(blog => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="block group"
              >
                <div className="relative aspect-video mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {selectedImageIndex !== null && (
        <ImageViewer
          images={contentImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
} 