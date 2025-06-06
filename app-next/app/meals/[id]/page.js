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
import noImage from "@/assets/noImage.webp";

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

				if (!mealData) {
					router.push("/not-found");
					return;
				}

				setMeal(mealData);

				const allReservations = await getReservations();

				const filtered = allReservations.filter(
					(r) => r.meal_id === Number(id)
				);

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

	const totalReserved = reservations.reduce(
		(sum, r) => sum + r.number_of_guests,
		0
	);

	const availableSeats =
		meal?.max_reservations != null ? meal.max_reservations - totalReserved : 0;
	const mealDate = new Date(meal?.when).toLocaleDateString("da-DK");
	const addReservation = (newReservation) => {
		setReservations((prev) => [...prev, newReservation]);
	};

	return (
		meal && (
			<div>
				<div className={styles.mealPageCont}>
					<button className={styles.backBtn} onClick={() => router.back()}>
						<IoArrowBackCircleOutline /> Go back
					</button>
					<div className={styles.mealCont}>
						<h1>{meal.title}</h1>
						<img
							className={styles.mealImg}
							src={meal.image_URL || noImage.src}
							alt={meal.title}
							onError={(e) => {
								e.currentTarget.onerror = null;
								e.currentTarget.src = noImage.src;
							}}
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
							<h3 className={styles.reservTitle}>Make a Reservation</h3>
							<BookForm
								mealId={meal.id}
								maxGuests={availableSeats}
								onNewReservation={addReservation}
							/>
						</div>
					)}
				</div>
				<div className={styles.reviewBlock}>
					{<Reviews mealId={Number(id)} />}
				</div>
			</div>
		)
	);
};

export default MealPage;
