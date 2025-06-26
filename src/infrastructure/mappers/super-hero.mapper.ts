import type { SuperHero } from "../../domain/models/super-hero.model";

export interface SuperHeroDTO {
	id: string;
	name: string;
	description: string;
	powers: string[];
}

export function toSuperHeroDomain(dto: SuperHeroDTO): SuperHero {
	return { ...dto };
}
