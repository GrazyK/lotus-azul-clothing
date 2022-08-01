import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCYcKlxsKCOpkcf237lrzd1n0e-Y3OAqPw",
	authDomain: "lotus-azul-db.firebaseapp.com",
	projectId: "lotus-azul-db",
	storageBucket: "lotus-azul-db.appspot.com",
	messagingSenderId: "983266661982",
	appId: "1:983266661982:web:01518801c50deac88886cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

//FireStore Data

export const db = getFirestore();

//  Create User Auth DB Document
export const createUserAuthDoc = async (userAuth, addtionalInfo = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...addtionalInfo,
			});
		} catch (error) {
			console.log("Error creating the user", error.message);
		}
	}

	return userDocRef;
};

// Auth Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};
