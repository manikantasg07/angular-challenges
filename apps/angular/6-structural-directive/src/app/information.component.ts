import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.store';
import { Role } from './user.model';
import { HasRoleDirective } from './directives/has-role.directive';
import { HasSuperAdminRoleDirective } from './directives/has-role-super-admin-directive';

@Component({
  selector: 'app-information',
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRoleSuperAdmin="true">visible only for super admin</div>
    <!-- <div *[hasRole]="'MANAGER'">visible if manager</div> -->
    <ng-template [hasRole]="'MANAGER'">
        <p>visible if manager</p>
    </ng-template>
    <div *hasRole="['MANAGER','READER']">visible if manager and/or reader</div>
    <div *hasRole="['MANAGER','WRITER']">visible if manager and/or writer</div>
    <div *hasRole="'CLIENT'">visible if client</div>
    <div>visible for everyone</div>
  `,
  imports:[HasRoleDirective,HasSuperAdminRoleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {

}
