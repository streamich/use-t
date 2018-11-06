# `withT`

React higher order component that injects `t` translation function and [`T` state of the `<Provider>`](./Provider.md#state)
into the props of your component.

```jsx
const Demo = ({t, T}) => {
  return (
    <div>
      {t('Hello')}, user! {t('welcome')}
      <br />
      <button onClick={() => T.setLocale('en')}>en</button>
      <button onClick={() => T.setLocale('fr')}>fr</button>
    </div>
  );
};

export default withT(Demo);
```
