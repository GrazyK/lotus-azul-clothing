import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
	spinner: "spinner",
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	return (
		<button
			disabled={isLoading}
			{...otherProps}
			className={
				isLoading
					? `spinner`
					: `button-container ${BUTTON_TYPE_CLASSES[buttonType]}`
			}
		>
			{children}
		</button>
	);
};

export default Button;
