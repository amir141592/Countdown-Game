import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = function ResultModal({ targetTime, timeRemaining, handleResetTimer }, ref) {
	const dialog = useRef();

	const userLost = timeRemaining <= 0;
	const fomattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
	const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

	useImperativeHandle(ref, () => ({
		open() {
			dialog.current.showModal();
		},
	}));

	return createPortal(
		<dialog
			className="result-modal"
			ref={dialog}
			onClose={handleResetTimer}
		>
			{userLost ? <h2>You lost!</h2> : <h2>Your Score: {score}</h2>}
			<p>
				The target time was <strong>{targetTime}</strong> seconds
			</p>
			<p>
				You stopped the timer with <strong>{fomattedTimeRemaining}</strong> seconds left
			</p>
			<form method="dialog">
				<button>Close</button>
			</form>
		</dialog>,
		document.getElementById("modal")
	);
};

export default forwardRef(ResultModal);
