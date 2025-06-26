import { Injectable } from "@angular/core";
import { SuperHeroService } from "@/domain/services/super-hero.service";
import { SuperHeroMockApiService } from "@/infrastructure/api/super-hero.mock-api";

@Injectable({ providedIn: "root" })
export class SuperHeroRepository extends SuperHeroService {
	create: SuperHeroService["create"];
	getAll: SuperHeroService["getAll"];
	getById: SuperHeroService["getById"];
	searchByName: SuperHeroService["searchByName"];
	update: SuperHeroService["update"];
	delete: SuperHeroService["delete"];

	constructor(private api: SuperHeroMockApiService) {
		super();
		this.create = this.api.create.bind(this.api);
		this.getAll = this.api.getAll.bind(this.api);
		this.getById = this.api.getById.bind(this.api);
		this.searchByName = this.api.searchByName.bind(this.api);
		this.update = this.api.update.bind(this.api);
		this.delete = this.api.delete.bind(this.api);
	}
}
