import { Todo } from './todo.class';

export class TodoList {
    static instancia;

    constructor () {
        if ( !!TodoList.instancia) {
            return TodoList.instancia;
        }
        TodoList.instancia = this;
        this.loadLocalStorage();
    }

    addTodo ( todo ) {
        this.todos.push(todo);
        this.saveLocalStorage();
    }

    deleteTodo ( id ) {
        this.todos = this.todos.filter((todo) => todo.id != id);
        this.saveLocalStorage();
    }

    checkCompleted( id ) {
        let todo = this.todos.filter((todo) => todo.id == id)[0];
        todo.completed = !todo.completed;
        this.saveLocalStorage();
    }

    deleteAllCompleted( ) {
        this.todos = this.todos.filter((todo) => !todo.completed);  
        this.saveLocalStorage();      
    }

    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    loadLocalStorage() {
        this.todos = (localStorage.getItem('todo'))
                        ? JSON.parse(localStorage.getItem('todo'))
                        : [];
        this.todos = this.todos.map( Todo.fromJson )
    }
}