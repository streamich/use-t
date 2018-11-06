import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, withT} = createTranslations();

const Demo_: React.SFC<{t: any, T: any}> = ({t, T}) => {
  return (
    <div>
      {t('Hello')}, user! {t('welcome')}
      <br />
      <button onClick={() => T.setLocale('en')}>en</button>
      <button onClick={() => T.setLocale('fr')}>fr</button>
    </div>
  );
};

const Demo = withT(Demo_);

storiesOf('withT', module)
  .add('Switch preloaded translations', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
      fr: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      },
    }}>
      <Demo />
    </Provider>
  )
  .add('Missing language', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
    }}>
      <Demo/>
    </Provider>
  )
  .add('Load translations dynamically', () =>
    <Provider
      map={{
        en: {
          main: {Hello: 'Hello', welcome: 'Welcome!'}
        },
      }}
      loader={() => Promise.resolve({Hello: 'Bonjour', welcome: 'Lala!'})}
    >
      <Demo/>
    </Provider>
  )
  .add('Without provider', () =>
    <Demo/>
  )
