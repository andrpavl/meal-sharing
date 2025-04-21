"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";
import BookForm from "@/components/BookForm/BookForm";
import { getMealById, getReservations } from "@/utils/fetchFuncs";
import styles from "./meal.module.css";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Reviews from "@/components/Reviews/Reviews";

const MealPage = () => {
	const { id } = useParams();
	const [meal, setMeal] = useState(null);
	const [reservations, setReservations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchMealData = async () => {
			try {
				const mealData = await getMealById(id);
				const allReservations = await getReservations();
				const filtered = allReservations.filter(
					(r) => r.meal_id === Number(id)
				);

				setMeal(mealData);
				setReservations(filtered);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMealData();
	}, [id]);

	if (isLoading) return <Loader />;
	if (!meal.id) {
		return (
			<p style={{ textAlign: "center", fontSize: 36 }}>😵 Meal not found</p>
		);
	}

	const totalReserved = reservations.reduce(
		(sum, r) => sum + r.number_of_guests,
		0
	);
	const availableSeats = meal.max_reservations - totalReserved;
	const mealDate = new Date(meal.when).toLocaleDateString("da-DK");
	return (
		<div >
			<div className={styles.mealPageCont}>
				<button className={styles.backBtn} onClick={() => router.back()}>
					<IoArrowBackCircleOutline /> Go back
				</button>
				<div className={styles.mealCont}>
					<h1>{meal.title}</h1>
					<img
						className={styles.mealImg}
						src={meal.image_URL}
						alt={meal.title}
					/>
					<h3>
						Description: <span>{meal.description}</span>
					</h3>
					<h3>
						Location: <span>{meal.location}</span>
					</h3>
					<h3>
						When: <span>{mealDate}</span>
					</h3>
					<h3>
						Price: <span>€{meal.price}</span>
					</h3>
					<h3>
						Available seats:{" "}
						<span>{availableSeats > 0 ? availableSeats : "None 😢"}</span>
					</h3>
				</div>

				{availableSeats > 0 && (
					<div className={styles.reservCont}>
						<h3>Make a Reservation</h3>
						<BookForm mealId={meal.id} maxGuests={availableSeats} />
					</div>
				)}
			</div>
			{<Reviews mealId={Number(id)} />}
		</div>
	);
};

export default MealPage;
