import type { Routes } from "@angular/router";
import { HeroFormPageComponent } from "@/presentation/pages/hero-form-page/hero-form-page.component";
import { HeroListPageComponent } from "@/presentation/pages/hero-list-page/hero-list-page.component";

export const routes: Routes = [
	{ path: "", redirectTo: "superheroes", pathMatch: "full" },
	{ path: "superheroes", component: HeroListPageComponent },
	{ path: "superheroes/new", component: HeroFormPageComponent },
	{ path: "superheroes/:id/edit", component: HeroFormPageComponent },
	{ path: "**", redirectTo: "superheroes" },
];
