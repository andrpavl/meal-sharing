import knex from "./database_client.js";

import knex from "./database_client.js";

export const getFutureMeals = async (_, res) => {
	try {
		const upcomingMeals = await knex("meal").where("when", ">", knex.fn.now());
		res.json(upcomingMeals.length ? upcomingMeals : []);
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getPastMeals = async (_, res) => {
	try {
		const pastMeals = await knex("meal").where("when", "<", knex.fn.now());
		pastMeals.length ? res.json(pastMeals) : res.status(200).json({ message: "There are no past events." });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getMeals = async (req, res) => {
	try {
		let query = knex("meal")
			.select("meal.*")
			.leftJoin("reservation", "meal.id", "reservation.meal_id")
			.groupBy("meal.id")
			.count("reservation.id as total_reservations");

		if (req.query.maxPrice) {
			const maxPrice = parseFloat(req.query.maxPrice);
			if (!isNaN(maxPrice)) query = query.where("price", "<", maxPrice);
			else return res.status(400).json({ error: "Invalid maxPrice value" });
		}

		if (req.query.title) query = query.where("title", "LIKE", `%${req.query.title.trim()}%`);

		if (req.query.availableReservations) {
			const available = req.query.availableReservations === "true";
			query = query.havingRaw(
				available ? "total_reservations < meal.max_reservations" : "total_reservations >= meal.max_reservations"
			);
		}

		if (req.query.dateAfter) {
			const dateAfter = new Date(req.query.dateAfter);
			if (isNaN(dateAfter)) return res.status(400).json({ error: "Invalid dateAfter value" });
			query = query.where("meal.when", ">", dateAfter);
		}

		if (req.query.dateBefore) {
			const dateBefore = new Date(req.query.dateBefore);
			if (isNaN(dateBefore)) return res.status(400).json({ error: "Invalid dateBefore value" });
			query = query.where("meal.when", "<", dateBefore);
		}

		if (req.query.limit) {
			const limit = parseInt(req.query.limit, 10);
			if (!isNaN(limit) && limit > 0) query = query.limit(limit);
			else return res.status(400).json({ error: "Invalid limit value" });
		}

		if (req.query.sortKey) {
			const validSortKeys = ["when", "max_reservations", "price"];
			if (validSortKeys.includes(req.query.sortKey)) {
				query = query.orderBy(req.query.sortKey, req.query.sortDir === "desc" ? "desc" : "asc");
			} else return res.status(400).json({ error: "Invalid sortKey value" });
		}

		const meals = await query;
		meals.length ? res.json(meals) : res.status(404).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const addNewMeal = async (req, res) => {
	try {
		const {
			title,
			description,
			location,
			when,
			max_reservations,
			price,
			created_date,
		} = req.body;

		if (
			!title ||
			!description ||
			!location ||
			!when ||
			!max_reservations ||
			!price ||
			!created_date
		) {
			return res.status(400).json({ error: "All fields are required." });
		}

		await knex("meal").insert({
			title,
			description,
			location,
			when,
			max_reservations,
			price,
			created_date,
		});

		res.status(201).json({ message: "Meal added successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getMealById = async (req, res) => {
	const mealId = Number(req.params.id);

	const meal = await knex("meal").where({ id: mealId }).first();

	if (!meal) {
		return res.status(404).json({ error: "Meal not found" });
	}
	res.json(meal);
};

export const updateMealById = async (req, res) => {
	try {
		const mealId = Number(req.params.id);

		if (isNaN(mealId)) {
			return res.status(400).json({ error: "Invalid meal ID" });
		}

		const updatedData = req.body;

		if (Object.keys(updatedData).length === 0) {
			return res.status(400).json({ error: "No data provided for update" });
		}

		const updatedRows = await knex("meal")
			.where({ id: mealId })
			.update(updatedData);

		if (updatedRows === 0) {
			return res.status(404).json({ error: "Meal not found" });
		}

		const updatedMeal = await knex("meal").where({ id: mealId }).first();
		res.json(updatedMeal);
	} catch (error) {
		console.error("Error updating meal:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteMealById = async (req, res) => {
	try {
		const mealId = Number(req.params.id);
		if (isNaN(mealId)) {
			return res.status(400).json({ error: "Enter meal Id to delete it" });
		}
		await knex("meal").where({ id: mealId }).del();
		res.status(200).json({ message: "Meal deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
