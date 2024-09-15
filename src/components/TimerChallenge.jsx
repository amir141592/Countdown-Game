import { useRef, useState } from "react";

import ResultModal from "./ResultModal";

// ! anything defined outside of default component function is shared between all component instances
export default function TimerChallenge({ title, targetTime }) {
	const [timerStarted, setTimerStarted] = useState(false);
	const [timerExpired, setTimerExpired] = useState(false);

	// ? ref hooks are unique in components and their value doesn't change on component re-execution (unlike states)
	const timer = useRef();
	const dialog = useRef();

	function handleStartTimer() {
		setTimerStarted(true);

		timer.current = setTimeout(() => {
			setTimerExpired(true);
			dialog.current.open();
		}, targetTime * 1000);
	}

	function handleStopTimer() {
		clearTimeout(timer.current);
	}

	return (
		<>
			<ResultModal
				targetTime={targetTime}
				result="lost"
				ref={dialog}
			/>
			<section className="challenge">
				<h2>{title}</h2>
				{timerExpired && <p>You Lost!</p>}
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={timerStarted ? handleStopTimer : handleStartTimer}>{timerStarted ? "Stop" : "Start"} Challenge</button>
				</p>
				<p className={timerStarted ? "active" : undefined}>{timerStarted ? "Time is running..." : "Timer is inactive"}</p>
			</section>
		</>
	);
}
