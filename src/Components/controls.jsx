import React, { useState } from "react";
import "./controls.css";
import ModalElement from "./modal";
import ModalElement2 from "./modal2";

const Controls = ({
	seats,
	setSeats,
	allocatedSeats,
	setAllocatedSeats,
	selectedSeats,
	setSelectedSeats,
}) => {
	const [isFirstModalVisible, setIsFirstModalVisible] = useState(false);
	const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");

	const handleAllocate = (category, seatNumbers) => {
		const updatedSeats = [...seats];
		seatNumbers.forEach(seatNumber => {
			const index = parseInt(seatNumber.trim()) - 1;
			if (
				index >= 0 &&
				index < updatedSeats.length &&
				updatedSeats[index].category === "selected"
			) {
				// Append the category to the existing category
				updatedSeats[index] = {
					...updatedSeats[index],
					category: `seat-selected-${category}`,
				};
			}
		});
		setSeats(updatedSeats);
		setAllocatedSeats(prevState => ({
			...prevState,
			...seatNumbers.reduce((acc, seatNumber) => {
				acc[seatNumber] = true;
				return acc;
			}, {}),
		}));
		setSelectedSeats({});
	};

	const handleDelete = () => {
		if (Object.keys(allocatedSeats).length === 0) {
			alert("No seats to delete");
			return;
		}
		setIsSecondModalVisible(true);
	};

	const handleDeleteConfirm = seatNumbers => {
		const updatedSeats = [...seats];
		seatNumbers.forEach(seatNumber => {
			const index = parseInt(seatNumber.trim()) - 1;
			if (
				index >= 0 &&
				index < updatedSeats.length &&
				updatedSeats[index].category !== "open"
			) {
				// Reset the category to open
				updatedSeats[index] = {
					...updatedSeats[index],
					category: "open",
				};
			}
		});
		setSeats(updatedSeats);
		setAllocatedSeats(prevState => {
			const updatedAllocatedSeats = { ...prevState };
			seatNumbers.forEach(seatNumber => {
				delete updatedAllocatedSeats[seatNumber];
			});
			return updatedAllocatedSeats;
		});
		setSelectedSeats({});
		setIsSecondModalVisible(false); // Close the modal after confirmation
	};

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

	const handleReset = () => {
		setSeats(generateSeats(40));
		setAllocatedSeats({});
		setSelectedSeats({});
	};

	const openModal = () => {
		if (Object.keys(selectedSeats).length === 0) {
			alert("Please select seats to allocate");
			return;
		}
		setIsFirstModalVisible(true);
	};

	const handleConfirm = () => {
		if (selectedCategory && Object.keys(selectedSeats).length > 0) {
			// Call handleAllocate with selectedCategory and selectedSeats
			handleAllocate(selectedCategory, Object.keys(selectedSeats));
			setIsFirstModalVisible(false); // Close the modal after confirmation
		} else {
			alert("Please select a category and at least one seat to allocate.");
		}
	};

	return (
		<div className="controls-box">
			<p className="info">*Please select seats to allocate.</p>
			<div className="btns">
				<button onClick={handleReset}>Reset Layout</button>

				<button onClick={handleDelete}>Delete Seat</button>

				<button onClick={openModal} className="modal-button">
					Allocate Seat
				</button>
			</div>
			<ModalElement
				isModalOpen={isFirstModalVisible}
				closeModal={() => setIsFirstModalVisible(false)}
				selectedSeats={selectedSeats}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				handleConfirm={handleConfirm}
			/>
			<ModalElement2
				isModalOpen={isSecondModalVisible}
				closeModal={() => setIsSecondModalVisible(false)}
				allocatedSeats={allocatedSeats}
				handleConfirm={handleDeleteConfirm}
			/>
		</div>
	);
};

export default Controls;
