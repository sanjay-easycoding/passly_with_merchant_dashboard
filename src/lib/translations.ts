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
