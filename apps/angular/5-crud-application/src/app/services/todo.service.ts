import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { randText } from '@ngneat/falso';

@Injectable({ providedIn: 'root' })
export class TodoService {

    private http = inject(HttpClient);

    fetchTodos(){
        return this.http.get<Todo[]>("https://jsonplaceholder.typicode.com/todos");
    }

    updateTodo(todo:Todo){
        return this.http
              .put<Todo>(
                `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
                JSON.stringify({
                  todo: todo.id,
                  title: randText(),
                  userId: todo.userId,
                  completed: todo.completed
                }),
                {
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
                },
              )
    }

    deleteTodo(todo:Todo){
        return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
    }

}