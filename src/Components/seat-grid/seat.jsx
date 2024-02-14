import React from "react";

const Seat = ({ seat, onClick }) => {
	let clsName = "";

	if (seat.category === "open") {
		clsName = "seat-open";
	} else if (seat.category === "selected") {
		clsName = "seat-selected";
	} else if (seat.category === "seat-selected-male") {
		clsName = `seat-selected-male`;
	} else if (seat.category === "seat-selected-female") {
		clsName = `seat-selected-female`;
	} else if (seat.category === "seat-selected-specialNeeds") {
		clsName = `seat-selected-specialNeeds`;
	} else if (seat.category === "seat-selected-blocked") {
		clsName = `seat-selected-blocked`;
	}

	return seat.category !== "Driver" ? (
		<div className={clsName} onClick={onClick}>
			<div className="square">
				<p>{seat.number}</p>
			</div>
		</div>
	) : null;
};

export default Seat;
