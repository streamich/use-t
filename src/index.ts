import * as React from 'react';
import {render} from 'react-universal-interface';
import {ProviderProps, ProviderState, TransProps, Result, UseT, TranslatorFn, WithT} from './types';
import invariant from 'tiny-invariant';

export * from './types';

export const createTranslations = (ns: string = 'main'): Result => {
  const context = React.createContext<ProviderState>({} as any);
  const {Consumer} = context;
  const Provider = class extends React.Component<ProviderProps, ProviderState> {
    static defaultProps = {
      locale: 'en',
      ns,
    };

    state: ProviderState;

    constructor (props) {
      super(props);
      const {map = {}, locale, ns} = props;

      // Normalize translation map.
      if (!map[locale]) map[locale] = {[ns]: {}};
      else if (!map[locale][ns]) map[locale][ns] = {};

      this.state = {
        locale,
        ns,
        map,
        load: this.load,
        setLocale: this.setLocale,
        createT: this.createT,
      };
    }

    load = async (locale: string, ns: string) => {
      if (!this.state.map[locale]) {
        this.state.map[locale] = {};
      }
      if (!this.state.map[locale][ns]) {
        this.state.map[locale][ns] = {};
        this.setState({...this.state});
        invariant(this.props.loader, 'use-t provider .loader() prop not set.');
        const translations = await this.props.loader!(locale, ns);
        this.state.map[this.state.locale][ns] = translations;
        this.setState({...this.state});
      }
    };

    setLocale = (locale: string) => {
      if (!this.state.map[locale])
        this.state.map[locale] = {};
      this.setState({locale});
    };

    createT = (nss: string[] = []) => {
      const {locale} = this.state;
      const translationsNamespaced = this.state.map[locale];
      for (const ns of nss) {
        if (!translationsNamespaced[ns]) {
          this.load(locale, ns).catch(err => console.error(err));
        }
      }

      const T: TranslatorFn = (key: string, ...args: any[]) => {
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

    render () {
      return React.createElement(context.Provider, {
        value: this.state,
        children: this.props.children,
      });
    }
  };

  const defaultT = k => k;
  const useT: UseT = (nss: string[] = [ns]) => {
    const state = (React as any).useContext(context) as ProviderState;
    return [state.createT ? state.createT(nss) : defaultT, state];
  };

  const withT: WithT = <P>(Comp, nss: string | string[] = ns) => {
    if (!Array.isArray(nss)) nss = [nss];
    const Enhanced: React.SFC<P> = props => {
      const [t, T] = useT(nss as string[]);
      return React.createElement(Comp, {...(props as any), t, T});
    };
    return Enhanced;
  };

  const Trans: React.SFC<TransProps> = (props) => {
    const nss: string[] = props.ns instanceof Array
      ? props.ns : [props.ns || ns];
    const [t, T] = useT(nss);
    return render(props, {t, T});
  };

  return {
    Consumer,
    Provider,
    context,
    useT,
    Trans,
    withT,
  };
};
