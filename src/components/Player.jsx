import { useRef } from "react";
import { useState } from "react";

export default function Player() {
	const inputValue = useRef();

	const [playerName, setplayerName] = useState("player");

	return (
		<section id="player">
			<h2>Welcome {playerName}</h2>
			<p>
				<input
					ref={inputValue}
					type="text"
				/>
				<button onClick={() => setplayerName(inputValue.current.value)}>Set Name</button>
			</p>
		</section>
	);
}
