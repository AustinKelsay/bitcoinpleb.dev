import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react"

const App = ({ Component, pageProps }) => {
  return (
    <Analytics>
      <Component {...pageProps} />
    </Analytics>
  );
};

export default App;
