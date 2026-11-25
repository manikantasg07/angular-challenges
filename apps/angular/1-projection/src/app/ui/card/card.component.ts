import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <!--@if (type() === CardType.TEACHER) {
        <img ngSrc="assets/img/teacher.png" width="200" height="200" alt="" />
      }
      @if (type() === CardType.STUDENT) {
        <img ngSrc="assets/img/student.webp" width="200" height="200" alt="" />
      } -->
      <img [ngSrc]="image()" width="200" height="200" alt="" />
      <section>
        @for (item of list(); track item) {
          <!--<app-list-item
                [name]="item.firstName"
                [id]="item.id"
                [type]="type()"
            >
            </app-list-item>-->
          <ng-container
            *ngTemplateOutlet="
              customTemplate();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ListItemComponent, NgOptimizedImage, NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly customClass = input('');
  readonly image = input.required<string>();
  readonly customTemplate = input.required<TemplateRef<any>>();

  @Output() additem = new EventEmitter<string>();

  CardType = CardType;

  addNewItem() {
    this.additem.emit('add');
  }
}
