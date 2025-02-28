import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// Getting future meals
apiRouter.get("/future-meals", async (req, res) => {
	try {
		const upcomingMeals = await knex.raw(
			"SELECT * FROM meal WHERE `when` > NOW()"
		);

		upcomingMeals[0].length ?
			res.json(upcomingMeals[0])
		:	res.status(404).json("There are no any events in the future.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
});

//Getting past meals
apiRouter.get("/past-meals", async (req, res) => {
	try {
		const pastMeals = await knex.raw("SELECT * FROM meal WHERE `when` < NOW()");

		pastMeals[0].length ?
			res.json(pastMeals[0])
		:	res.status(404).json("There are no any past events.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
});

//Getting all meals
apiRouter.get("/all-meals", async (req, res) => {
	try {
		const allMeals = await knex.raw("SELECT * FROM meal ORDER BY id");
		allMeals[0].length ?
			res.json(allMeals[0])
		:	res.status(404).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
});

//Getting first meal
apiRouter.get("/first-meal", async (req, res) => {
	try {
		const firstMeal = await knex.raw("SELECT * FROM meal ORDER BY id LIMIT 1");
		firstMeal[0].length ?
			res.json(firstMeal[0])
		:	res.status(404).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
});

//Getting last meal
apiRouter.get("/last-meal", async (req, res) => {
	try {
		const lastMeal = await knex.raw(
			"SELECT * FROM meal ORDER BY id DESC LIMIT 1"
		);
		lastMeal[0].length ?
			res.json(lastMeal[0])
		:	res.status(404).json("Meals not found.");
	} catch (error) {
		res.status(500).json({ error: "Internal server error." });
	}
});

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
	console.log(`API listening on port ${process.env.PORT}`);
});
