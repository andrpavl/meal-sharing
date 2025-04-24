"use client";

import { useForm } from "react-hook-form";
import styles from "./BookForm.module.css";
import Swal from "sweetalert2";

const BookForm = ({ mealId, maxGuests, onNewReservation }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const res = await fetch("http://localhost:3001/api/reservations/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					meal_id: Number(mealId),
					number_of_guests: Number(data.guests),
					contact_name: data.name,
					contact_email: data.email,
					contact_phonenumber: data.phone,
					created_date: new Date().toISOString().split("T")[0],
				}),
			});

			onNewReservation?.({
				meal_id: Number(mealId),
				number_of_guests: Number(data.guests),
				contact_name: data.name,
				contact_email: data.email,
				contact_phonenumber: data.phone,
				created_date: new Date().toISOString().split("T")[0],
			});

			if (!res.ok) throw new Error("Reservation failed");

			Swal.fire({
				title: "Well done!",
				text: "Resrvation successful!",
				icon: "success",
			});
			reset();
		} catch (err) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong!",
			});
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<input
				className={styles.inputField}
				placeholder="Your name"
				{...register("name", { required: "Name is required" })}
			/>
			{errors.name && (
				<p className={styles.errorText}>{errors.name?.message}</p>
			)}

			<input
				className={styles.inputField}
				placeholder="Email"
				type="email"
				{...register("email", { required: "Email is required" })}
			/>
			{errors.email && (
				<p className={styles.errorText}>{errors.email?.message}</p>
			)}

			<input
				className={styles.inputField}
				placeholder="Phone"
				type="tel"
				{...register("phone", { required: "Phone is required" })}
			/>
			{errors.phone && (
				<p className={styles.errorText}>{errors.phone?.message}</p>
			)}

			<input
				className={styles.inputField}
				type="number"
				placeholder="Guests"
				max={10}
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
