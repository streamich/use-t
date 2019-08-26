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
      <div>
        Some text:
        <p>
          {t.t('login_footer_text')`
            By signing-in above, you acknowledge that you have read and 
            understood, and agree to our ${<a href="/terms-of-use">{t('Terms of Use')}</a>} 
            and ${<a href="/privacy-policy">{t('Privacy Policy')}</a>}.`}
        </p>
      </div>
      <div>
        No translation:
        <p>
          {t.t('no_translation')`
            By signing-in above, you acknowledge that you have read and 
            understood, and agree to our ${<a href="/terms-of-use">{t('Terms of Use')}</a>} 
            and ${<a href="/privacy-policy">{t('Privacy Policy')}</a>}.`}
        </p>
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
          you_have_likes: t => t`You have ${0} likes.`,
          hello_user: t => t`Hi, ${0}!`,
          login_footer_text: t => t`Basically, you agree to: ${0} and ${1}.`,
        }
      }
    }}>
      <Hello name="Mike" />
    </Provider>
  );
