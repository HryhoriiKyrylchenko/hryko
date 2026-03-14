import { Routes } from '@angular/router';
import {MainLayoutComponent} from './core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,

  },
  { path: '**', redirectTo: '' }
];
