import { useLanguage, translations } from '../contexts/LanguageContext'

export const useTranslation = () => {
  const { language } = useLanguage()
  return translations[language]
}
