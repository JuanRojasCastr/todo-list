export class Todo {

    static fromJson ( { completed, created, id, task } ) {
        const tempTodo = new Todo(task);
        tempTodo.id = id;
        tempTodo.completed = completed;
        tempTodo.created = created;

        return tempTodo;
    }

    constructor( task ) {
        this.task = task;
        this.id    = new Date().getTime();
        this.completed = false;
        this.created = new Date();
    }
}