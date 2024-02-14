// ModalElement2.jsx

import React, { useState } from "react";
import Modal from "react-modal";

function ModalElement2({
	isModalOpen,
	closeModal,
	handleConfirm,
	allocatedSeats,
}) {
	const [checkedSeats, setCheckedSeats] = useState([]);

	// Handle checkbox change
	const handleCheckboxChange = seat => {
		if (checkedSeats.includes(seat)) {
			setCheckedSeats(
				checkedSeats.filter(selectedSeat => selectedSeat !== seat)
			);
		} else {
			setCheckedSeats([...checkedSeats, seat]);
		}
	};

	// Handle delete confirmation
	const handleDeleteConfirm = () => {
		// console.log(checkedSeats);
		handleConfirm(checkedSeats);
		setCheckedSeats([]); // Clear checked seats state
		closeModal();
	};

	if (!isModalOpen) return null;

	return (
		<Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal">
			<div className="modal">
				<h2>Delete Seats</h2>
				<form onSubmit={handleDeleteConfirm}>
					<div className="checkbox-container">
						{Object.keys(allocatedSeats).map(seat => (
							<label key={seat}>
								<input
									type="checkbox"
									checked={checkedSeats.includes(seat) || false} // Check if seat is in checkedSeats array
									onChange={() => handleCheckboxChange(seat)}
								/>
								Seat {seat}
							</label>
						))}
					</div>
					<button type="submit">Delete Selected Seats</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</Modal>
	);
}

export default ModalElement2;
