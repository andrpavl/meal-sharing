import express from "express";
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
} from "../mealsRouters.js";

const mealsRouter = express.Router();

mealsRouter.get("/future-meals", getFutureMeals);
mealsRouter.get("/past-meals", getPastMeals);
mealsRouter.get("/all-meals", getAllMeals);
mealsRouter.get("/first-meal", getFirstMeal);
mealsRouter.get("/last-meal", getLastMeal);
mealsRouter.get("/", getMeals);
mealsRouter.post("/", addNewMeal);
mealsRouter.get("/:id", getMealById);
mealsRouter.put("/:id", updateMealById);
mealsRouter.delete("/:id", deleteMealById);

export default mealsRouter;
