import { CommonModule } from "@angular/common";
import { Component, type OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, type Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { SuperHeroRepository } from "@/data/repositories/super-hero.repository";
import type { SuperHero } from "@/domain/models/super-hero.model";
import { HeroListComponent } from "@/presentation/components/hero-list/hero-list.component";

@Component({
	selector: "app-hero-list-page",
	standalone: true,
	imports: [CommonModule, HeroListComponent],
	templateUrl: "./hero-list-page.component.html",
	styleUrls: ["./hero-list-page.component.scss"],
})
export class HeroListPageComponent implements OnInit {
	heroes$: Observable<SuperHero[]>;
	loading$ = new BehaviorSubject<boolean>(false);
	filter$ = new BehaviorSubject<string>("");

	constructor(
		private repo: SuperHeroRepository,
		private router: Router,
	) {
		this.heroes$ = this.filter$.pipe(
			tap(() => this.loading$.next(true)),
			switchMap((filter) =>
				filter ? this.repo.searchByName(filter) : this.repo.getAll(),
			),
			tap(() => this.loading$.next(false)),
		);
	}

	ngOnInit(): void {}

	onAdd() {
		this.router.navigate(["/superheroes/new"]);
	}

	onEdit(hero: SuperHero) {
		this.router.navigate(["/superheroes", hero.id, "edit"]);
	}

	onDelete(hero: SuperHero) {
		if (confirm(`Are you sure you want to delete ${hero.name}?`)) {
			this.loading$.next(true);
			this.repo.delete(hero.id).subscribe(() => {
				this.filter$.next(this.filter$.value); // refresh list
				this.loading$.next(false);
			});
		}
	}

	onFilter(filter: string) {
		this.filter$.next(filter);
	}
}
