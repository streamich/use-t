# `<Trans>`

[![React Universal Interface](https://img.shields.io/badge/React-Universal%20Interface-green.svg)](https://github.com/streamich/react-universal-interface)

A render-prop that provides [*Universal Interface*](https://github.com/streamich/react-universal-interface).
It provides an object with translation function `t` and translation state `T`.

```jsx
<Trans>{({t, T}) =>
  {t('Hello')}, user! {t('welcome')}
  <br />
  <button onClick={() => T.setLocale('en')}>en</button>
  <button onClick={() => T.setLocale('fr')}>fr</button>
}</div>
```
