export function renderTodo(todo) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    (todo.complete) ? div.classList.add('complete') : div.classList.add('incomplete');

    div.classList.add('todo');
    p.textContent = todo.todo;
    div.append(p);
    return div;
}