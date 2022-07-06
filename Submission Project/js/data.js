const STORAGE_KEY = "TODO_APPS";

let todos = [];

function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed /* string */ = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null)
        todos = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function composeTodoObject(task, description, timestamp, isCompleted) {
    return {
        id: +new Date(),
        task,
        description,
        timestamp,
        isCompleted
    };
}

function findTodo(todoId) {

    for(todo of todos){
        if(todo.id === todoId)
            return todo;
    }

    return null;
}

function findTodoIndex(todoId) {

    let index = 0
    for (todo of todos) {
        if(todo.id === todoId)
            return index;

        index++;
    }

    return -1;
}