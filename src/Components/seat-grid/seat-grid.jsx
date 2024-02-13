// SeatGrid.js
import React from "react";
import Seat from "../seat";
import "./seat-grid.css";
import wheel from "../../assets/wheel.png";

const SeatGrid = ({ seats, handleSeatClick }) => {
	const toggleSeatSelection = index => {
		handleSeatClick(index);
	};
	return (
		<div className="seat-grid">
			<div className="Driver">
				<div className="square">
					<img src={wheel} alt="Driver" />

					<p>Reserved</p>
				</div>
			</div>
			<div className="normal-seats">
				{seats.map((seat, index) => (
					<Seat
						key={index}
						seat={seat}
						onClick={() => toggleSeatSelection(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default SeatGrid;
