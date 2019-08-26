// Translation function `t`.
export interface TranslatorFn {
  (key: string, ...args: any[]): string;
  t: (key: string) => (strs?: TemplateStringsArray, ...args: any[]) => React.ReactElement;
}

// Props of React components with translation function.
export interface PropsWithT {
  t: TranslatorFn;
}

// Collection of translations.
export interface Translations {
  [key: string]: 0 | string | ((...args: any[]) => any);
}

// Collecion of translations by namespace.
export interface TranslationsNamespaced {
  [namespace: string]: Translations;
}

// Collection of namespaced translations by locale.
export interface TranslationMap {
  [locale: string]: TranslationsNamespaced;
}

export interface ProviderProps {
  locale?: string; // Selected locale.
  defaultLocale?: string; // Default locale.
  ns?: string; // Default namespace.
  loader?: (locale: string, namespace: string) => Promise<Translations>;
  map?: TranslationMap; // Preloaded translations.
}

export interface ProviderState {
  locale: string; // Active locale.
  ns: string; // Active namespace.
  map: TranslationMap;
  load: (locale: string, namespace: string) => Promise<void>;
  setLocale: (locale: string) => void;
  createT: (namespaces: string[]) => TranslatorFn;
}

export interface TransProps {
  ns?: string | string[];
  children: any | React.ReactChild | ((t: TranslatorFn, T: ProviderState) => React.ReactChild);
}

// React hook.
export type UseT = (namespaces?: string[]) => [TranslatorFn, ProviderState];

// Higler order component.
export type WithT = (Comp: React.SFC<any>, ns?: string | string[]) => React.SFC<any>;

export interface Result {
  Provider: React.ComponentClass<ProviderProps, ProviderState>;
  Consumer: any;
  context: React.Context<ProviderState>;
  useT: UseT;
  withT: WithT;
  Trans: React.SFC<TransProps>;
  T: TranslatorFn;
}
