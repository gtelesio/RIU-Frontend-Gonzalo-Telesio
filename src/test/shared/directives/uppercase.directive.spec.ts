import { Component } from "@angular/core";
import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { UppercaseDirective } from "@/shared/directives/uppercase.directive";

@Component({
	template: '<input appUppercase [(ngModel)]="text" />',
	standalone: true,
	imports: [UppercaseDirective, FormsModule],
})
class TestComponent {
	text = "";
}

describe("UppercaseDirective", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should convert input text to uppercase", () => {
		fixture.detectChanges();

		const input = fixture.nativeElement.querySelector("input");
		input.value = "hello world";
		input.dispatchEvent(new Event("input"));

		expect(input.value).toBe("HELLO WORLD");
	});

	it("should convert mixed case text to uppercase", () => {
		fixture.detectChanges();

		const input = fixture.nativeElement.querySelector("input");
		input.value = "HeLLo WoRLd";
		input.dispatchEvent(new Event("input"));

		expect(input.value).toBe("HELLO WORLD");
	});

	it("should handle empty string", () => {
		fixture.detectChanges();

		const input = fixture.nativeElement.querySelector("input");
		input.value = "";
		input.dispatchEvent(new Event("input"));

		expect(input.value).toBe("");
	});

	it("should handle numbers and special characters", () => {
		fixture.detectChanges();

		const input = fixture.nativeElement.querySelector("input");
		input.value = "hero123!@#";
		input.dispatchEvent(new Event("input"));

		expect(input.value).toBe("HERO123!@#");
	});

	it("should convert text on each input event", () => {
		fixture.detectChanges();

		const input = fixture.nativeElement.querySelector("input");

		input.value = "first";
		input.dispatchEvent(new Event("input"));
		expect(input.value).toBe("FIRST");

		input.value = "second";
		input.dispatchEvent(new Event("input"));
		expect(input.value).toBe("SECOND");
	});
});
