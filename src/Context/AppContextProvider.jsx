import React, { useRef } from "react";
import AppContext from "./AppContext";

export default function AppContextProvider({ children }) {
	const dataEntryRef = useRef(null);
	const DATA_ENTRY_WAIT_MSG =
		"The data that you have entered is being saved. Please try again after a moment";
	return (
		<AppContext.Provider value={{ dataEntryRef, DATA_ENTRY_WAIT_MSG }}>
			{children}
		</AppContext.Provider>
	);
}
