"use client";

import React, { useEffect, useCallback } from "react";
import { blogService } from "@/services/blog";
import { useApi } from "@/hooks/useApi";
import { Blog, ApiResponse } from "@/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Section2() {
  const fetchBlogs = useCallback(() => blogService.getAll(), []);
  const { data, loading, error, execute } = useApi<ApiResponse<Blog[]>>(fetchBlogs);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.data.map((post) => (
        <div key={post.id} className="bg-base-200 rounded-xl p-6 shadow">
          <div className="relative h-48 mb-4">
            <Image
              src={post.thumbnail || "https://picsum.photos/400/300"}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="text-sm text-base-content/70 mb-2">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <div className="text-base-content/70 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content }} />
          <Link href={`/blog/${post.slug}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
} 