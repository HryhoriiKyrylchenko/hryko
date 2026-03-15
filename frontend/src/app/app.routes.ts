import { Routes } from '@angular/router';
import {MainLayoutComponent} from './core/layouts/main-layout/main-layout.component';
import {ErrorPageComponent} from './features/error/error-page.component';
import {StaticPageComponent} from './shared/components/static-page/static-page.component';
import {AboutComponent} from './features/about/about.component';
import {HelpPageComponent} from './features/help/help-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'help', component: HelpPageComponent },
      { path: 'cookies', component: StaticPageComponent, data: { page: 'cookies' } },
      { path: 'terms', component: StaticPageComponent, data: { page: 'terms' } },
      { path: 'privacy', component: StaticPageComponent, data: { page: 'privacy' } },
      { path: 'contact', component: StaticPageComponent, data: { page: 'contact' } },
      { path: '**', component: ErrorPageComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
