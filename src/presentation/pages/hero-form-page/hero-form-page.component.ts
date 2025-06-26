import { CommonModule } from "@angular/common";
import { Component, type OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SuperHeroRepository } from "@/data/repositories/super-hero.repository";
import type { SuperHero } from "@/domain/models/super-hero.model";
import { HeroFormComponent } from "@/presentation/components/hero-form/hero-form.component";

@Component({
	selector: "app-hero-form-page",
	standalone: true,
	imports: [CommonModule, HeroFormComponent],
	templateUrl: "./hero-form-page.component.html",
	styleUrls: ["./hero-form-page.component.scss"],
})
export class HeroFormPageComponent implements OnInit {
	hero: SuperHero | null = null;
	isEdit = false;

	constructor(
		private repo: SuperHeroRepository,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get("id");
		if (id) {
			this.isEdit = true;
			this.repo.getById(id).subscribe((hero) => {
				this.hero = hero || null;
			});
		}
	}

	onSave(heroData: Omit<SuperHero, "id">) {
		if (this.isEdit && this.hero) {
			this.repo
				.update({ ...this.hero, ...heroData })
				.subscribe(() => this.router.navigate(["/superheroes"]));
		} else {
			this.repo
				.create(heroData)
				.subscribe(() => this.router.navigate(["/superheroes"]));
		}
	}

	onCancel() {
		this.router.navigate(["/superheroes"]);
	}
}
