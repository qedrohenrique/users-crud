import 'server-only'

type Locale = 'en' | 'pt';

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('../../messages/en.json').then((module) => module.default),
  pt: () => import('../../messages/pt.json').then((module) => module.default),
}

export const getDictionary = (locale: 'en' | 'pt') => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
}