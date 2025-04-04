import knex from "./database_client.js";

export const getFutureMeals = async (_, res) => {
	try {
		const upcomingMeals = await knex.raw(
			"SELECT * FROM meal WHERE `when` > NOW()"
		);

		res.json(upcomingMeals[0] || []);
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getPastMeals = async (_, res) => {
	try {
		const pastMeals = await knex.raw("SELECT * FROM meal WHERE `when` < NOW()");
		const meals = pastMeals[0];

		meals.length ?
			res.json(meals)
		:	res.status(200).json({ message: "There are no any past events." });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getAllMeals = async (_, res) => {
	try {
		const allMeals = await knex.raw("SELECT * FROM meal ORDER BY id");

		const meals = allMeals[0];
		meals.length ? res.json(meals) : res.status(200).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getFirstMeal = async (_, res) => {
	try {
		const firstMeal = await knex.raw("SELECT * FROM meal ORDER BY id LIMIT 1");

		const meals = firstMeal[0];
		meals.length ?
			res.json(meals[0])
		:	res.status(404).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getLastMeal = async (_, res) => {
	try {
		const lastMeal = await knex.raw(
			"SELECT * FROM meal ORDER BY id DESC LIMIT 1"
		);

		const meals = lastMeal[0];
		meals.length ?
			res.json(meals[0])
		:	res.status(404).json("Meals not found.");
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
			if (!isNaN(maxPrice)) {
				query = query.where("price", "<", maxPrice);
			} else {
				return res.status(400).json({ error: "Invalid maxPrice value" });
			}
		}

		if (req.query.title) {
			const title = req.query.title.trim();
			query = query.where("title", "LIKE", `%${title}%`);
		}

		if (req.query.availableReservations) {
			const available = req.query.availableReservations === "true";
			query = query.havingRaw(
				available ?
					"total_reservations < meal.max_reservations"
				:	"total_reservations >= meal.max_reservations"
			);
		}

		if (req.query.dateAfter) {
			const dateAfter = req.query.dateAfter.trim();
			if (isNaN(new Date(dateAfter))) {
				return res.status(400).json({ error: "Invalid dateAfter value" });
			}
			query = query.where("meal.when", ">", dateAfter);
		}

		if (req.query.dateBefore) {
			const dateBefore = req.query.dateBefore.trim();
			if (isNaN(new Date(dateBefore))) {
				return res.status(400).json({ error: "Invalid dateBefore value" });
			}
			query = query.where("meal.when", "<", dateBefore);
		}

		if (req.query.limit) {
			const limit = req.query.limit;
			if (!isNaN(limit) && limit > 0) {
				query = query.limit(limit);
			} else {
				return res.status(400).json({ error: "Invalid limit value" });
			}
		}

		if (req.query.sortKey) {
			const sortKey = req.query.sortKey.trim();
			const validSortKeys = ["when", "max_reservations", "price"];

			if (validSortKeys.includes(sortKey)) {
				const sortDir = req.query.sortDir === "desc" ? "desc" : "asc";
				query = query.orderBy(sortKey, sortDir);
			} else {
				return res.status(400).json({ error: "Invalid sortKey value" });
			}
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
