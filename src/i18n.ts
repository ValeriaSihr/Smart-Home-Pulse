import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uk from './locales/uk.json';
import en from './locales/en.json';
import pt from './locales/pt.json';

const storageKey = 'smart-home-pulse.language';
let language = 'uk';
try {
  const saved = localStorage.getItem(storageKey);
  if (saved && ['uk', 'en', 'pt'].includes(saved)) language = saved;
} catch { /* Language switching still works when storage is unavailable. */ }

void i18n.use(initReactI18next).init({
  resources: { uk: { translation: uk }, en: { translation: en }, pt: { translation: pt } },
  lng: language,
  fallbackLng: 'uk',
  supportedLngs: ['uk', 'en', 'pt'],
  interpolation: { escapeValue: false },
});

document.documentElement.lang = language;
i18n.on('languageChanged', language => {
  document.documentElement.lang = language;
  try { localStorage.setItem(storageKey, language); } catch { /* Storage is optional. */ }
});

export default i18n;
