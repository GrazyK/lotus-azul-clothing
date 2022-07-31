import {
	signInWithGooglePopup,
	createUserAuthDoc,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserAuthDoc(user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign-in with Google</button>
		</div>
	);
};

export default SignIn;
