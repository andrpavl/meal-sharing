"use client";

import Image from "next/image";
import React from "react";
import logoImage from "@/assets/image.png";
import styles from "./footer.module.css";
import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
	const socialMediaItems = [
		{
			link: "https://facebook.com",
			mediaTitle: "Facebook",
			mediaIcon: <FaFacebook />,
		},
		{
			link: "https://instagram.com",
			mediaTitle: "Instagram",
			mediaIcon: <FaInstagram />,
		},
		{
			link: "https://tiktok.com",
			mediaTitle: "Tiktok",
			mediaIcon: <FaTiktok />,
		},
		{
			link: "https://linkedin.com",
			mediaTitle: "LinkedIn",
			mediaIcon: <FaLinkedin />,
		},
	];

	return (
		<footer className={styles.footer}>
			<Image src={logoImage} alt="logo" className={styles.logoImg} />
			<Link href="/" className={styles.title}>
				Meal Sharing
			</Link>
			<ul className={styles.socialMediaList}>
				{socialMediaItems.map((item) => (
					<li key={item.mediaTitle} className={styles.socialMediaItem}>
						<Link href={item.link} target="_blank" rel="noopener noreferrer">
							{item.mediaIcon}
						</Link>
					</li>
				))}
			</ul>
		</footer>
	);
};

export default Footer;
