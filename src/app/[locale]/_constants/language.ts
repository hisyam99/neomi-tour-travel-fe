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
  },
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  }
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code']; 