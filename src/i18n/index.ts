import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common from './locales.en.json';

const resources = {
  en: {
    translation: common
  }
};

const setI18nextConfig = async () =>
  await i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'en'
  });

void setI18nextConfig();

export default i18n;
