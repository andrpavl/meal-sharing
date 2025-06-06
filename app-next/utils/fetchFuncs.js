import axios from "axios";

const URL = "https://meal-sharing-production.up.railway.app/api";

export const fetchAllMeals = async (params = {}) => {
	try {
		const response = await axios.get(`${URL}/meals`, { params });
		return response.data;
	} catch (error) {
		console.error("Failed to fetch meals:", error);
	}
};

export const getMealById = async (id) => {
	try {
		const response = await axios.get(`${URL}/meals/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Failed to fetch meal with id ${id}:`, error);
	}
};

export const getReservations = async () => {
	try {
		const response = await axios.get(`${URL}/reservations`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch reservations:", error);
	}
};

export const getReviewsByMealId = async (id) => {
	try {
		const response = await axios.get(`${URL}/reviews/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Failed to fetch reviews for meal id ${id}:`, error);
	}
};

export const deleteReview = async (id) => {
	try {
		const response = await axios.delete(`${URL}/reviews/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Failed to delete review with id ${id}:`, error);
	}
};

export const createMeal = async (mealData) => {
	try {
		const response = await axios.post(`${URL}/meals`, mealData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Failed to create meal:", error);
		throw error;
	}
};

export const getFutureMeals = async () => {
	try {
		const response = await axios.get(`${URL}/meals/future-meals`);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch meals:", error);
	}
};
