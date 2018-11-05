import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, useT} = createTranslations();

const Demo = () => {
  const t = useT();
  return (
    <div>
      {t('Hello')}, user!
    </div>
  );
};

storiesOf('Context', module)
  .add('Demo', () =>
    <Provider value={{Hello: 'Bonjour'}}>
      <Demo/>
    </Provider>
  )
