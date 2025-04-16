import React from "react";
import { StyledMeal } from "./StyledMeal";
import Link from "next/link";

const Meal = ({ id, title, description, price, image_URL }) => {
	return (
		<Link href={`/meals/${id}`}>
			<StyledMeal>
				<img src={image_URL} alt={title} />
				<div className="content">
					<div>
						<h4>{title}</h4>
						<p>{description}</p>
					</div>
					<p className="price">€ {price}</p>
				</div>
			</StyledMeal>
		</Link>
	);
};

export default Meal;
