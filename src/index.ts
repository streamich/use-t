import * as React from 'react';
import createT from './createT';
import {render, createEnhancer, UniversalProps} from 'react-universal-interface';
import {TranslatorFn} from './types';

export const createTranslations = () => {
  const context = React.createContext({});
  const {Consumer, Provider} = context;

  const useT = () => {
    const translations = (React as any).useContext(context);
    return createT(translations);
  };

  const Translate: React.SFC<UniversalProps<TranslatorFn>> = (props) =>
    React.createElement(Consumer, null, (translations) => render(props, createT(translations)));

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
