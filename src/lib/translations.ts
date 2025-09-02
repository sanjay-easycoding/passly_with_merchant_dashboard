import de from '../localization/de.json';
import en from '../localization/en.json';

export type Locale = 'de' | 'en';

// Define a more specific type for translations
type TranslationData = Record<string, unknown>;

export const translations: Record<Locale, TranslationData> = {
  de,
  en
};

export const defaultLocale: Locale = 'de';

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function useTranslations(locale: Locale, page: string) {
  const pageTranslations = (translations[locale] as TranslationData)?.[page] || (translations[defaultLocale] as TranslationData)?.[page];
  if (!pageTranslations) {
    throw new Error(`Translations not found for page: ${page}`);
  }
  return pageTranslations as any;
}
