import { createContext, useState, useEffect } from "react";
import {
	onAuthStateChangedListener,
	createUserAuthDoc,
} from "../utils/firebase/firebase.utils";

//The actual value we want to access
export const UserContext = createContext({
	setCurrentUser: () => null,
	currentUser: null,
});

//The actual component
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserAuthDoc(user);
			}
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
