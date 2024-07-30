// form elements
const form = document.querySelector("form");
const todoInput = document.querySelector(".UserInput");
const ul = document.querySelector(".todo-list");

// Load todos from localStorage
let allTodo = getTodos();
UpdateTodoList();  // Render todos on page load

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todotext = todoInput.value.trim();

    if (todotext.length > 0) {
        // Create a new todo object
        const todoObject = {
            text: todotext,
            completed: false
        };

        // Add new todo item
        allTodo.push(todoObject);
        
        // Clear the input field
        todoInput.value = "";

        // Save to localStorage and update the list
        saveTodos();
        UpdateTodoList();
    }
}

function UpdateTodoList() {
    ul.innerHTML = "";  // Clear the existing list
    allTodo.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        ul.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoNum = "todo-" + todoIndex;
    const todoList = document.createElement("li");
    todoList.className = "todo-item";
    todoList.innerHTML = `
        <input id="${todoNum}" type="checkbox" class="checkbox">
        <label for="${todoNum}" class="costume-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label class="User-Text" for="${todoNum}">${todo.text}</label>
        <button class="DeleteBtn"><img src="assets/Delete.svg"></button>
    `;
    const del = todoList.querySelector(".DeleteBtn");
    del.addEventListener("click", () => {
        deleteTodoList(todoIndex);
    });
    const check = todoList.querySelector('input')
    check.addEventListener("change",() => {
        allTodo[todoIndex].completed = check.checked;
        saveTodos()
    });
    check.checked = todo.completed;
    return todoList;
}

function deleteTodoList(todoIndex) {
    allTodo = allTodo.filter((_, i) => i !== todoIndex);
    saveTodos();
    UpdateTodoList();
}

function saveTodos() {
    // Save the todos array as a JSON string in localStorage
    localStorage.setItem("todos", JSON.stringify(allTodo));
}

function getTodos() {
    // Retrieve and parse the todos from localStorage, or return an empty array if none exist
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}