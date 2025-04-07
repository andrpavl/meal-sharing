export const fetchAllMeals = async () => {
	try {
		const response = await fetch("http://localhost:3001/api/meals/");
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
