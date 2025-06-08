"use client";

import React, { useEffect, useCallback } from "react";
import { blogService } from "@/services/blog";
import { useApi } from "@/hooks/useApi";
import { Blog, ApiResponse } from "@/types";
import Image from "next/image";

interface Props {
  blogId: string;
}

export default function Section1({ blogId }: Props) {
  const fetchBlog = useCallback(() => blogService.getBySlug(blogId), [blogId]);
  const { data, loading, error, execute } =
    useApi<ApiResponse<Blog>>(fetchBlog);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center -mt-16 pt-16">
        <div className="absolute inset-0 bg-base-200 animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error">Error loading blog post: {error.message}</div>
    );
  }

  if (!data?.data) {
    return <div className="text-center">Blog post not found</div>;
  }

  const blog = data.data;

  return (
    <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center -mt-16 pt-16">
      <Image
        src={blog.thumbnail || "https://picsum.photos/1920/800"}
        alt={blog.title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <div className="hero-overlay absolute inset-0 bg-neutral/60"></div>
      <div className="container mx-auto relative z-10 px-4 py-16">
        <div className="max-w-3xl text-left text-neutral-content">
          <div className="text-sm mb-4" data-aos="fade-up" data-aos-delay="100">
            {new Date(blog.created_at).toLocaleDateString()}
          </div>
          <h1
            className="mb-4 text-5xl italic"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {blog.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
