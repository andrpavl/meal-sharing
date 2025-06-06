"use client";

import { useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { deleteReview, getReviewsByMealId } from "@/utils/fetchFuncs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { PiStarDuotone } from "react-icons/pi";
import { LuTrash2 } from "react-icons/lu";

const Reviews = ({ mealId }) => {
	const [reviews, setReviews] = useState([]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const fetchReviews = async () => {
		try {
			const reviewData = await getReviewsByMealId(mealId);
			if (Array.isArray(reviewData)) {
				setReviews(reviewData);
			} else {
				setReviews([]);
			}
		} catch (error) {
			console.error("Failed to fetch reviews:", error);
			setReviews([]);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [mealId]);

	const addReview = async (data) => {
		try {
			const res = await fetch("https://meal-sharing-production.up.railway.app/api/reviews/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: data.title,
					description: data.description,
					meal_id: mealId,
					stars: Number(data.stars),
					created_date: new Date().toISOString().split("T")[0],
				}),
			});

			if (!res.ok) throw new Error("Failed to add review");

			Swal.fire({
				title: "Well done!",
				text: "You have just added a new review!",
				icon: "success",
			});

			reset();
			await fetchReviews();
		} catch (error) {
			console.error("Error adding review:", error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
		}
	};

	const onDelete = async (id) => {
		try {
			await deleteReview(id);
			await fetchReviews();
			Swal.fire({
				title: "Deleted!",
				text: "Your review has been deleted.",
				icon: "success",
			});
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Failed to delete review!",
			});
		}
	};

	return (
		<>
			<h3>Reviews:</h3>
			{reviews.length > 0 ? (
				<ul className={styles.reviewsList}>
					{reviews.map((review) => (
						<li key={review.id} className={styles.listItem}>
							<LuTrash2
								className={styles.trashIcon}
								onClick={() => onDelete(review.id)}
							/>
							<h4>{review.title}</h4>
							<p>{review.description}</p>
							<div className={styles.starsDiv}>
								<PiStarDuotone />
								<p>{review.stars}/5</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p style={{ marginBottom: "12px" }}>
					No reviews found for this meal. Be the first to add one!
				</p>
			)}

			<form className={styles.reviewForm} onSubmit={handleSubmit(addReview)}>
				<input
					type="text"
					placeholder="Review title"
					className={styles.reviewTitle}
					{...register("title", { required: "Title is required" })}
				/>
				{errors.title && <p className={styles.error}>{errors.title.message}</p>}

				<textarea
					rows={5}
					placeholder="You can add your review here"
					className={styles.textarea}
					{...register("description", { required: "Description is required" })}
				/>
				{errors.description && (
					<p className={styles.error}>{errors.description.message}</p>
				)}

				<input
					type="number"
					className={styles.stars}
					placeholder="Stars (1–5)"
					min={1}
					max={5}
					{...register("stars", { required: "Stars are required" })}
				/>
				{errors.stars && <p className={styles.error}>{errors.stars.message}</p>}

				<button type="submit" className={styles.addBtn}>
					Add review
				</button>
			</form>
		</>
	);
};

export default Reviews;
