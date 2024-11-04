// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './pt.json'
import eng from './eng.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: eng,
            },
            pt: {
                translation: pt,
            },
        },
        lng: 'en', // Set the default language
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false, // React already escapes values by default
        },
    });

export default i18n;
