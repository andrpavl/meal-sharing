import knex from "./database_client.js";

export const getReservations = async (req, res) => {
	try {
		const allReservations = await knex.raw(
			"SELECT * FROM reservation ORDER BY id"
		);

		const reservations = allReservations[0];
		reservations.length ?
			res.json(reservations)
		:	res.status(204).json("Reservations not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const addNewReservation = async (req, res) => {
	try {
		const {
			number_of_guests,
			meal_id,
			created_date,
			contact_phonenumber,
			contact_name,
			contact_email,
		} = req.body;

		if (
			!number_of_guests ||
			!meal_id ||
			!created_date ||
			!contact_phonenumber ||
			!contact_name ||
			!contact_email
		) {
			return res.status(400).json({ error: "All fields are required." });
		}

		const result = await knex("reservation")
			.insert({
				number_of_guests,
				meal_id,
				created_date,
				contact_phonenumber,
				contact_name,
				contact_email,
			})
			.returning("*");

		res.status(201).json({ message: "Reservation added successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getReservationById = async (req, res) => {
	const reservationId = Number(req.params.id);

	try {
		const reservation = await knex("reservation")
			.where({ id: reservationId })
			.first();

		if (!reservation) {
			return res.status(404).json({ error: "Reservation not found" });
		}

		res.json(reservation);
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const updateReservationById = async (req, res) => {
	const reservationId = Number(req.params.id);
	const {
		number_of_guests,
		meal_id,
		created_date,
		contact_phonenumber,
		contact_name,
		contact_email,
	} = req.body;

	if (
		!number_of_guests ||
		!meal_id ||
		!created_date ||
		!contact_phonenumber ||
		!contact_name ||
		!contact_email
	) {
		return res.status(400).json({ error: "All fields are required." });
	}

	try {
		const updatedReservation = await knex("reservation")
			.where({ id: reservationId })
			.update({
				number_of_guests,
				meal_id,
				created_date,
				contact_phonenumber,
				contact_name,
				contact_email,
			});

		if (!updatedReservation) {
			return res.status(404).json({ error: "Reservation not found" });
		}

		res.json({ message: "Reservation updated successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const deleteReservationById = async (req, res) => {
	const reservationId = Number(req.params.id);

	try {
		const deletedReservation = await knex("reservation")
			.where({ id: reservationId })
			.del();

		if (!deletedReservation) {
			return res.status(404).json({ error: "Reservation not found" });
		}

		res.json({ message: "Reservation deleted successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};
