export const YOUTUBE_VIDEOS = {
  home: {
    videoId: "HTuEkLSLg00",
    title: "Neomi Home Video"
  },
  about: {
    videoId: "fJ4jfvS5v4o",
    title: "About Neomi Story"
  },
  homestay: {
    videoId: "5yIwXA76-8E",
    title: "Neomi Homestay Tour"
  },
  blog: {
    videoId: "LgqdFmjAul0",
    title: "Neomi Blog Introduction"
  },
  packages: {
    videoId: "rpX5mWCEmns",
    title: "Neomi Tour Packages"
  },
  gallery: {
    videoId: "7rytzSLBWJI",
    title: "Neomi Gallery"
  }
} as const;

export type VideoSection = keyof typeof YOUTUBE_VIDEOS; 