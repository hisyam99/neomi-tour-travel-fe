export const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'id',
    name: 'Indonesia',
    flag: '🇮🇩'
  }
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code']; 