import React from "react";
import Modal from "react-modal";

const Modal3 = ({
	isOpen,
	onRequestClose,
	allocatedSeats,
	handleModifySeat,
}) => {
	const handleConfirmation = () => {
		const selectedSeat = document.getElementById("selectedSeat").value;
		handleModifySeat(selectedSeat);
	};

	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
			<h2>Seat Modification</h2>
			<p>Select a seat number to swap with:</p>
			<select id="selectedSeat">
				{[...Array(39)].map((_, index) => {
					const seatNumber = index + 2;
					const isAllocated = allocatedSeats[seatNumber] ? true : false;
					return !isAllocated ? (
						<option key={seatNumber} value={seatNumber} disabled={isAllocated}>
							{seatNumber}
						</option>
					) : null;
				})}
			</select>
			<button onClick={handleConfirmation}>Confirm</button>
		</Modal>
	);
};

export default Modal3;
