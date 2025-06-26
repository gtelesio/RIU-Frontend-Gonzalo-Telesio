import {
	type SuperHero,
	SuperHeroEntity,
} from "@/domain/models/super-hero.model";

describe("SuperHero Model", () => {
	describe("SuperHero Interface", () => {
		it("should have required properties", () => {
			const hero: SuperHero = {
				id: "1",
				name: "Spiderman",
				description: "Spider man",
				powers: ["wall crawling", "spider sense"],
			};

			expect(hero.id).toBe("1");
			expect(hero.name).toBe("Spiderman");
			expect(hero.description).toBe("Spider man");
			expect(hero.powers).toEqual(["wall crawling", "spider sense"]);
		});
	});

	describe("SuperHeroEntity", () => {
		it("should create entity with constructor", () => {
			const hero = new SuperHeroEntity("1", "Spiderman", "Spider man", [
				"wall crawling",
				"spider sense",
			]);

			expect(hero.id).toBe("1");
			expect(hero.name).toBe("Spiderman");
			expect(hero.description).toBe("Spider man");
			expect(hero.powers).toEqual(["wall crawling", "spider sense"]);
		});

		it("should implement SuperHero interface", () => {
			const hero = new SuperHeroEntity("1", "Spiderman", "Spider man", [
				"wall crawling",
				"spider sense",
			]);

			expect("id" in hero).toBe(true);
			expect("name" in hero).toBe(true);
			expect("description" in hero).toBe(true);
			expect("powers" in hero).toBe(true);
		});
	});
});
