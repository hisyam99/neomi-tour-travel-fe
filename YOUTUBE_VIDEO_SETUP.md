# YouTube Video Modal System

This document explains how to configure and use the YouTube video modal system implemented across the Neomi website.

## Overview

The YouTube video modal system provides a consistent way to display YouTube videos in a popup modal across different sections of the website. It follows DaisyUI v5 best practices and includes proper accessibility features.

## Components

### 1. YouTube Video Constants (`src/app/[locale]/_constants/youtubeVideos.ts`)

This file contains all YouTube video configurations for different sections:

```typescript
export const YOUTUBE_VIDEOS = {
  home: {
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    title: "Neomi Home Video"
  },
  about: {
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
    title: "About Neomi Story"
  },
  // ... other sections
} as const;
```

### 2. YouTube Modal Component (`src/app/[locale]/_components/common/YouTubeModal.tsx`)

A reusable modal component that displays YouTube videos with:
- Responsive design
- Accessibility features
- Keyboard navigation (ESC to close)
- Backdrop click to close
- Body scroll prevention when open

### 3. Custom Hook (`src/hooks/useYouTubeModal.ts`)

Manages the modal state and provides a clean interface:

```typescript
const { isOpen, currentSection, openModal, closeModal } = useYouTubeModal();
```

## How to Configure YouTube Videos

### Step 1: Get YouTube Video ID

1. Go to your YouTube video
2. Copy the video ID from the URL (e.g., from `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`)

### Step 2: Update Video Configuration

Edit `src/app/[locale]/_constants/youtubeVideos.ts`:

```typescript
export const YOUTUBE_VIDEOS = {
  home: {
    videoId: "YOUR_ACTUAL_VIDEO_ID_HERE",
    title: "Your Video Title"
  },
  about: {
    videoId: "YOUR_ACTUAL_VIDEO_ID_HERE", 
    title: "Your Video Title"
  },
  // ... update other sections
} as const;
```

### Step 3: Update Translation Files

Make sure each section has the `playVideo` translation key in all language files:

- `messages/en.json`
- `messages/id.json` 
- `messages/zh.json`

Example:
```json
{
  "Home": {
    "section1": {
      "playVideo": "Watch Video"
    }
  }
}
```

## How to Use in Components

### Basic Implementation

```typescript
"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useYouTubeModal } from "../../../../hooks/useYouTubeModal";
import YouTubeModal from "../../_components/common/YouTubeModal";

export default function YourComponent() {
  const t = useTranslations("YourSection.section1");
  const { isOpen, currentSection, openModal, closeModal } = useYouTubeModal();

  const handleVideoClick = () => {
    openModal("yourSection"); // Must match key in YOUTUBE_VIDEOS
  };

  return (
    <>
      <button 
        className="btn btn-outline btn-primary flex items-center gap-2"
        onClick={handleVideoClick}
        aria-label={t("playVideo")}
      >
        <span className="w-3 h-3 rounded-full bg-primary"></span>
        {t("playVideo")}
      </button>

      <YouTubeModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        section={currentSection || "yourSection"} 
      />
    </>
  );
}
```

## Features

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Responsive Design
- Works on all screen sizes
- Mobile-friendly touch interactions
- Proper aspect ratio maintenance

### User Experience
- Smooth animations
- Loading states
- Error handling
- Body scroll prevention

### Performance
- Lazy loading of YouTube iframe
- Optimized re-renders
- Memory leak prevention

## Best Practices

1. **Video IDs**: Always use the actual YouTube video ID, not the full URL
2. **Titles**: Provide descriptive titles for accessibility
3. **Translations**: Ensure all language files have the `playVideo` key
4. **Section Keys**: Use consistent section keys across components and constants
5. **Error Handling**: The modal gracefully handles missing video configurations

## Troubleshooting

### Modal Not Opening
- Check if the section key exists in `YOUTUBE_VIDEOS`
- Verify the `openModal` function is being called
- Check browser console for errors

### Video Not Playing
- Verify the YouTube video ID is correct
- Check if the video is publicly accessible
- Ensure the video hasn't been removed or made private

### Translation Issues
- Verify the `playVideo` key exists in all translation files
- Check the translation namespace matches your component

## Example Video IDs for Testing

You can use these public YouTube video IDs for testing:
- `dQw4w9WgXcQ` (Rick Astley - Never Gonna Give You Up)
- `9bZkp7q19f0` (PSY - GANGNAM STYLE)
- `kJQP7kiw5Fk` (Luis Fonsi - Despacito)

Remember to replace these with your actual Neomi-related video IDs in production. 