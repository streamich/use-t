import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, useT} = createTranslations();

const Hello = (props) => {
  const [t] = useT();
  return (
    <div>
      <div>
        {t('Hello')}, {props.name}!
      </div>
      <div>
        {t.t('hello_user')`Hello, ${props.name}!`}
      </div>
    </div>
  );
};

storiesOf('Readme', module)
  .add('Example', () =>
    <Provider locale="de" map={{de: {main: {Hello: 'Hallo', hello_user: (name) => `Hi, ${name}!`}}}}>
      <Hello name="Mike" />
    </Provider>
  );
