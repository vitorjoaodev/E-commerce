import '../styles/globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { CurrencyProvider } from '../context/CurrencyContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Component {...pageProps} />
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default MyApp;