import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, useT, withT} = createTranslations({
  preloaded: {
    en: {
      main: {Hello: 'Bonjour', welcome: 'Lala!'},
    }
  }
});

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
    <Provider>
      <Demo/>
    </Provider>
  )
  .add('Overwrite originals', () =>
    <Provider>
      <Provider>
        <Demo/>
      </Provider>
    </Provider>
  )
  .add('Hoc', () =>
    <Provider>
      <Hoc/>
    </Provider>
  )
