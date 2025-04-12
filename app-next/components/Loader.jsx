import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}>
			<ColorRing
				visible={true}
				height="80"
				width="80"
				ariaLabel="color-ring-loading"
				wrapperStyle={{}}
				wrapperClass="color-ring-wrapper"
				colors={["#5b64e1", "#48c6ca", "#b9e039", "#abbd81", "#849b87"]}
			/>
		</div>
	);
};

export default Loader;
