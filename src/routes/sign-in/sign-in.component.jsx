// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
	// auth,
	// signInWithGoogleRedirect,
	signInWithGooglePopup,
	createUserAuthDoc,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form-component";

const SignIn = () => {
	//--------- REDIRECT ----------//
	// useEffect(() => {
	// 	async function results() {
	// 		const response = await getRedirectResult(auth);
	// 		console.log(response);

	// 		if (response) {
	// 			const userDocRef = await createUserAuthDoc(response.user);
	// 		}
	// 	}
	// 	results();
	// }, []);

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserAuthDoc(user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign-in with Google Popup</button>
			<SignUpForm />
			{/*<button onClick={signInWithGoogleRedirect}>
				Sign-in with Google Redirect
			</button> */}
		</div>
	);
};

export default SignIn;
