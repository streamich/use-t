import * as React from 'react';
import createT from './createT';
import {render, createEnhancer} from 'react-universal-interface';
import {ProviderProps, ProviderState, TranslateProps, Result, UseT} from './types';
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
      this.setState({locale});
    };

    render () {
      return React.createElement(context.Provider, {
        value: this.state,
        children: this.props.children,
      });
    }
  };

  const useT: UseT = (nss: string[] = [ns]) => {
    const state = (React as any).useContext(context) as ProviderState;
    return [createT(state.map, state.locale, nss), state];
  };

  const Translate: React.SFC<TranslateProps> = (props) => {
    let nss: string[] = props.ns instanceof Array
      ? props.ns : [props.ns || ns];
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
