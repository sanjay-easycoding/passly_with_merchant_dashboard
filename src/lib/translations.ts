import de from '../localization/de.json';
import en from '../localization/en.json';

export type Locale = 'de' | 'en';

export const translations = {
  de,
  en
};

export const defaultLocale: Locale = 'de';

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function useTranslations(locale: Locale, page: string) {
  const pageTranslations = (translations[locale] as any)?.[page] || (translations[defaultLocale] as any)?.[page];
  if (!pageTranslations) {
    throw new Error(`Translations not found for page: ${page}`);
  }
  return pageTranslations;
}
