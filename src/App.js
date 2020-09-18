import Home from "components/home/home";
import Navigation from "components/navigation/navigation";
import Sidebar from "components/sidebar/sidebar";
import React from "react";
import ReactGA from "react-ga";
import { ToastProvider } from "react-toast-notifications";
import Store from "store";

ReactGA.initialize("UA-169340778-1");
ReactGA.pageview("/homepage");

const MyCustomToast = ({ appearance, children }) => <div className="toast-message">{children}</div>;

const App = () => {
	return (
		<ToastProvider autoDismiss autoDismissTimeout={1500} placement="top-left" components={{ Toast: MyCustomToast }}>
			<Store>
				<Navigation />
				<Home />
				<Sidebar />
			</Store>
		</ToastProvider>
	);
};

export default App;
