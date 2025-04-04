import knex from "./database_client.js";

export const getFutureMeals = async (_, res) => {
	try {
		const upcomingMeals = await knex("meal").where("when", ">", knex.fn.now());
		const meals = upcomingMeals[0];
		meals.length ?
			res.json(meals)
		:	res.status(200).json("There are no any events in the future.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getPastMeals = async (_, res) => {
	try {
		const pastMeals = await knex("meal").where("when", "<", knex.fn.now());
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
		const allMeals = await knex("meal").orderBy("id");

		allMeals.length ?
			res.json(allMeals)
		:	res.status(200).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getFirstMeal = async (_, res) => {
	try {
		const firstMeal = await knex("meal").orderBy("id").first();

		firstMeal ?
			res.json(firstMeal)
		:	res.status(404).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getLastMeal = async (_, res) => {
	try {
		const lastMeal = await knex("meal").orderBy("id", "desc").first();

		lastMeal ?
			res.json(lastMeal)
		:	res.status(404).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getMeals = async (_, res) => {
	try {
		const allMeals = await knex("meal").orderBy("id");

		allMeals.length ?
			res.json(allMeals)
		:	res.status(200).json("Meals not found.");
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

		const result = await knex("meal").insert({
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
