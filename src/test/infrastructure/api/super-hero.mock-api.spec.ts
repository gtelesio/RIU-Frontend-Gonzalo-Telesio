import { TestBed } from "@angular/core/testing";
import { firstValueFrom } from "rxjs";
import type { SuperHero } from "../../../domain/models/super-hero.model";
import { SuperHeroMockApiService } from "../../../infrastructure/api/super-hero.mock-api";

describe("SuperHeroMockApiService", () => {
	let service: SuperHeroMockApiService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SuperHeroMockApiService],
		});
		service = TestBed.inject(SuperHeroMockApiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getAll", () => {
		it("should return all heroes", async () => {
			const heroes = await firstValueFrom(service.getAll());

			expect(heroes.length).toBeGreaterThan(0);
			expect("id" in heroes[0]).toBe(true);
			expect("name" in heroes[0]).toBe(true);
			expect("description" in heroes[0]).toBe(true);
			expect("powers" in heroes[0]).toBe(true);
		});
	});

	describe("create", () => {
		it("should create a new hero", async () => {
			const newHero: Omit<SuperHero, "id"> = {
				name: "Batman",
				description: "Dark knight",
				powers: ["intelligence", "martial arts"],
			};

			const createdHero = await firstValueFrom(service.create(newHero));

			expect(createdHero.name).toBe("Batman");
			expect(createdHero.description).toBe("Dark knight");
			expect(createdHero.powers).toEqual(["intelligence", "martial arts"]);
			expect(createdHero.id).toBeDefined();
		});
	});

	describe("getById", () => {
		it("should return hero by id", async () => {
			const heroes = await firstValueFrom(service.getAll());
			const firstHero = heroes[0];
			const foundHero = await firstValueFrom(service.getById(firstHero.id));

			expect(foundHero).toEqual(firstHero);
		});

		it("should return undefined for non-existent id", async () => {
			const result = await firstValueFrom(service.getById("non-existent-id"));

			expect(result).toBeUndefined();
		});
	});

	describe("searchByName", () => {
		it("should return heroes matching name", async () => {
			const result = await firstValueFrom(service.searchByName("man"));

			expect(result.length).toBeGreaterThan(0);
			result.forEach((hero) => {
				expect(hero.name.toLowerCase()).toContain("man");
			});
		});

		it("should return empty array for no matches", async () => {
			const result = await firstValueFrom(service.searchByName("xyz123"));

			expect(result).toEqual([]);
		});
	});

	describe("update", () => {
		it("should update existing hero", async () => {
			const heroes = await firstValueFrom(service.getAll());
			const heroToUpdate = { ...heroes[0], name: "Updated Name" };

			const updatedHero = await firstValueFrom(service.update(heroToUpdate));

			expect(updatedHero.name).toBe("Updated Name");
			expect(updatedHero.id).toBe(heroToUpdate.id);
		});
	});

	describe("delete", () => {
		it("should delete hero by id", async () => {
			const heroes = await firstValueFrom(service.getAll());
			const heroToDelete = heroes[0];
			const initialCount = heroes.length;

			await firstValueFrom(service.delete(heroToDelete.id));
			const remainingHeroes = await firstValueFrom(service.getAll());

			expect(remainingHeroes.length).toBe(initialCount - 1);
			expect(
				remainingHeroes.find((h) => h.id === heroToDelete.id),
			).toBeUndefined();
		});
	});
});
