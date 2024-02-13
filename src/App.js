import React, { useState } from "react";
import SeatGrid from "./Components/seat-grid/seat-grid";
import Controls from "./Components/controls";

const App = () => {
	const generateSeats = numSeats => {
		const seats = [];
		for (let i = 1; i <= numSeats; i++) {
			if (i === 1) {
				seats.push({ number: i, category: "Driver" });
			} else {
				seats.push({ number: i, category: "open" });
			}
		}
		return seats;
	};

	const [seats, setSeats] = useState(generateSeats(40));
	const [selectedSeats, setSelectedSeats] = useState({});
	const [allocatedSeats, setAllocatedSeats] = useState({});
	const handleSeatClick = index => {
		const updatedSeats = [...seats];
		const seatNumber = index + 1;
		const isAllocated = allocatedSeats[seatNumber];

		if (!isAllocated) {
			updatedSeats[index] = {
				...updatedSeats[index],
				category: updatedSeats[index].category === "open" ? "selected" : "open",
			};
			setSeats(updatedSeats);
			setSelectedSeats(prevState => ({
				...prevState,
				[seatNumber]: true,
			}));
		} else {
			alert("Seat is already allocated!");
		}
	};
	console.log(seats);
	return (
		<div className="app">
			<SeatGrid seats={seats} handleSeatClick={handleSeatClick} />
			<Controls
				allocatedSeats={allocatedSeats}
				seats={seats}
				setSeats={setSeats}
				setAllocatedSeats={setAllocatedSeats}
				selectedSeats={selectedSeats}
				setSelectedSeats={setSelectedSeats}
			/>
		</div>
	);
};

export default App;
