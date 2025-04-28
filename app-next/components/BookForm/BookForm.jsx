"use client";

import { useForm } from "react-hook-form";
import styles from "./BookForm.module.css";
import Swal from "sweetalert2";
import { PiSealWarning } from "react-icons/pi";

const BookForm = ({ mealId, maxGuests, onNewReservation }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const reservationData = {
			meal_id: Number(mealId),
			number_of_guests: Number(data.guests),
			contact_name: data.name,
			contact_email: data.email,
			contact_phonenumber: data.phone,
			created_date: new Date().toISOString().split("T")[0],
		};

		try {
			const res = await fetch("http://localhost:3001/api/reservations/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(reservationData),
			});

			if (!res.ok) throw new Error(`Reservation failed: ${res.status}`);

			await Swal.fire({
				title: "Success!",
				text: "Your reservation is confirmed 🎉",
				icon: "success",
			});

			onNewReservation?.(reservationData);
			reset();
		} catch (err) {
			console.error(err);
			await Swal.fire({
				icon: "error",
				title: "Reservation failed",
				text: "Something went wrong. Please try again later 🙈",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<input
				className={styles.inputField}
				placeholder="Your name"
				{...register("name", { required: "Name is required" })}
			/>
			{errors.name && <p className={styles.errorText}>{errors.name.message}</p>}

			<input
				className={styles.inputField}
				type="email"
				placeholder="Email"
				{...register("email", { required: "Email is required" })}
			/>
			{errors.email && (
				<p className={styles.errorText}>{errors.email.message}</p>
			)}

			<input
				className={styles.inputField}
				type="tel"
				placeholder="Phone"
				{...register("phone", { required: "Phone is required" })}
			/>
			{errors.phone && (
				<p className={styles.errorText}>{errors.phone.message}</p>
			)}

			<input
				className={styles.inputField}
				type="number"
				placeholder="Guests"
				{...register("guests", {
					required: "Number of guests is required",
					min: { value: 1, message: "At least 1 guest is needed" },
					max: { value: maxGuests, message: `Only ${maxGuests} seats left.` },
				})}
			/>
			{errors.guests && (
				<p className={styles.errorText}>{errors.guests.message}</p>
			)}

			<button type="submit" className={styles.submitButton}>
				Book seat
			</button>
			<div className={styles.notice}>
				<PiSealWarning />
				<p className={styles.noticeText}>
					Notice! It's allowed to book max. 10 seats per 1 time.
				</p>
			</div>
		</form>
	);
};

export default BookForm;
