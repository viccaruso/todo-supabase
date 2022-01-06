import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');


todoForm.addEventListener('submit', async(e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    // Create todo 
    const data = new FormData(todoForm);
    const todo = data.get('todo');
    await createTodo(todo);
    // Reset form
    todoForm.reset();
    // Display todo
    await displayTodos();
});

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', async() => {
    await displayTodos();

});

deleteButton.addEventListener('click', async() => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    await displayTodos();
});

async function displayTodos() {
    // fetch the todos
    const todos = await getTodos();
    // display the list of todos
    while (todosEl.firstChild) {
        todosEl.firstChild.remove();
    }
    for (let todo of todos) {
        const todoEl = renderTodo(todo);
        todoEl.addEventListener('click', async() => {
            await completeTodo(todo.id);
            displayTodos();
        });
        todosEl.append(todoEl);
    }
}

logoutButton.addEventListener('click', () => {
    logout();
});

