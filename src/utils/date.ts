export const getFormattedDate = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
	const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
};
