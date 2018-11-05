import {Translations, TranslatorFn} from './types';

const createT = (translations: Translations): TranslatorFn => {
  const T: TranslatorFn = (key: string, ...args) => {
    const value = translations[key];
    return typeof value === 'function'
      ? value(T, ...args)
      : value || key;
  };

  return T;
};

export default createT;
