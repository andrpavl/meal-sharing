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

export const SortControls = styled.div`
	margin-bottom: 1.5rem;
	display: flex;
	gap: 1rem;
	align-items: center;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		margin-top: 0.5rem;
	}
`;

export const SortGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SortLabel = styled.label`
	font-weight: bold;
	margin-bottom: 0.5rem;
	font-size: 1rem;
	color: #333;
`;

export const SortSelect = styled.select`
	padding: 0.5rem 1rem;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 1rem;
	background-color: #f9f9f9;
	cursor: pointer;
	outline: none;
	transition: border-color 0.3s ease, box-shadow 0.3s ease;

	&:focus {
		border-color: #0070f3;
		box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
	}
`;

export const StyledCheckbox = styled.label`
	font-size: 1rem;
	color: #333;
	margin-top: 1.5rem;

	@media (max-width: 639px) {
		margin-top: 0;
	}
`;
