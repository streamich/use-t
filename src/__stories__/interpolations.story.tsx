import * as React from 'react';
import {storiesOf} from '@storybook/react';
import createTranslations from '../createTranslations';

const {Provider, useT} = createTranslations();

const Hello = (props) => {
  const [t] = useT();
  return (
    <div>
      {t('Hello')}, {props.name}! {t('you_have_likes', 3)}
      <div>
        {t.t('hello_user')`Hello, ${props.name}!`}
      </div>
      <div>
        {t.t('missing')`Hello, ${props.name}!`}
      </div>
    </div>
  );
};

storiesOf('Interpolations', module)
  .add('Example', () =>
    <Provider locale="de" map={{
      de: {
        main: {
          Hello: 'Hallo',
          you_have_likes: (num) => `You have ${num} likes.`,
          hello_user: (name) => `Hi, ${name}!`,
        }
      }
    }}>
      <Hello name="Mike" />
    </Provider>
  );
