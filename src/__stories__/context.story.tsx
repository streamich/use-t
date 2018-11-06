import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, useT, withT} = createTranslations();

const Demo = () => {
  const [t] = useT();
  return (
    <div>
      {t('Hello')}, user! {t('welcome')}
    </div>
  );
};

const Hoc = withT(({t}) => {
  return (
    <div>
      {t('Hello')}, user! {t('welcome')}
    </div>
  );
});

storiesOf('Context', module)
  .add('Demo', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      }
    }}>
      <Demo/>
    </Provider>
  )
  .add('Hoc', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      }
    }}>
      <Hoc/>
    </Provider>
  )
