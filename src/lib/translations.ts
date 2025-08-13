import de from '../localization/de.json';
import en from '../localization/en.json';
import fr from '../localization/fr.json';

export type Locale = 'de' | 'en' | 'fr';

export const translations = {
  de,
  en,
  fr
};

export const defaultLocale: Locale = 'de';

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}
