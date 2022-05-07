
import { Todo, TodoList } from '../classes';
import { todoList } from '../index';


// HTML References
const taskListHTML = document.querySelector('.todo-list');
const addTaskHTML  = document.querySelector('.new-todo');
const checkboxAll  = document.querySelectorAll('.toggle');
const deleteTasks  = document.querySelector('.clear-completed');
const filtersList  = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro')

checkboxAll.forEach(element => {
    console.log(element);
    element.addEventListener('change', (event) => {
        console.log(event);
    });
});

export const createTodoHTML = ( todo ) => {
    const todoHTML = `
    <li class="${ (todo.completed)? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completed)? 'checked' : '' }>
            <label>${ todo.task }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = todoHTML;

    taskListHTML.append(div.firstElementChild);

    const tasksList = document.querySelectorAll('li');

    return div.firstElementChild;
};

// Events
addTaskHTML.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && addTaskHTML.value.length) {
        const newTodo = new Todo(addTaskHTML.value);
        todoList.addTodo(newTodo);
        addTaskHTML.value = '';
        createTodoHTML(newTodo);
    }
});

addTaskHTML.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && addTaskHTML.value.length) {
        const newTodo = new Todo(addTaskHTML.value);
        todoList.addTodo(newTodo);
        addTaskHTML.value = '';
        createTodoHTML(newTodo);
        console.log(todoList);
    }
});

taskListHTML.addEventListener('click', (event) => {
    const elementType = event.target.localName;
    const element = event.target.parentElement.parentElement;
    const elementId = event.target.parentElement.parentElement.getAttribute('data-id');
    if (elementType === 'input') {
        todoList.checkCompleted(elementId);
        element.classList.toggle('completed');
    }
    else if (elementType === 'button') {
        todoList.deleteTodo(elementId);
        element.remove();
    }
});

filtersList.addEventListener('click', (event) => {
    const elementType = event.target.text;

    if (!elementType) return;

    anchorFilters.forEach( filter => filter.classList.remove('selected') );

    event.target.classList.add('selected');

    for (const todo of taskListHTML.children) {
        todo.classList.remove('hidden');
        const completed = todo.classList.contains('completed');
        
        switch(elementType) {
            case 'Pendientes':
                if ( completed ) todo.classList.add('hidden')
                break;
            case 'Completados':
                if ( !completed ) todo.classList.add('hidden')
                break;
        }
    }
});

deleteTasks.addEventListener('click', () => {
    todoList.deleteAllCompleted();
    let childrens = taskListHTML.children;
    console.log(childrens);
    
    for (let index =  childrens.length - 1; index >= 0; index--) {
        const element = childrens[index];
        
        if (element.classList.contains('completed')) element.remove();
    }
});
