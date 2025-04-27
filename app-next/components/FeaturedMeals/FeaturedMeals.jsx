"use client";

import { fetchAllMeals } from "@/utils/fetchFuncs";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { StyledHomeMeal, StyledHomeMealList } from "./StyledHomeMeals";
import Meal from "../Meal/Meal";

const FeaturedMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getMeals = async () => {
			try {
				const data = await fetchAllMeals();
				const shuffled = data.sort(() => 0.5 - Math.random());
				setMeals(shuffled.slice(0, 4));
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getMeals();

		const interval = setInterval(getMeals, 5000);

		return () => clearInterval(interval);
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<StyledHomeMealList>
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
		</StyledHomeMealList>
	);
};

export default FeaturedMeals;
