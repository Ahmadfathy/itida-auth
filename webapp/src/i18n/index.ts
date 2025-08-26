import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-US': {
    translation: {
      common: { language: 'English', login: 'Login', register: 'Register' },
    },
  },
  'ar-EG': {
    translation: {
      common: { language: 'العربية', login: 'تسجيل الدخول', register: 'تسجيل' },
    },
  },
};

const stored = localStorage.getItem('locale') || import.meta.env.VITE_DEFAULT_LOCALE || 'en-US';

i18n.use(initReactI18next).init({
  resources,
  lng: stored,
  fallbackLng: 'en-US',
  interpolation: { escapeValue: false },
});

export function applyDir(lang: string) {
  const isRtl = lang.startsWith('ar');
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
}

applyDir(stored);

export default i18n;
