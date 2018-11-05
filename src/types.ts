// Translation function `t`.
export type TranslatorFn = (key: string, ...args: any[]) => string;

// Props of React components with translation function.
export interface PropsWithT {
  t: TranslatorFn;
}

// Default translation function.
export const T: TranslatorFn = (key: string) => key;


export interface Translations {
  [key: string]: string | ((T: TranslatorFn, ...args: any[]) => any);
}
