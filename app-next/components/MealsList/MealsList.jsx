"use client";

import { fetchAllMeals } from "@/utils/fetchFuncs";
import { useState, useEffect } from "react";


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
				<h3>Loading...</h3>
			) : (
				<ol>
					{meals.map(({ id, title, description, price }) => (
						<li key={id}>
							<h4>{title}</h4>
							<p>{description}</p>
							<p>{price}</p>
						</li>
					))}
				</ol>
			)}
		</div>
	);
};

export default MealsList;
