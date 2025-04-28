"use client";

import React from "react";
import styles from "./AddMeal.module.css";
import { useForm } from "react-hook-form";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createMeal } from "@/utils/fetchFuncs";

const AddMeal = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const addNewMeal = async (data) => {
		const mealData = {
			title: data.title,
			description: data.description,
			location: data.location,
			when: data.date,
			max_reservations: data.guests,
			price: Number(data.price),
			image_URL: data.image_URL,
			created_date: new Date().toISOString().split("T")[0],
		};

		try {
			const response = await createMeal(mealData);
			if (response) {
				Swal.fire({
					title: "Well done!",
					text: "You have just added a new event!",
					icon: "success",
				});
			}
			reset();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
			console.error(error);
		}
	};

	return (
		<div className={styles.container}>
			<button className={styles.backBtn} onClick={() => router.back()}>
				<IoArrowBackCircleOutline /> Go back
			</button>
			<h2 className={styles.title}>
				Here you can create your own Meal Sharing event!
			</h2>
			<form onSubmit={handleSubmit(addNewMeal)} className={styles.form}>
				<input
					{...register("title", { required: "Title is required" })}
					placeholder="Title"
					className={styles.input}
				/>
				{errors.title && <p className={styles.error}>{errors.title.message}</p>}

				<input
					{...register("description", { required: "Description is required" })}
					placeholder="Description"
					className={styles.input}
				/>
				{errors.description && (
					<p className={styles.error}>{errors.description.message}</p>
				)}

				<input
					{...register("location", { required: "Location is required" })}
					placeholder="Location"
					className={styles.input}
				/>
				{errors.location && (
					<p className={styles.error}>{errors.location.message}</p>
				)}

				<input
					type="datetime-local"
					{...register("date", { required: "Date is required" })}
					placeholder="Date of event"
					className={styles.input}
				/>
				{errors.date && <p className={styles.error}>{errors.date.message}</p>}

				<input
					type="number"
					{...register("guests", {
						required: "Guests field is required",
						min: { value: 1, message: "At least 1 guest is required" },
					})}
					placeholder="How many guests?"
					className={styles.input}
				/>
				{errors.guests && (
					<p className={styles.error}>{errors.guests.message}</p>
				)}

				<input
					type="number"
					{...register("price", {
						required: "Price is required",
					})}
					placeholder="Price per person"
					className={styles.input}
					min={0}
					step="0.01"
				/>
				{errors.price && <p className={styles.error}>{errors.price.message}</p>}

				<input
					{...register("image_URL")}
					placeholder="Link to meal image"
					className={styles.input}
				/>
				{errors.image_URL && (
					<p className={styles.error}>{errors.image_URL.message}</p>
				)}

				<button type="submit" className={styles.addButton}>
					Add Meal
				</button>
			</form>
		</div>
	);
};

export default AddMeal;
