"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "./image.png";
import styles from "./header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<Image src={logoImage} alt="logo" width={160} />
			<h2 className={styles.title}>Meal Sharing</h2>
			<nav className={styles.navbar}>
				<Link href="/" className={styles.navItem}>
					Home
				</Link>
				<Link href="/reservations" className={styles.navItem}>
					Reservations
				</Link>
				<Link href="/add-meal" className={styles.navItem}>
					Add Meal
				</Link>
			</nav>
		</header>
	);
};

export default Header;
