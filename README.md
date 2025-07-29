<div align="center">
  <h1>
    <br/>
    <br/>
    🗺
    <br />
    use-t
  </h1>
  <sup>Modern React translations made simple.</sup>
  <br />
  <br />
  <br />
  <br />
</div>

**use-t** is a lightweight, type-safe React internationalization (i18n) library that leverages React hooks and context for seamless translation management. Built with modern React patterns, it provides an intuitive API for handling translations, dynamic loading, namespaces, and complex interpolations.

<h2 align="center">✨ Features</h2>

<div align="center">

🪝 **Hook-based API** &mdash; Modern React hooks with `useT()`  
🚀 **Zero dependencies** &mdash; Lightweight and fast  
📦 **Dynamic loading** &mdash; Load translations on-demand  
🏷️ **Namespace support** &mdash; Organize translations by feature  
🔧 **Template literals** &mdash; JSX interpolation with `t.t`  
🌍 **Fallback locales** &mdash; Graceful degradation  
📝 **TypeScript** &mdash; Full type safety and IntelliSense  
⚡ **Multiple APIs** &mdash; Hooks, HOCs, render props, and context

</div>

<h2 align="center">Installation</h2>
<div align="center">
<pre>npm i <a href="https://www.npmjs.com/package/use-t">use-t</a></pre>
</div>

<h2 align="center">Quick Start</h2>

### Basic Usage

```jsx
import {Provider, useT} from 'use-t';

// 1. Define your translations
const translations = {
  en: {
    main: {
      greeting: 'Hello',
      welcome: 'Welcome back!'
    }
  },
  es: {
    main: {
      greeting: 'Hola',
      welcome: '¡Bienvenido de nuevo!'
    }
  }
};

// 2. Create a component that uses translations
const App = () => {
  const [t, {setLocale, locale}] = useT();
  
  return (
    <div>
      <h1>{t('greeting')}, World!</h1>
      <p>{t('welcome')}</p>
      
      <button onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>
        Switch Language
      </button>
    </div>
  );
};

// 3. Wrap your app with Provider
export default () => (
  <Provider locale="en" map={translations}>
    <App />
  </Provider>
);
```

### Function-based Translations

```jsx
const translations = {
  en: {
    main: {
      userGreeting: (name) => `Hello, ${name}!`,
      itemCount: (count) => `You have ${count} ${count === 1 ? 'item' : 'items'}`
    }
  }
};

const UserProfile = ({username, itemCount}) => {
  const [t] = useT();
  
  return (
    <div>
      <h2>{t('userGreeting', username)}</h2>
      <p>{t('itemCount', itemCount)}</p>
    </div>
  );
};
```

### Template Literal Interpolation

```jsx
const translations = {
  en: {
    main: {
      welcomeMessage: (interpolate) => interpolate`Welcome ${0}, you have ${1} new messages!`
    }
  }
};

const Dashboard = ({user, messageCount}) => {
  const [t] = useT();
  
  return (
    <div>
      {/* With translation */}
      {t.t('welcomeMessage')`Welcome ${user.name}, you have ${messageCount} new messages!`}
      
      {/* Fallback if translation missing */}
      {t.t('missingKey')`Default message with ${user.name}`}
    </div>
  );
};
```

<h2 align="center">API Reference</h2>

```js
import {Provider, useT, withT, Trans, Consumer, context, createTranslations} from 'use-t';
```

| Export | Type | Description |
|--------|------|-------------|
| **`<Provider>`** | Component | Context provider for translations |
| **`useT()`** | Hook | React hook returning `[t, state]` |
| **`withT()`** | HOC | Higher-order component injecting `t` and `T` props |
| **`<Trans>`** | Component | Render prop component for translations |
| **`<Consumer>`** | Component | Context consumer for provider state |
| **`context`** | Context | React context object |
| **`createTranslations()`** | Function | Create custom translation instances |

### `<Provider>` Props

```jsx
<Provider
  locale="en"           // Current locale (default: 'en')
  defaultLocale="en"    // Fallback locale (default: 'en')  
  ns="main"            // Default namespace (default: 'main')
  map={translations}    // Preloaded translations
  loader={loadFn}      // Dynamic loader function
>
```

### `useT()` Hook

```jsx
const [t, state] = useT();                    // Default namespace
const [t, state] = useT('errors');           // Single namespace
const [t, state] = useT(['main', 'errors']); // Multiple namespaces
```

**Translation function `t`:**
- `t(key)` - Simple translation
- `t(key, ...args)` - Function translation with arguments
- `t.t(key)` - Template literal translation

**State object:**
- `state.locale` - Current locale
- `state.setLocale(locale)` - Change locale
- `state.load(locale, namespace)` - Preload translations

<h2 align="center">Advanced Usage</h2>

### Dynamic Loading

```jsx
const Provider = () => {
  const loadTranslations = async (locale, namespace) => {
    const response = await fetch(`/api/translations/${locale}/${namespace}`);
    return response.json();
  };

  return (
    <Provider 
      locale="en"
      loader={loadTranslations}
      map={{
        en: { main: { loading: 'Loading...' } } // Initial translations
      }}
    >
      <App />
    </Provider>
  );
};
```

### Namespaces

```jsx
const translations = {
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel'
    },
    errors: {
      required: 'This field is required',
      invalid: 'Invalid input'
    },
    dashboard: {
      title: 'Dashboard',
      stats: 'Statistics'
    }
  }
};

// Use multiple namespaces
const Form = () => {
  const [t] = useT(['common', 'errors']);
  
  return (
    <form>
      <button type="submit">{t('save')}</button>
      <button type="button">{t('cancel')}</button>
      <span className="error">{t('required')}</span>
    </form>
  );
};

// Namespace-specific component
const Dashboard = () => {
  const [t] = useT('dashboard');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('stats')}</p>
    </div>
  );
};
```

### Complex Interpolations

```jsx
const translations = {
  en: {
    main: {
      loginFooter: (interpolate) => interpolate`
        By signing in, you agree to our ${0} and ${1}.
      `,
      notification: (interpolate) => interpolate`
        ${0} sent you ${1} ${2}
      `
    }
  }
};

const LoginForm = () => {
  const [t] = useT();
  
  return (
    <div>
      <form>...</form>
      <p>
        {t.t('loginFooter')`
          By signing in, you agree to our ${<Link to="/terms">Terms</Link>} and ${<Link to="/privacy">Privacy Policy</Link>}.
        `}
      </p>
    </div>
  );
};

const NotificationItem = ({sender, count, type}) => {
  const [t] = useT();
  
  return (
    <div>
      {t.t('notification')`
        ${<strong>{sender}</strong>} sent you ${count} ${type}
      `}
    </div>
  );
};
```

### Higher-Order Component

```jsx
import {withT} from 'use-t';

const MyComponent = ({t, T, ...otherProps}) => (
  <div>
    <h1>{t('title')}</h1>
    <button onClick={() => T.setLocale('es')}>
      Español
    </button>
  </div>
);

export default withT(MyComponent);
// Or with specific namespace:
export default withT(MyComponent, 'dashboard');
```

### Render Props

```jsx
import {Trans} from 'use-t';

const Navigation = () => (
  <nav>
    <Trans ns="navigation">
      {(t, T) => (
        <>
          <a href="/">{t('home')}</a>
          <a href="/about">{t('about')}</a>
          <button onClick={() => T.setLocale('fr')}>
            Français
          </button>
        </>
      )}
    </Trans>
  </nav>
);

// String shorthand
const Title = () => <Trans>pageTitle</Trans>;

// Mixed content
const Header = () => (
  <Trans>
    {t => t('welcome')}!
  </Trans>
);
```

<h2 align="center">TypeScript Support</h2>

**use-t** is written in TypeScript and provides full type safety:

```tsx
import {TranslatorFn, ProviderState, TranslationMap} from 'use-t';

// Type your translations
interface Translations {
  greeting: string;
  userWelcome: (name: string) => string;
  itemCount: (count: number) => string;
}

const translations: TranslationMap = {
  en: {
    main: {
      greeting: 'Hello',
      userWelcome: (name: string) => `Welcome, ${name}!`,
      itemCount: (count: number) => `${count} items`
    } as Translations
  }
};

// Typed component props
interface Props {
  t: TranslatorFn;
  T: ProviderState;
}

const MyComponent: React.FC<Props> = ({t, T}) => (
  <div>
    <h1>{t('greeting')}</h1>
    <p>{t('userWelcome', 'John')}</p>
  </div>
);
```

<h2 align="center">Best Practices</h2>

### Translation Organization

```js
// ✅ Good: Organize by feature/page
const translations = {
  en: {
    auth: {
      login: 'Log In',
      signup: 'Sign Up',
      forgotPassword: 'Forgot Password?'
    },
    dashboard: {
      welcome: 'Welcome back!',
      stats: 'Your Statistics'
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      loading: 'Loading...'
    }
  }
};

// ❌ Avoid: All translations in one namespace
const translations = {
  en: {
    main: {
      login: 'Log In',
      dashboardWelcome: 'Welcome back!',
      saveButton: 'Save',
      // ... hundreds of keys
    }
  }
};
```

### Performance Tips

```jsx
// ✅ Good: Load namespaces on-demand
const LazyDashboard = () => {
  const [t] = useT('dashboard'); // Only loads dashboard namespace
  return <div>{t('title')}</div>;
};

// ✅ Good: Preload critical translations
<Provider 
  map={{
    en: { 
      common: commonTranslations // Critical UI elements
    }
  }}
  loader={dynamicLoader} // Non-critical loaded on-demand
>

// ✅ Good: Use default locale as fallback
<Provider 
  locale="fr" 
  defaultLocale="en" // Falls back to English if French missing
  map={translations}
>
```

### Error Handling

```jsx
const translations = {
  en: {
    main: {
      // Use descriptive keys that work as fallbacks
      'user.welcome': 'Welcome!',
      'error.network': 'Network error occurred',
      'button.save': 'Save'
    }
  }
};

// Keys become fallback text if translation missing
const Component = () => {
  const [t] = useT();
  
  return (
    <div>
      {/* Shows "Welcome!" or "user.welcome" if missing */}
      <h1>{t('user.welcome')}</h1>
      
      {/* Shows "Save" or "button.save" if missing */}
      <button>{t('button.save')}</button>
    </div>
  );
};
```

<h2 align="center">Custom Translation Instances</h2>

Create isolated translation contexts for libraries or complex apps:

```jsx
import {createTranslations} from 'use-t';

// Create custom instance with different default namespace
const {Provider: LibProvider, useT: useLibT} = createTranslations('library');

const LibraryComponent = () => {
  const [t] = useLibT();
  return <div>{t('libMessage')}</div>;
};

// Use in your app
<LibProvider map={{en: {library: {libMessage: 'Hello from library!'}}}}>
  <LibraryComponent />
</LibProvider>
```

<h2 align="center">Migration from Other Libraries</h2>

### From react-i18next

```jsx
// react-i18next
import {useTranslation} from 'react-i18next';
const {t, i18n} = useTranslation();
t('key');
i18n.changeLanguage('es');

// use-t equivalent
import {useT} from 'use-t';
const [t, {setLocale}] = useT();
t('key');
setLocale('es');
```

### From React Intl

```jsx
// React Intl
import {useIntl} from 'react-intl';
const intl = useIntl();
intl.formatMessage({id: 'key'});

// use-t equivalent
import {useT} from 'use-t';
const [t] = useT();
t('key');
```

<h2 align="center">Troubleshooting</h2>

**Translation not showing:**
- Check if the key exists in your translation map
- Verify the correct namespace is being used
- Ensure Provider is wrapping your component
- Check browser console for loading errors

**Dynamic loading not working:**
- Verify your loader function returns a Promise
- Check network requests in browser dev tools
- Ensure proper error handling in loader

**TypeScript errors:**
- Import types: `import type {TranslatorFn} from 'use-t';`
- Check translation map structure matches expected format

<h2 align="center">Detailed API Documentation</h2>

For comprehensive API documentation, see:

- [`<Provider>`](./docs/Provider.md) - Context provider configuration
- [`useT()`](./docs/useT.md) - React hook usage and examples  
- [`withT()`](./docs/withT.md) - Higher-order component patterns
- [`<Trans>`](./docs/Trans.md) - Render prop component usage
- [`<Consumer>`](./docs/Consumer.md) - Context consumer patterns
- [`context`](./docs/context.md) - Direct context access
- [`createTranslations()`](./docs/createTranslations.md) - Custom instances

<h2 align="center">License</h2>

<p align="center">
  <a href="./LICENSE">Unlicense</a> &mdash; public domain.
</p>
