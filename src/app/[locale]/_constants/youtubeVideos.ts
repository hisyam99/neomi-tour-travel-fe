export const YOUTUBE_VIDEOS = {
  home: {
    videoId: "HTuEkLSLg00",
    title: "Neomi Home Video"
  },
  about: {
    videoId: "dQw4w9WgXcQ",
    title: "About Neomi Story"
  },
  homestay: {
    videoId: "dQw4w9WgXcQ",
    title: "Neomi Homestay Tour"
  },
  blog: {
    videoId: "dQw4w9WgXcQ",
    title: "Neomi Blog Introduction"
  },
  packages: {
    videoId: "dQw4w9WgXcQ",
    title: "Neomi Tour Packages"
  },
  gallery: {
    videoId: "dQw4w9WgXcQ",
    title: "Neomi Gallery"
  }
} as const;

export type VideoSection = keyof typeof YOUTUBE_VIDEOS; 