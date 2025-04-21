import knex from "./database_client.js";

export const getReviews = async (_, res) => {
	try {
		let query = knex("review").select("*");

		const reviews = await query;

		reviews.length ?
			res.json(reviews)
		:	res.status(404).json({ error: "Reviews not found" });
	} catch (error) {}
};

export const getReviewsByMealId = async (req, res) => {
	try {
		const mealId = Number(req.params.meal_id);

		if (isNaN(mealId)) {
			return res.status(400).json({ error: "Invalid meal ID" });
		}

		const reviews = await knex("review")
			.select("review.*")
			.where("review.meal_id", mealId);

		reviews.length ?
			res.json(reviews)
		:	res.status(404).json({ error: "No reviews found for this meal." });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const addReview = async (req, res) => {
	try {
		const { title, description, meal_id, stars, created_date } = req.body;

		if (!title || !description || !meal_id || !stars || !created_date) {
			return res.status(400).json({ error: "All fields are required." });
		}

		await knex("review").insert({
			title,
			description,
			meal_id,
			stars,
			created_date,
		});
		res.status(201).json({ message: "Review added successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
};

export const getReviewById = async (req, res) => {
	const reviewId = Number(req.params.id);

	const review = await knex("review").where({ id: reviewId }).first();

	if (!review) {
		return res.status(404).json({ error: "Review not found" });
	}

	res.json(review);
};

export const updateReview = async (req, res) => {
	try {
		const reviewId = Number(req.params.id);

		if (isNaN(reviewId)) {
			return res.status(400).json({ error: "Invalid review ID" });
		}

		const updateData = req.body;

		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ error: "No data provided for update" });
		}

		const updatedRows = await knex("review")
			.where({ id: reviewId })
			.update(updateData);

		if (updatedRows === 0) {
			return res.status(404).json({ error: "Review not found" });
		}

		const updateReview = await knex("review").where({ id: reviewId }).first();
		res.json(updateReview);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteReview = async (req, res) => {
	try {
		const reviewId = Number(req.params.id);
		if (isNaN(reviewId)) {
			return res.status(400).json({ error: "Enter review Id to delete it" });
		}
		await knex("review").where({ id: reviewId }).del();
		res.status(200).json({ message: "Review deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};
