import { CommonModule } from "@angular/common";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import type { SuperHero } from "@/domain/models/super-hero.model";
import { HeroListComponent } from "@/presentation/components/hero-list/hero-list.component";

describe("HeroListComponent", () => {
	let component: HeroListComponent;
	let fixture: ComponentFixture<HeroListComponent>;

	const mockHeroes: SuperHero[] = [
		{
			id: "1",
			name: "Spiderman",
			description: "Spider man",
			powers: ["wall crawling", "spider sense"],
		},
		{
			id: "2",
			name: "Batman",
			description: "Dark knight",
			powers: ["intelligence", "martial arts"],
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeroListComponent, CommonModule, FormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(HeroListComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	describe("Inputs", () => {
		it("should display heroes when input is provided", () => {
			component.heroes = mockHeroes;
			fixture.detectChanges();

			const rows = fixture.nativeElement.querySelectorAll("tbody tr");
			expect(rows.length).toBe(2);
		});

		it("should show loading when loading input is true", () => {
			component.loading = true;
			fixture.detectChanges();

			const loadingSkeleton = fixture.nativeElement.querySelector(
				"app-loading-skeleton",
			);
			expect(loadingSkeleton).toBeTruthy();
		});

		it("should not show table when loading is true", () => {
			component.loading = true;
			component.heroes = mockHeroes;
			fixture.detectChanges();

			const table = fixture.nativeElement.querySelector("table");
			expect(table).toBeFalsy();
		});
	});

	describe("Outputs", () => {
		it("should emit add event when add button is clicked", () => {
			spyOn(component.add, "emit");
			fixture.detectChanges();

			const addButton = fixture.nativeElement.querySelector("button");
			addButton.click();

			expect(component.add.emit).toHaveBeenCalled();
		});

		it("should emit edit event when edit button is clicked", () => {
			component.heroes = mockHeroes;
			spyOn(component.edit, "emit");
			fixture.detectChanges();

			const buttons = fixture.nativeElement.querySelectorAll("button");
			const editButton = buttons[1] as HTMLButtonElement; // Second button should be edit
			editButton.click();

			expect(component.edit.emit).toHaveBeenCalledWith(mockHeroes[0]);
		});

		it("should emit remove event when delete button is clicked", () => {
			component.heroes = mockHeroes;
			spyOn(component.remove, "emit");
			fixture.detectChanges();

			const buttons = fixture.nativeElement.querySelectorAll("button");
			const deleteButton = buttons[2] as HTMLButtonElement; // Third button should be delete
			deleteButton.click();

			expect(component.remove.emit).toHaveBeenCalledWith(mockHeroes[0]);
		});

		it("should emit filter event when filter input changes", () => {
			spyOn(component.filter, "emit");
			fixture.detectChanges();

			const filterInput = fixture.nativeElement.querySelector("input");
			filterInput.value = "spider";
			filterInput.dispatchEvent(new Event("input"));

			expect(component.filter.emit).toHaveBeenCalledWith("spider");
		});
	});

	describe("Display", () => {
		it("should display hero information correctly", () => {
			component.heroes = mockHeroes;
			fixture.detectChanges();

			const firstRow = fixture.nativeElement.querySelector("tbody tr");
			const cells = firstRow.querySelectorAll("td");

			expect(cells[0].textContent).toContain("Spiderman");
			expect(cells[1].textContent).toContain("Spider man");
			expect(cells[2].textContent).toContain("wall crawling");
			expect(cells[2].textContent).toContain("spider sense");
		});

		it("should display table headers correctly", () => {
			fixture.detectChanges();

			const headers = fixture.nativeElement.querySelectorAll("th");
			expect(headers[0].textContent).toContain("Name");
			expect(headers[1].textContent).toContain("Description");
			expect(headers[2].textContent).toContain("Powers");
			expect(headers[3].textContent).toContain("Actions");
		});
	});
});
