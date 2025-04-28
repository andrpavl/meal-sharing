"use client";

import { fetchAllMeals } from "@/utils/fetchFuncs";
import { useState, useEffect } from "react";
import Meal from "../Meal/Meal";
import Loader from "../Loader";
import {
	SortControls,
	SortGroup,
	SortLabel,
	SortSelect,
	StyledMealList,
} from "./StyledMealsList";

const MealsList = () => {
	const [meals, setMeals] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [sortKey, setSortKey] = useState("");
	const [sortDir, setSortDir] = useState("asc");

	useEffect(() => {
		const getMeals = async () => {
			setIsLoading(true);
			try {
				const params = {};
				if (sortKey) params.sortKey = sortKey;
				if (sortDir) params.sortDir = sortDir;
				const data = await fetchAllMeals(params);
				setMeals(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		getMeals();
	}, [sortKey, sortDir]);

	const handleSortKeyChange = (e) => {
		setSortKey(e.target.value);
	};

	const handleSortDirChange = (e) => {
		setSortDir(e.target.value);
	};

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<SortControls>
						<SortGroup>
							<SortLabel>Sort by:</SortLabel>
							<SortSelect value={sortKey} onChange={handleSortKeyChange}>
								<option value="">None</option>
								<option value="price">Price</option>
								<option value="when">Date</option>
								<option value="max_reservations">Max Reservations</option>
							</SortSelect>
						</SortGroup>

						<SortGroup>
							<SortLabel>Direction:</SortLabel>
							<SortSelect value={sortDir} onChange={handleSortDirChange}>
								<option value="asc">Ascending</option>
								<option value="desc">Descending</option>
							</SortSelect>
						</SortGroup>
					</SortControls>
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
				</>
			)}
		</div>
	);
};

export default MealsList;
