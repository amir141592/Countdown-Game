import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = function ResultModal({ result, targetTime }, ref) {
	const dialog = useRef();

	useImperativeHandle(ref, () => ({
		open() {
			dialog.current.showModal();
		},
	}));

	return (
		<dialog
			className="result-modal"
			ref={dialog}
		>
			<h2>You {result}</h2>
			<p>
				The target time was <strong>{targetTime}</strong> seconds
			</p>
			<p>
				You stopped the timer with <strong>X</strong> seconds left
			</p>
			<form method="dialog">
				<button>Close</button>
			</form>
		</dialog>
	);
};

export default forwardRef(ResultModal);
