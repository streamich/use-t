import * as React from 'react';
import {storiesOf} from '@storybook/react';

const Demo = () => {
  return (
    <div>
      Demo...
    </div>
  );
};

storiesOf('Context', module)
  .add('Demo', () =>
    <Demo/>
  )
