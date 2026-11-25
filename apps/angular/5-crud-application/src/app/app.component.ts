import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


interface statusObj{
  loading:boolean,
  hasError : boolean,
  errorMessage:string
}

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if(status().loading){
        <mat-spinner></mat-spinner>
    }@else{
      @for (todo of todos(); track todo.id) {
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      }
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class AppComponent implements OnInit {
  private store = inject(TodoService);
  private destroyRef = inject(DestroyRef);
  private status = signal<statusObj>({
    loading:false,
    hasError:false,
    errorMessage:''
  });

  todos = signal<Todo[]>([]);

  ngOnInit(): void {
    this.status.set({
      loading:false,
      hasError:false,
      errorMessage:''
    })
   this.store.fetchTodos().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:(todos:Todo[])=>{
        this.todos.set(todos);
        
      },
      error:(error)=>{

      },
      complete: () => this.status.update((status) => ({ ...status, loading: false }))
    });
  }

  update(todo: any) {
    this.store.updateTodo(todo).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((todoUpdated: Todo) => {
        this.todos.update((todos:Todo[])=> todos.map((todo)=>(todo.id==todoUpdated.id?todoUpdated:todo)))
    });
  }

  delete(deletetodo:Todo){
    this.store.deleteTodo(deletetodo).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      ()=> this.todos.update((todos:Todo[])=>todos.filter((todo)=>todo.id!=deletetodo.id))
    );
  }

}
