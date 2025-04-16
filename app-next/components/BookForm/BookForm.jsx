"use client";

import { useForm } from "react-hook-form";
import styles from "./BookForm.module.css";

const BookForm = ({ mealId, maxGuests, onSuccess }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const res = await fetch("/api/reservations", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					meal_id: Number(mealId),
					number_of_guests: Number(data.guests),
					contact_name: data.name,
					contact_email: data.email,
					contact_phone: data.phone,
				}),
			});

			if (!res.ok) throw new Error("Reservation failed");

			alert("✅ Reservation successful!");
			reset();
			if (onSuccess) onSuccess();
		} catch (err) {
			alert("❌ Something went wrong.");
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{/* Name Field */}
			<input
				className={styles.inputField}
				placeholder="Your name"
				{...register("name", { required: "Name is required" })}
			/>
			{errors.name && (
				<p className={styles.errorText}>{errors.name?.message}</p>
			)}

			{/* Email Field */}
			<input
				className={styles.inputField}
				placeholder="Email"
				type="email"
				{...register("email", { required: "Email is required" })}
			/>
			{errors.email && (
				<p className={styles.errorText}>{errors.email?.message}</p>
			)}

			{/* Phone Field */}
			<input
				className={styles.inputField}
				placeholder="Phone"
				type="tel"
				{...register("phone", { required: "Phone is required" })}
			/>
			{errors.phone && (
				<p className={styles.errorText}>{errors.phone?.message}</p>
			)}

			{/* Guests Field */}
			<input
				className={styles.inputField}
				type="number"
				placeholder="Guests"
				{...register("guests", {
					required: "Number of guests is required",
					min: 1,
					max: maxGuests,
				})}
			/>
			{errors.guests && (
				<p className={styles.errorText}>{errors.guests?.message}</p>
			)}

			<button type="submit" className={styles.submitButton}>
				Book seat
			</button>
		</form>
	);
};

export default BookForm;
