import 'server-only';

interface Dictionary {
  [key: string]: Promise<{ page: {home: { title: string, description: string}} }>
}
const dictionaries: Dictionary = {
  'en-us': import('../dictionaries/en-us.json').then((module) => module.default),
  'es-co': import ('../dictionaries/es-co.json').then((module) => module.default)
}

export const getDictionary = async (locale: string) => dictionaries[locale]