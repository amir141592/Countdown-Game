import { useRef, useState } from "react";

import ResultModal from "./ResultModal";

// ! anything defined outside of default component function is shared between all component instances
export default function TimerChallenge({ title, targetTime }) {
	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

	// ? ref hooks are unique in components and their value doesn't change on component re-execution (unlike states)
	const timer = useRef();
	const dialog = useRef();

	const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

	if (timeRemaining <= 0) {
		clearInterval(timer.current);
		dialog.current.open();
	}

	function handleResetTimer() {
		setTimeRemaining(targetTime * 1000);
	}

	function handleStartTimer() {
		timer.current = setInterval(() => {
			setTimeRemaining((curTimeRemaining) => curTimeRemaining - 10);
		}, 10);
	}

	function handleStopTimer() {
		clearInterval(timer.current);
		dialog.current.open();
	}

	return (
		<>
			<ResultModal
				targetTime={targetTime}
				ref={dialog}
				timeRemaining={timeRemaining}
				handleResetTimer={handleResetTimer}
			/>
			<section className="challenge">
				<h2>{title}</h2>
				{!timerIsActive && <p>You Lost!</p>}
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStopTimer : handleStartTimer}>{timerIsActive ? "Stop" : "Start"} Challenge</button>
				</p>
				<p className={timerIsActive ? "active" : undefined}>{timerIsActive ? "Time is running..." : "Timer is inactive"}</p>
			</section>
		</>
	);
}
