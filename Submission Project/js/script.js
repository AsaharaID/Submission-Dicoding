/** @format */

document.addEventListener("DOMContentLoaded", function () {
	const submitform = document.getElementById("form");
	submitform.addEventListener("submit", function (event) {
		event.preventDefault();
		addTodo();
	});

	if (isStorageExist()) {
		loadDataFromStorage();
	}
});

document.addEventListener("ondatasaved", () => {
	console.log("Data dah disimpen NGAB");
});

document.addEventListener("ondataloaded", () => {
	refreshDataFromTodos();
});
