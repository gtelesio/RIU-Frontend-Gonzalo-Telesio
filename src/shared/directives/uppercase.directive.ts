import { Directive, ElementRef, HostListener, Optional } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
	selector: "[appUppercase]",
	standalone: true,
})
export class UppercaseDirective {
	constructor(private el: ElementRef, @Optional() private control: NgControl) {}

	@HostListener("input", ["$event"])
	onInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const upper = input.value.toUpperCase();
		input.value = upper;
		this.el.nativeElement.value = upper;
		if (this.control && this.control.control) {
			this.control.control.setValue(upper, { emitEvent: false });
		}
	}
}
