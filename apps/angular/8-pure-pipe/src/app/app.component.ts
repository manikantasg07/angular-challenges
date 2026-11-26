import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonLabelPipe } from './personlabel.pipe';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    @for (person of persons; track person) {
      <!-- {{ heavyComputation(person, $index) }} -->
      {{person| personLabel:$index}}
    }
  `,
  imports:[PersonLabelPipe]
})
export class AppComponent {
  persons = ['toto', 'jack'];

  // heavyComputation(name: string, index: number) {
  //   // very heavy computation
  //   return `${name} - ${index}`;
  // }
}
