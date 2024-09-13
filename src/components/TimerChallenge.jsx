import { useRef, useState } from "react";

// ! anything defined outside of default function is shared between all component instances

export default function TimerChallenge({ title, targetTime }) {
	const [timerStarted, setTimerStarted] = useState(false);
	const [timerExpired, setTimerExpired] = useState(false);

	const timer = useRef();

	function handleStartTimer() {
		setTimerStarted(true);

		timer.current = setTimeout(() => setTimerExpired(true), targetTime * 1000);
	}

	function handleStopTimer() {
		clearTimeout(timer.current);
	}

	return (
		<section className="challenge">
			<h2>{title}</h2>
			{timerExpired && <p>You Lost!</p>}
			<p className="challenge-time">
				{targetTime} second{targetTime > 1 ? "s" : ""}
			</p>
			<p>
				<button onClick={timerStarted ? handleStartTimer : handleStopTimer}>{timerStarted ? "Stop" : "Start"} Challenge</button>
			</p>
			<p className={timerStarted ? "active" : undefined}>{timerStarted ? "Time is running..." : "Timer is inactive"}</p>
		</section>
	);
}
