export const SUPPORTED_LANGS = ['es', 'ca', 'en'];
export function getLangStaticPaths() {
  return SUPPORTED_LANGS.map(lang => ({ params: { lang } }));
}
import en from '../i18n/en.json';
import ca from '../i18n/ca.json';
import es from '../i18n/es.json';

const locales = { en, ca, es };

export function getLocaleFromPath(path) {
  if (path.startsWith('/ca')) return 'ca';
  if (path.startsWith('/es')) return 'es';
  return 'en';
}

export function t(key, lang = 'en') {
  return locales[lang][key] || key;
}
