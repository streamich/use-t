# `createTranslations()`

Creates translation context, hook, higher order component, and render prop that you
can use together to manage translations in your app.

```js
import createTranslations from 'use-t/lib/createTranslations';

const {
  Provider,
  useT,
  withT,
  Trans,
  Consumer,
  context,
} = createTranslations();
```

Wrap your app in [`<Provider>`](./Provider.md) component.

```jsx
const preloaded = {
  en: {
    main: {
      Hello: 'Hello',
    }
  },
  fr: {
    main: {
      Hello: 'Bonjour',
    }
  },
};

<Provider map={preloaded}>
  <App />
</Provider>
```

Now, in your components use [`useT`](./useT.md), [`withT`](./withT.md), or [`<Trans>`](./Trans.md) to translate your app.

```jsx
const Hello = (props) => {
  const [t] = useT();
  return (
    <div>
      {t('Hello')}, {props.name}!
    </div>
  );
};
```
