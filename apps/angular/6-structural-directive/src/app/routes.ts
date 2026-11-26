import { Routes } from '@angular/router';
import { hasRoleGuard } from './guards/role.guard';
import { isAdminGuard } from './guards/is-admin.guard';

export const APP_ROUTES:Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
    ),
    canMatch :[hasRoleGuard('MANAGER')]
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
    ),
    canMatch :[hasRoleGuard('CLIENT')]
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent,
    ),
    canMatch :[hasRoleGuard('READER')]
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent,
    ),
    canMatch :[hasRoleGuard('WRITER')]
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
    ),
    canMatch :[isAdminGuard()]
  },
  { path: '**', redirectTo: '' }
];
