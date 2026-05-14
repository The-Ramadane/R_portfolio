import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Lang, Translations } from 'config/translations'

type LangContextType = {
  lang: Lang
  t: Translations
  toggleLang: () => void
}

const LangContext = createContext<LangContextType>({
  lang: 'fr',
  t: translations.fr,
  toggleLang: () => {},
})

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang') as Lang
    if (saved === 'fr' || saved === 'en') setLang(saved)
  }, [])

  const toggleLang = () => {
    const next: Lang = lang === 'fr' ? 'en' : 'fr'
    setLang(next)
    localStorage.setItem('portfolio_lang', next)
  }

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
