import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import translation_en from './locales/en/translation.json';
import translation_es from './locales/es/translation.json';
import translation_it from './locales/it/translation.json';

i18n
    .use(initReactI18next)
    .init({
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        lng: 'en',
        resources: {
            en: {
                translation: translation_en
            },
            es: {
                translation: translation_es
            },
            it: {
                translation: translation_it
            },
        }
    });

export default i18n;