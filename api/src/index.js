import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nestedRouter from "./routers/nested.js";
import {
	addNewMeal,
	deleteMealById,
	getAllMeals,
	getFirstMeal,
	getFutureMeals,
	getLastMeal,
	getMealById,
	getMeals,
	getPastMeals,
	updateMealById,
} from "./mealsRouters.js";
import {
	addNewReservation,
	deleteReservationById,
	getReservationById,
	getReservations,
	updateReservationById,
} from "./reservationsRouters.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// Getting future meals
apiRouter.get("/future-meals", getFutureMeals);

// Getting past meals
apiRouter.get("/past-meals", getPastMeals);

// Getting all meals
apiRouter.get("/all-meals", getAllMeals);

// Getting first meal
apiRouter.get("/first-meal", getFirstMeal);

// Getting last meal
apiRouter.get("/last-meal", getLastMeal);

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

// Getting all meals
apiRouter.get("/meals", getMeals);

// Add an new meal
apiRouter.post("/meals", addNewMeal);

// Getting the meal by Id
apiRouter.get("/meals/:id", getMealById);

// Updating of meal by Id
apiRouter.put("/meals/:id", updateMealById);

// Deleting of meal by Id
apiRouter.delete("/meals/:id", deleteMealById);

// Reservations part
//
// Getting all reservations
apiRouter.get("/reservations", getReservations);

// Adds a new reservation to the database
apiRouter.post("/reservations", addNewReservation);

// Get reservation by id

apiRouter.get("/reservations/:id", getReservationById);

// Update resrvation by id 
apiRouter.put('/api/reservations/:id', updateReservationById);

// Delete resrvation by id
apiRouter.delete('/api/reservations/:id', deleteReservationById);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
	console.log(`API listening on port ${process.env.PORT}`);
});
