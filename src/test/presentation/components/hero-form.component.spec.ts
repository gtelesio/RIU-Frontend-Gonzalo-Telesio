import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import type { SuperHero } from "@/domain/models/super-hero.model";
import { HeroFormComponent } from "@/presentation/components/hero-form/hero-form.component";

describe("HeroFormComponent", () => {
	let component: HeroFormComponent;
	let fixture: ComponentFixture<HeroFormComponent>;

	const mockHero: SuperHero = {
		id: "1",
		name: "Spiderman",
		description: "Spider man",
		powers: ["wall crawling", "spider sense"],
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeroFormComponent, ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeroFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	describe("Form Initialization", () => {
		it("should initialize form with empty values when no hero input", () => {
			expect(component.form.get("name")?.value).toBe("");
			expect(component.form.get("description")?.value).toBe("");
			expect(component.form.get("powers")?.value).toBe("");
		});

		it("should initialize form with hero values when hero input is provided", () => {
			component.hero = mockHero;
			component.ngOnChanges({
				hero: {
					currentValue: mockHero,
					previousValue: null,
					firstChange: true,
					isFirstChange: () => true,
				},
			});

			expect(component.form.get("name")?.value).toBe("Spiderman");
			expect(component.form.get("description")?.value).toBe("Spider man");
			expect(component.form.get("powers")?.value).toBe(
				"wall crawling, spider sense",
			);
		});
	});

	describe("Form Validation", () => {
		it("should be invalid when form is empty", () => {
			expect(component.form.valid).toBeFalsy();
		});

		it("should be invalid when name is less than 3 characters", () => {
			component.form.patchValue({
				name: "ab",
				description: "Test description",
				powers: "test power",
			});

			expect(component.form.get("name")?.valid).toBeFalsy();
			expect(component.form.valid).toBeFalsy();
		});

		it("should be valid when all fields are properly filled", () => {
			component.form.patchValue({
				name: "Batman",
				description: "Dark knight",
				powers: "intelligence, martial arts",
			});

			expect(component.form.valid).toBeTruthy();
		});

		it("should show validation errors for required fields", () => {
			const nameControl = component.form.get("name");
			nameControl?.markAsTouched();

			fixture.detectChanges();

			const errorElement = fixture.nativeElement.querySelector("small");
			expect(errorElement.textContent).toContain("Name is required");
		});
	});

	describe("Form Submission", () => {
		it("should emit save event with correct data when form is valid", () => {
			spyOn(component.save, "emit");

			component.form.patchValue({
				name: "Batman",
				description: "Dark knight",
				powers: "intelligence, martial arts",
			});

			component.onSubmit();

			expect(component.save.emit).toHaveBeenCalledWith({
				name: "Batman",
				description: "Dark knight",
				powers: ["intelligence", "martial arts"],
			});
		});

		it("should not emit save event when form is invalid", () => {
			spyOn(component.save, "emit");

			component.form.patchValue({
				name: "ab",
				description: "Test description",
				powers: "test power",
			});

			component.onSubmit();

			expect(component.save.emit).not.toHaveBeenCalled();
		});

		it("should emit cancel event when cancel button is clicked", () => {
			spyOn(component.cancel, "emit");

			const cancelButton = fixture.nativeElement.querySelector(
				'button[type="button"]',
			);
			cancelButton.click();

			expect(component.cancel.emit).toHaveBeenCalled();
		});
	});

	describe("Powers Processing", () => {
		it("should split powers string into array", () => {
			component.form.patchValue({
				name: "Test Hero",
				description: "Test description",
				powers: "power1, power2, power3",
			});
			spyOn(component.save, "emit");
			component.onSubmit();
			expect(component.save.emit).toHaveBeenCalledWith({
				name: "Test Hero",
				description: "Test description",
				powers: ["power1", "power2", "power3"],
			});
		});

		it("should trim whitespace from powers", () => {
			component.form.patchValue({
				name: "Test Hero",
				description: "Test description",
				powers: " power1 , power2 , power3 ",
			});
			spyOn(component.save, "emit");
			component.onSubmit();
			expect(component.save.emit).toHaveBeenCalledWith({
				name: "Test Hero",
				description: "Test description",
				powers: ["power1", "power2", "power3"],
			});
		});
	});
});
