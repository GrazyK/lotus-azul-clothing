import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//FireStore Data

export const db = getFirestore();

export const createUserAuthDoc = async (userAuth) => {
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
			});
		} catch (error) {
			console.log("Error creating the user", error.message);
		}
	}

	return userDocRef;
};
