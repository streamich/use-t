import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, useT} = createTranslations();

const Hello = (props) => {
  const [t] = useT();
  return (
    <div>
      {t('Hello')}, {props.name}! {t('you_have_likes', 3)}
    </div>
  );
};

storiesOf('Interpolations', module)
  .add('Example', () =>
    <Provider locale="de" map={{
      de: {
        main: {
          Hello: 'Hallo',
          you_have_likes: (num) => `You have ${num} likes.`
        }
      }
    }}>
      <Hello name="Mike" />
    </Provider>
  );
