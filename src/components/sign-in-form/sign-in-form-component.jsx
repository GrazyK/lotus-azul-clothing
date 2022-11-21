import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
	googleSignInStart,
	emailSignInStart,
} from "../../store/user/user.action";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	//Clear form fields
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	//Sign In with Google (behide the scenes)
	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	// Sign with Email and Password
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			// setCurrentUser(user);
			resetFormFields();
		} catch (error) {
			if (
				error.code === "auth/wrong-password" ||
				error.code === "auth/user-not-found"
			) {
				alert("Incorrect email or password");
			}
			console.log(error);
		}
	};

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Alreayd have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Passwod"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
