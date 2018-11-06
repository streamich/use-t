<div align="center">
  <h1>
    <br/>
    <br/>
    🗺
    <br />
    use-t
  </h1>
  <sup>Translations for React.</sup>
  <br />
  <br />
  <br />
  <br />
</div>


<h2 align="center">Installation</h2>
<div align="center">
<pre>npm i <a href="https://www.npmjs.com/package/use-t">use-t</a></pre>
</div>


<br />
<br />


<h2 align="center">Reference</h2>


```js
import {createTranslations} from 'use-t';

const {
    Provider,
    useT,
    withT,
    Trans,
    Consumer,
    context,
} = createTranslations();
```

- [`createTranslations`](./docs/createTranslations.md)
- [`<Provider>`](./docs/Provider.md)
- [`useT`](./docs/useT.md)
- [`withT`](./docs/withT.md)
- [`<Trans>`](./docs/Trans.md)
- [`<Consumer>`](./docs/Consumer.md)
- [`context`](./docs/context.md)


<br />
<br />


<h2 align="center">Example</h2>

```jsx
import {createTranslations} from 'use-t';

const {Provider, useT} = createTranslations();

const Hello = (props) => {
  const [t] = useT();
  return (
    <div>
      {t('Hello')}, {props.name}!
    </div>
  );
};

<Provider map={{en: {main: {Hello: 'Hello'}}}}>
  <Hello />
</Provider>
```


<br />
<br />


<h2 align="center">License</h2>

<p align="center">
  <a href="./LICENSE">Unlicense</a> &mdash; public domain.
</p>
