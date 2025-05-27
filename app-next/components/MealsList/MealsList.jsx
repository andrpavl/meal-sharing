"use client";

import { fetchAllMeals, getFutureMeals } from "@/utils/fetchFuncs";
import { useState, useEffect } from "react";
import Meal from "../Meal/Meal";
import Loader from "../Loader";
import {
	SortControls,
	SortGroup,
	SortLabel,
	SortSelect,
	StyledCheckbox,
	StyledMealList,
} from "./StyledMealsList";

const MealsList = () => {
	const [meals, setMeals] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [sortKey, setSortKey] = useState("");
	const [sortDir, setSortDir] = useState("asc");
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		const getMeals = async () => {
			setIsLoading(true);
			try {
				const params = {};
				if (sortKey) params.sortKey = sortKey;
				if (sortDir) params.sortDir = sortDir;
				const allMeals = await fetchAllMeals(params);
				const futureMeals = await getFutureMeals();
				const data = isSelected ? futureMeals : allMeals;
				setMeals(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		getMeals();
	}, [sortKey, sortDir, isSelected]);

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
						<StyledCheckbox>
							<input
								type="checkbox"
								checked={isSelected}
								onChange={() => setIsSelected(!isSelected)}
							/>
							&nbsp;Show only upcoming events
						</StyledCheckbox>
					</SortControls>
					<StyledMealList>
						{meals && meals.length > 0 ? (
							meals.map((meal) => (
								<Meal
									key={meal.id}
									id={meal.id}
									title={meal.title}
									description={meal.description}
									price={meal.price}
									image_URL={meal.image_URL}
								/>
							))
						) : (
							<p>No meals found</p>
						)}
					</StyledMealList>
				</>
			)}
		</div>
	);
};

export default MealsList;
