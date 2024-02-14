import React from "react";
import Modal from "react-modal";

function ModalElement({
	isModalOpen,
	closeModal,
	selectedSeats,
	selectedCategory,
	setSelectedCategory,
	handleConfirm,
}) {
	// Extract keys from selectedSeats object and convert them to an array of selected seat numbers
	const selectedSeatNumbers = Object.keys(selectedSeats).filter(
		seatNumber => selectedSeats[seatNumber]
	);

	// Handle seat allocation
	const handleAllocate = () => {
		handleConfirm(selectedCategory, selectedSeatNumbers);
		closeModal();
	};

	return (
		<Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal">
			<h2>Allocate Seats</h2>
			<p className="modal-content">
				Selected Seats: {selectedSeatNumbers.join(", ")}
			</p>
			<label className="modal-content">
				<select
					value={selectedCategory}
					onChange={e => setSelectedCategory(e.target.value)}
				>
					<option value="">Allocate seat for</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="specialNeeds">Special Needs</option>
					<option value="blocked">Blocked</option>
				</select>
			</label>
			<button onClick={handleAllocate} className="modal-button">
				Allocate Seats
			</button>
			<button onClick={closeModal} className="modal-button">
				Go Back
			</button>
		</Modal>
	);
}

export default ModalElement;
