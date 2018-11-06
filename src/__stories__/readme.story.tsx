import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, useT} = createTranslations();

const Hello = (props) => {
  const [t] = useT();
  return (
    <div>
      {t('Hello')}, {props.name}!
    </div>
  );
};

storiesOf('Readme', module)
  .add('Example', () =>
    <Provider locale="de" map={{de: {main: {Hello: 'Hallo'}}}}>
      <Hello name="Mike" />
    </Provider>
  );
