"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/image.png";
import styles from "./header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<Image src={logoImage} alt="logo" className={styles.logoImg} />
			<Link href="/" className={styles.title}>
				Meal Sharing
			</Link>
			<nav className={styles.navbar}>
				<Link href="/" className={styles.navItem}>
					Home
				</Link>
				<Link href="/meals" className={styles.navItem}>
					All Meals
				</Link>
				<Link href="/add-meal" className={styles.navItem}>
					Add Meal
				</Link>
			</nav>
		</header>
	);
};

export default Header;
