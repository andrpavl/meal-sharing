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
`;

