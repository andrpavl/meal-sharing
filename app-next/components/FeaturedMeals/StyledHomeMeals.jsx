import styled from "styled-components";
import Meal from "../Meal/Meal";

export const StyledHomeMealList = styled.ul`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 26px;
	padding: 0;
	margin: 0;
	width: 100%;
	list-style: none;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

export const StyledHomeMeal = styled(Meal)`
	background-color: #f9f5f0;
	border-radius: 12px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

	display: flex;
	flex-direction: column;

	height: 100%;
	overflow: hidden;

	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.02);
	}

	img {
		width: 100%;
		height: 250px;
		object-fit: cover;
		border-radius: 12px 12px 0 0;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 12px;
	}

	h4 {
		margin: 0 0 8px 0;
		font-size: 1.1rem;
		color: #333;
	}

	p {
		margin: 4px 0;
		color: #666;
		flex-grow: 1;
	}

	.price {
		font-weight: bold;
		color: #000;
		margin-top: 12px;
	}
`;
