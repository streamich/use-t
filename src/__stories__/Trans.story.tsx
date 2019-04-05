import * as React from 'react';
import {storiesOf} from '@storybook/react';
import createTranslations from '../createTranslations';

const {Provider, Trans} = createTranslations();

const Demo: React.SFC<{t: any, T: any}> = ({t, T}) => {
  return (
    <div>
      {t('Hello')}, user! {t('welcome')}
      <br />
      <button onClick={() => T.setLocale('en')}>en</button>
      <button onClick={() => T.setLocale('fr')}>fr</button>
    </div>
  );
};

storiesOf('Trans', module)
  .add('Switch preloaded translations as FaCC', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
      fr: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      },
    }}>
      <Trans>{(t, T) =>
        <Demo t={t} T={T} />
      }</Trans>
      <Trans>Hello</Trans>
      <Trans> yo {'welcome'} ... {t => t('welcome')}!</Trans>
    </Provider>
  )
  .add('Switch preloaded translations as "children" render prop', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
      fr: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      },
    }}>
      <Trans children={(t, T) =>
        <Demo t={t} T={T} />
      } />
    </Provider>
  )
  .add('Missing language', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
    }}>
      <Trans>{(t, T) =>
        <Demo t={t} T={T} />
      }</Trans>
    </Provider>
  )
  .add('Load translations dynamically, 2 sec delay', () =>
    <Provider
      map={{
        en: {
          main: {Hello: 'Hello', welcome: 'Welcome!'}
        },
      }}
      loader={() => new Promise(resolve => {
        setTimeout(() => {
          resolve({Hello: 'Bonjour', welcome: 'Lala!'});
        }, 2000);
      })}
    >
      <Trans>{(t, T) =>
        <Demo t={t} T={T} />
      }</Trans>
    </Provider>
  )
  .add('Without provider', () =>
    <Trans>{(t, T) =>
      <Demo t={t} T={T} />
    }</Trans>
  )
  .add('Text as children', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
      fr: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      },
    }}>
      <div>
        <Trans children={(_, T) => (
          <>
            <button onClick={() => T.setLocale('en')}>en</button>
            <button onClick={() => T.setLocale('fr')}>fr</button>
          </>
        )} />
        <Trans>Hello</Trans>, user! <Trans>welcome</Trans>
      </div>
    </Provider>
  )
