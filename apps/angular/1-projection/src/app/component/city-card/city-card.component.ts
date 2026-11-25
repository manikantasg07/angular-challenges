import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-container>
      <ng-template #teacherSnippet let-item>
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          [type]="cardType"
          (deleterow)="deleterow($event)" />
      </ng-template>
      <app-card
        image="assets/img/city.png"
        [list]="cities()"
        [type]="cardType"
        customClass="bg-light-red"
        (additem)="addnewitem($event)"
        [customTemplate]="teacherSnippet"></app-card>
    </ng-container>
  `,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private store = inject(CityStore);
  private httpservice = inject(FakeHttpService);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit() {
    this.httpservice.fetchCities$.subscribe((t: City[]) =>
      this.store.addAll(t),
    );
  }

  addnewitem(event: string) {
    this.store.addOne(randomCity());
  }

  deleterow(id: number) {
    this.store.deleteOne(id);
  }
}
