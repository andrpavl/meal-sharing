"use client";

import { fetchAllMeals } from "@/utils/fetchFuncs";
import { useState, useEffect } from "react";
import Meal from "../Meal/Meal";
import Loader from "../Loader";
import { StyledMealList } from "./StyledMealsList";

const MealsList = () => {
	const [meals, setMeals] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getMeals = async () => {
			try {
				const data = await fetchAllMeals();
				setMeals(data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getMeals();
	}, []);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<StyledMealList>
					{meals.map((meal) => (
						<Meal
							key={meal.id}
							id={meal.id}
							title={meal.title}
							description={meal.description}
							price={meal.price}
							image_URL={meal.image_URL}
						/>
					))}
				</StyledMealList>
			)}
		</div>
	);
};

export default MealsList;
