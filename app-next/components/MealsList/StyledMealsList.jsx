import styled from "styled-components";

export const StyledMealList = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
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
