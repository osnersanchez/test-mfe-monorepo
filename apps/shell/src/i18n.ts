import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { InitOptions } from 'i18next';

const initOptions: InitOptions = {
  fallbackLng: 'es',
  supportedLngs: ['es', 'en'],
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: '/locales/{{lng}}/translation.json',
  },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(initOptions);

export default i18n;
