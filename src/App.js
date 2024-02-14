import React, { useState } from "react";
import SeatGrid from "./Components/seat-grid/seat-grid";
import Controls from "./Components/controls/controls";
import Modification from "./Components/modals/Modification";
import generateSeats from "./Components/functions/generateSeats";

const App = () => {
	const handleModifySeat = newSeatNumber => {
		swapSeats(selectedSeatToModify, parseInt(newSeatNumber));
		setSelectedSeatToModify(-1);
		setIsModificationConfirmationOpen(false);
	};

	const swapSeats = (seatNumber1, seatNumber2) => {
		const index1 = seats.findIndex(seat => seat.number === seatNumber1);
		const index2 = seats.findIndex(seat => seat.number === seatNumber2);
		if (index1 !== -1 && index2 !== -1) {
			const updatedSeats = [...seats];
			const tempCategory = updatedSeats[index1].category;
			updatedSeats[index1].category = updatedSeats[index2].category;
			updatedSeats[index2].category = tempCategory;
			setSeats(updatedSeats);

			setAllocatedSeats(prevState => {
				const { [seatNumber1]: omit, ...rest } = prevState;
				return rest;
			});

			setAllocatedSeats(prevState => ({
				...prevState,
				[seatNumber2]: true,
			}));
		} else {
			console.error("Invalid seat numbers provided for swapping.");
		}
	};

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

			setSelectedSeats(prevState => {
				if (prevState[seatNumber]) {
					const { [seatNumber]: omit, ...rest } = prevState;
					return rest;
				}
				return {
					...prevState,
					[seatNumber]: true,
				};
			});
		} else {
			setSelectedSeatToModify(seatNumber);
			setIsModificationConfirmationOpen(true);
		}
	};

	const [seats, setSeats] = useState(generateSeats(40));
	const [selectedSeats, setSelectedSeats] = useState({});
	console.log(selectedSeats);
	const [allocatedSeats, setAllocatedSeats] = useState({});
	console.log(allocatedSeats);
	const [isModificationConfirmationOpen, setIsModificationConfirmationOpen] =
		useState(false);
	const [selectedSeatToModify, setSelectedSeatToModify] = useState(-1);
	return (
		<div className="app">
			<h1>Seat Booking</h1>
			<SeatGrid seats={seats} handleSeatClick={handleSeatClick} />
			<Controls
				allocatedSeats={allocatedSeats}
				seats={seats}
				setSeats={setSeats}
				setAllocatedSeats={setAllocatedSeats}
				selectedSeats={selectedSeats}
				setSelectedSeats={setSelectedSeats}
			/>

			{selectedSeatToModify !== -1 && (
				<Modification
					isOpen={isModificationConfirmationOpen}
					onRequestClose={() => setIsModificationConfirmationOpen(false)}
					allocatedSeats={allocatedSeats}
					handleModifySeat={handleModifySeat}
				/>
			)}
		</div>
	);
};

export default App;
