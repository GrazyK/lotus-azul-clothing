import { initializeApp } from "firebase/app";

import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	NextOrObserver,
	User,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
	apiKey: "AIzaSyCYcKlxsKCOpkcf237lrzd1n0e-Y3OAqPw",
	authDomain: "lotus-azul-db.firebaseapp.com",
	projectId: "lotus-azul-db",
	storageBucket: "lotus-azul-db.appspot.com",
	messagingSenderId: "983266661982",
	appId: "1:983266661982:web:01518801c50deac88886cf",
};

// Creates and Initialize Firebase
const app = initializeApp(firebaseConfig);

// Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in operations.
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

export type ObjectToAdd = {
	title: string;
};

// FireStore Data
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
};

export type AddtionalInfo = {
	displayName?: string;
};

export type UserData = {
	createAt: Date;
	displayName: string;
	email: string;
};

//  Create User Auth DB Document
export const createUserAuthDoc = async (
	userAuth: User,
	addtionalInfo: AddtionalInfo = {} as AddtionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
			console.log("Error creating the user", error);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Auth Email and Password
export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

//Sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

//Sign out
export const signOutUser = async () => await signOut(auth);

//Auth State Change Listerner Observer
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
