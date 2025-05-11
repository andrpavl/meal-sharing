"use client";

import { Section404 } from "@404pagez/react";
import { useRouter } from "next/navigation";
import styles from "./NotFound.module.css"

const NotFound = () => {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<Section404
				color="grey"
				size={36}
				isButton={true}
				onButtonClick={() => router.push("/")}
				buttonLabel="Home"
				buttonColor="gray"
			/>
		</div>
	);
};

export default NotFound;
