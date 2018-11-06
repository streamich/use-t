import {TranslationMap, TranslatorFn} from './types';

const createT = (map: TranslationMap, locale: string, nss?: string[]): TranslatorFn => {
  const T: TranslatorFn = (key: string, ...args) => {
    const translationsNamespaced = map[locale];
    if (!translationsNamespaced) return key;

    if (!nss || !nss.length) {
      nss = Object.keys(translationsNamespaced);
    }

    for (const namespace of nss) {
      const translations = translationsNamespaced[namespace];
      const value = translations[key];
      if (value !== undefined) {
        return typeof value === 'function'
          ? value(T, ...args)
          : value || key;
      }
    }

    return key;
  };

  return T;
};

export default createT;
