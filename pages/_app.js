import "normalize.css";
import "remixicon/fonts/remixicon.css";
import "styles/styles.scss";
import { ToastProvider } from "react-toast-notifications";
import Store from "store";
import { useEffect } from "react";
import ReactGA from "react-ga";

const MyCustomToast = ({ appearance, children }) => (
  <div className="toast-message">{children}</div>
);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize("UA-169340778-1");
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={1500}
      placement="top-left"
      components={{ Toast: MyCustomToast }}
    >
      <Store>
        <Component {...pageProps} />
      </Store>
    </ToastProvider>
  );
}

export default MyApp;
