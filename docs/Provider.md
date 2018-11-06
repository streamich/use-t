# `<Provider>`

Context provider which keeps track of all translations and provides
methods to change language and to load more translations. Wrap your application
with this component.

```jsx
<Provider>
  <App />
</Provider>
```


## Props

```jsx
// Preloaded translation map.
const preloaded = {
  en: {
    main: {
      Hello: 'Hello',
      welcome: 'Welcome!',
    },
  },
};

<Provider
  locale="en"
  defaultLocale="en"
  ns="main"
  map={preloaded}
  loader={async (locale, namespace) => { /*...*/ }}
>
  <Demo />
</Provider>
```


### Reference

- `locale` &mdash; initial selected locale, defaults to `'en'`.
- `defaultLocale` &mdash; locale to fall-back to, if translation is not found in current locale, defaults to `'en'`.
- `ns` &mdash; default namespace, defaults to `'main'`.
- `map` &mdash; collection of initial preloaded translations, in format `{locale: {namespace: {key: value}}}`.
- `loader` &mdash; method to be called when new translations are loaded, receives two arguments:
  locale and namespace; should return a promise that resolves to `{key: value}` map.


## State

`<Provider>` component provides its state using React context. The state object has the following attributes.

- `locale` &mdash; currently selected locale.
- `map` &mdash; map of all translations in `{locale: {namespace: {key: value}}}` form.
- `load` &mdash; function that can be called to preload translations `await load(locale, namespace)`.
- `setLocale` &mdash; function to change current locale `setLocale('de')`
- `createT` &mdash; factory that creates a translation function `t` given namespaces `createT(['main'])`.
