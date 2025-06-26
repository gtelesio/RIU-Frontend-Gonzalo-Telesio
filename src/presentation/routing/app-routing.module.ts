import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListPageComponent } from '../pages/hero-list-page/hero-list-page.component';
import { HeroFormPageComponent } from '../pages/hero-form-page/hero-form-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'superheroes', pathMatch: 'full' },
  { path: 'superheroes', component: HeroListPageComponent },
  { path: 'superheroes/new', component: HeroFormPageComponent },
  { path: 'superheroes/:id/edit', component: HeroFormPageComponent },
  { path: '**', redirectTo: 'superheroes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {} 