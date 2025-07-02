import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
	selector: "[appUppercase]",
	standalone: true,
})
export class UppercaseDirective {
	constructor(
		private el: ElementRef,
		private _control?: NgControl,
	) {}

	@HostListener("input", ["$event"])
	onInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const upper = input.value.toUpperCase();
		input.value = upper;
		this.el.nativeElement.value = upper;
		if (this._control?.control) {
			this._control.control.setValue(upper, { emitEvent: false });
		}
	}
}
