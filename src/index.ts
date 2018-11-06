import * as React from 'react';
import createT from './createT';
import {render, createEnhancer, UniversalProps} from 'react-universal-interface';
import {TranslatorFn, Options, TranslationMap, State} from './types';
import invariant from 'tiny-invariant';

const defaultOptions: Options = {
  locale: 'en', // Default locale.
  ns: 'main', // Default namespace.
};

export interface TranslateProps extends UniversalProps<TranslatorFn> {
  ns?: string | string[];
}

export const createTranslations = (opts: Options = {}) => {
  const options: Options = {...defaultOptions, ...opts};
  const state: State = {
    locale: options.locale!,
    ns: options.ns!,
    nss: [options.ns!],
    map: options.preloaded || {},
  };

  // Normalize translation map.
  if (!state.map[state.locale]) {
    state.map[state.locale] = {[options.ns!]: {}};
  } else if (!state.map[state.locale][options.ns!]) {
    state.map[state.locale][options.ns!] = {};
  }

  const context = React.createContext(state);
  const {Consumer} = context;
  const Provider = class extends React.Component<{}, State> {
    load = async (locale: string, ns: string) => {
      if (!this.state.map[locale]) {
        this.state.map[locale] = {};
      }
      if (!this.state.map[locale][ns]) {
        this.state.map[locale][ns] = {};
        this.setState({...this.state});
        invariant(options.loader, 'use-t translator .loader() option not set.');
        const translations = await options.loader!(locale, ns);
        this.state.map[state.locale][ns] = translations;
        this.setState({...this.state});
      }
    };

    selectLocale = (locale: string) => {
      this.setState({locale});
    };

    state = {...state, load: this.load};

    render () {
      return React.createElement(context.Provider, {...this.props, value: this.state});
    }
  };

  const useT = (nss: string[] = [options.ns!]) => {
    const state = (React as any).useContext(context);
    return [createT(state.map, state.locale, nss), state];
  };

  const Translate: React.SFC<TranslateProps> = (props) => {
    let nss: string[] = props.ns instanceof Array
      ? props.ns : [props.ns || options.ns!];
    return React.createElement(Consumer, null, (state) => {
      const T = createT(state.map, state.locale, nss);
      return render(props, T, state)
    });
  };

  const withT = createEnhancer(Translate, 't');

  return {
    Consumer,
    Provider,
    context,
    useT,
    Translate,
    withT,
  };
};

const {Consumer, Provider, context, useT, Translate, withT} = createTranslations();

export {
  Consumer,
  Provider,
  context,
  useT,
  Translate,
  withT,
};
