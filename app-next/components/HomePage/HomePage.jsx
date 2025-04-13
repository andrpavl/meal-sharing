"use client";

import "./HomePage.css";
import FeaturedMeals from "../FeaturedMeals/FeaturedMeals";

function HomePage() {
	return (
		<>
			<section className="hero">
				<h1>Welcome to our Meal Sharing service</h1>
			</section>
			<h2 className="list-title">
				Here you can see some our events. <br /> Psssssst... We have much more
				of them!!!
			</h2>
			<FeaturedMeals />
			<div>
				<button>Browse MORE Meal Sharing events</button>
				<button>Add a new event</button>
				<button>Go to reservations</button>
			</div>
		</>
	);
}

export default HomePage;
