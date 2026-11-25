import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-container>
      <ng-template #teacherSnippet let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          [type]="cardType"
          (deleterow)="deleterow($event)" />
      </ng-template>
      <app-card
        image="assets/img/teacher.png"
        [list]="teachers()"
        [type]="cardType"
        customClass="bg-light-red"
        (additem)="addnewitem($event)"
        [customTemplate]="teacherSnippet"></app-card>
    </ng-container>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addnewitem(event: string) {
    this.store.addOne(randTeacher());
  }

  deleterow(id: number) {
    this.store.deleteOne(id);
  }
}
