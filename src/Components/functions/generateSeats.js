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

export default generateSeats;
