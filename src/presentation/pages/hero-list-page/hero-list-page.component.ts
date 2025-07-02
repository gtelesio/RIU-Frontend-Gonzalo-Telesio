import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { SuperHeroRepository } from "@/data/repositories/super-hero.repository";
import type { SuperHero } from "@/domain/models/super-hero.model";
import { HeroListComponent } from "@/presentation/components/hero-list/hero-list.component";
import { HeroStateService } from "@/presentation/state/hero.state";

@Component({
	selector: "app-hero-list-page",
	standalone: true,
	imports: [CommonModule, HeroListComponent],
	templateUrl: "./hero-list-page.component.html",
	styleUrls: ["./hero-list-page.component.scss"],
})
export class HeroListPageComponent implements OnInit {
	filter = signal("");
	loading = signal(false);

	constructor(
		private repo: SuperHeroRepository,
		private router: Router,
		public heroState: HeroStateService,
	) {}

	ngOnInit(): void {
		this.loadHeroes();
	}

	loadHeroes() {
		this.loading.set(true);
		const filterValue = this.filter();
		const obs = filterValue
			? this.repo.searchByName(filterValue)
			: this.repo.getAll();
		obs.subscribe((heroes) => {
			this.heroState.setHeroes(heroes ?? []);
			this.loading.set(false);
		});
	}

	onAdd() {
		this.router.navigate(["/superheroes/new"]);
	}

	onEdit(hero: SuperHero) {
		this.router.navigate(["/superheroes", hero.id, "edit"]);
	}

	async onDelete(hero: SuperHero) {
		const result = await Swal.fire({
			title: `Are you sure you want to delete ${hero.name}?`,
			text: "This action cannot be undone!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		});
		if (result.isConfirmed) {
			this.loading.set(true);
			this.repo.delete(hero.id).subscribe(() => {
				this.loadHeroes();
				this.loading.set(false);
				Swal.fire("Deleted!", `${hero.name} has been deleted.`, "success");
			});
		}
	}

	onFilter(filter: string) {
		this.filter.set(filter);
		this.loadHeroes();
	}
}
