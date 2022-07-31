import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((results) => {
			console.log(results);
		})
		.catch((error) => {
			console.log(error);
		});
};
