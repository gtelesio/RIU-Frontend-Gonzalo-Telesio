import { Routes } from '@angular/router';
import { HeroListPageComponent } from '../presentation/pages/hero-list-page/hero-list-page.component';
import { HeroFormPageComponent } from '../presentation/pages/hero-form-page/hero-form-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'superheroes', pathMatch: 'full' },
  { path: 'superheroes', component: HeroListPageComponent },
  { path: 'superheroes/new', component: HeroFormPageComponent },
  { path: 'superheroes/:id/edit', component: HeroFormPageComponent },
  { path: '**', redirectTo: 'superheroes' }
];
