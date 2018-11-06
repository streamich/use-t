<div align="center">
  <h1>
    <br/>
    <br/>
    🗺
    <br />
    use-t
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <br />
    Translations for React.
  </sup>
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/use-t">use-t</a></pre>
  <br />
  <br />
  <br />
</div>


<h2 align="center">Reference</h2>

<pre>
import {<a href="./docs/createTranslations.md">createTranslations</a>} from <a href="https://www.npmjs.com/package/use-t">'use-t'</a>;

const {<a href="./docs/Provider.md">Provider</a>, <a href="./docs/Provider.md">useT</a>, <a href="./docs/Provider.md">withT</a>,
    <a href="./docs/Provider.md">Trans</a>, <a href="./docs/Provider.md">Consumer</a>, <a href="./docs/Provider.md">context</a>} = createTranslations();
</pre>


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


<h2 align="center">License</h2>

<p align="center">
  <a href="./LICENSE">Unlicense</a> &mdash; public domain.
</p>
