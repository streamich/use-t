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
import {Provider, useT, withT, Trans, Consumer, context} from 'use-t';
```

- [`<Provider>`](./docs/Provider.md)
- [`useT()`](./docs/useT.md)
- [`withT()`](./docs/withT.md)
- [`<Trans>`](./docs/Trans.md)
- [`<Consumer>`](./docs/Consumer.md)
- [`context`](./docs/context.md)
- [`createTranslations()`](./docs/createTranslations.md)


<br />
<br />


<h2 align="center">Example</h2>

```jsx
import {Provider, useT} from 'use-t';

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

<Provider locale="de" map={{
  de: {
    main: {
      Hello: 'Hallo',
      hello_user: (name) => `Hi, ${name}!`
    }
  }
}}>
  <Hello name="Mike" />
</Provider>
```


<br />
<br />


<h2 align="center">License</h2>

<p align="center">
  <a href="./LICENSE">Unlicense</a> &mdash; public domain.
</p>
