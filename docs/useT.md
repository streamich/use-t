# `useT`

React hook that returns you a translation function and state of the [`<Provider>`](./Provider.md).

```js
const [t, state] = useT();
```

You can specify a namespace or a list of namespaces to be used to create the translation function `t`.

```js
useT('errors');
useT(['main', 'errors']);
```

If you don't specify the namespace(s), the default namespace will be used.


## Translation Function `t`

`t` function can be used to translate texts.

```jsx
<div>{t('Hello')}</div>
```


## Context State `state`

`state` is the state provided by [`<Provider>`](./Provider.md).

Change current locale.

```js
state.setLocale('fr');
```

Pre-load translations.

```js
await state.load('fr', 'error');
```

`useT` will also work when `<Provider>` is not wrapper around your React tree. It is useful
when you want to just design presentational components.


### Reference

```js
state.setLocale(locale);
state.load(locale, namespace);
```
