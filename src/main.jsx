/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, resetStore, store } from "../src/store/store";
import theme from "./chakraConfig";
import AppContextProvider from "./Context/AppContextProvider";

const broadcastChannel = new BroadcastChannel("logoutChannel");
broadcastChannel.onmessage = (event) => {
	if (event.data === "logout") {
		resetStore();
	}
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ChakraProvider theme={theme}>
				<AppContextProvider>
					<App />
				</AppContextProvider>
			</ChakraProvider>
		</PersistGate>
	</Provider>,
);
