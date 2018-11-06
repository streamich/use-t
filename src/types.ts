// Translation function `t`.
export type TranslatorFn = (key: string, ...args: any[]) => string;

// Props of React components with translation function.
export interface PropsWithT {
  t: TranslatorFn;
}

// Default translation function.
export const T: TranslatorFn = (key: string) => key;

// Collection of translations.
export interface Translations {
  [key: string]: string | ((T: TranslatorFn, ...args: any[]) => any);
}

// Collecion of translations by namespace.
export interface TranslationsNamespaced {
  [namespace: string]: Translations;
}

// Collection of namespaced translations by locale.
export interface TranslationMap {
  [locale: string]: TranslationsNamespaced;
}
