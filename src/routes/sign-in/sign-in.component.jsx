import { signInWithGoogle } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={signInWithGoogle}>Sign-in with Google</button>
		</div>
	);
};

export default SignIn;
