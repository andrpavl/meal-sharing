import express from "express";
import {
	addReview,
	deleteReview,
	getReviewById,
	getReviews,
	getReviewsByMealId,
	updateReview,
} from "../reviewsRouters.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.get("/:meal_id/reviews", getReviewsByMealId)
reviewRouter.post("/", addReview);
reviewRouter.get("/:id", getReviewById);
reviewRouter.put("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
