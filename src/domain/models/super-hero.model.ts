export interface SuperHero {
	id: string;
	name: string;
	description: string;
	powers: string[];
}

export class SuperHeroEntity implements SuperHero {
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public powers: string[],
	) {}
}
