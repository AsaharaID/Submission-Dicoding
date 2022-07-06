/** @format */

const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

alert("Selamat Datang Pada Aplikasi BookShelf\n\nMade By : Muhamad Syah Reza");

function addTodo() {
	const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
	const textTodo = document.getElementById("title").value;
	const textDescription = document.getElementById("description").value;
	const timestamp = document.getElementById("date").value;
	console.log("todo" + textTodo);
	console.log("description" + textDescription);
	console.log("timestamp" + timestamp);

	const todo = makeTodo(textTodo, textDescription, timestamp);
	const todoObject = composeTodoObject(
		textTodo,
		textDescription,
		timestamp,
		false
	);

	todo[TODO_ITEMID] = todoObject.id;
	todos.push(todoObject);

	let confirmAction = confirm("Anda Yakin?");
	if (confirmAction) {
		alert("Buku Berhasil Dimasukkan");
		uncompletedTODOList.append(todo);
		updateDataToStorage();
	} else {
		alert("Dibatalkan");
	}
}

function makeTodo(data, description, timestamp, isCompleted) {
	const textTitle = document.createElement("h1");
	textTitle.innerText = data;

	const textDescription = document.createElement("h3");
	textDescription.innerText = description;

	const textTimestamp = document.createElement("p");
	textTimestamp.innerText = timestamp;

	const textContainer = document.createElement("div");
	textContainer.classList.add("inner");
	textContainer.append(textTitle, textDescription, textTimestamp);

	const container = document.createElement("div");
	container.classList.add("item", "shadow");
	container.append(textContainer);

	if (isCompleted) {
		container.append(createUndoButton(), createTrashButton());
	} else {
		container.append(createCheckButton(), createTrashButton());
	}
	return container;
}

function createButton(buttonTypeClass, eventListener) {
	const button = document.createElement("button");
	button.classList.add(buttonTypeClass);
	button.addEventListener("click", function (event) {
		eventListener(event);
	});
	return button;
}

function addTaskToCompleted(taskElement) {
	const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
	const taskTitle = taskElement.querySelector(".inner > h1").innerText;
	const taskDescription = taskElement.querySelector(".inner > h3").innerText;
	const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

	const newTodo = makeTodo(taskTitle, taskDescription, taskTimestamp, true);
	const todo = findTodo(taskElement[TODO_ITEMID]);
	todo.isCompleted = true;
	newTodo[TODO_ITEMID] = todo.id;

	listCompleted.append(newTodo);
	taskElement.remove();

	updateDataToStorage();
}

function createCheckButton() {
	return createButton("check-button", function (event) {
		let confirmAction = confirm("Anda Yakin?");
		if (confirmAction) {
			addTaskToCompleted(event.target.parentElement);
			alert("Buku Telah Dibaca");
		} else {
			alert("Aksi Dibatalkan");
		}
	});
}

function removeTaskFromCompleted(taskElement) {
	const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
	todos.splice(todoPosition, 1);

	taskElement.remove();
	updateDataToStorage();
}

function createTrashButton() {
	return createButton("trash-button", function (event) {
		let confirmAction = confirm("Anda Yakin?");
		if (confirmAction) {
			removeTaskFromCompleted(event.target.parentElement);
			alert("Buku Telah Dihapus");
		} else {
			alert("Aksi Dibatalkan");
		}
	});
}

function undoTaskFromCompleted(taskElement) {
	const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
	const taskTitle = taskElement.querySelector(".inner > h1").innerText;
	const taskDesc = taskElement.querySelector(".inner > h3").innerText;
	const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

	const newTodo = makeTodo(taskTitle, taskDesc, taskTimestamp, false);

	const todo = findTodo(taskElement[TODO_ITEMID]);
	todo.isCompleted = false;
	newTodo[TODO_ITEMID] = todo.id;

	listUncompleted.append(newTodo);
	taskElement.remove();

	updateDataToStorage();
}

function createUndoButton() {
	return createButton("undo-button", function (event) {
		let confirmAction = confirm("Anda Yakin?");
		if (confirmAction) {
			undoTaskFromCompleted(event.target.parentElement);
			alert("Pilihan Dibatalkan");
		} else {
			alert("Aksi Dibatalkan");
		}
	});
}

function refreshDataFromTodos() {
	const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
	let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

	for (todo of todos) {
		const newTodo = makeTodo(
			todo.task,
			todo.description,
			todo.timestamp,
			todo.isCompleted
		);
		newTodo[TODO_ITEMID] = todo.id;

		if (todo.isCompleted) {
			listCompleted.append(newTodo);
		} else {
			listUncompleted.append(newTodo);
		}
	}
}
