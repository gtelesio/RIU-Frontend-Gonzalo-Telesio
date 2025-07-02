import { CommonModule } from "@angular/common";
import {
	Component,
	EventEmitter,
	Input,
	type OnInit,
	Output,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import {
	FormBuilder,
	type FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import type { SuperHero } from "@/domain/models/super-hero.model";
import { UppercaseDirective } from "@/shared/directives/uppercase.directive";

@Component({
	selector: "app-hero-form",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, UppercaseDirective],
	templateUrl: "./hero-form.component.html",
	styleUrls: ["./hero-form.component.scss"],
})
export class HeroFormComponent implements OnInit, OnChanges {
	@Input() hero: SuperHero | null = null;
	@Output() save = new EventEmitter<Omit<SuperHero, "id">>();
	@Output() cancel = new EventEmitter<void>();

	form!: FormGroup;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['hero'] && this.form) {
			this.form.patchValue({
				name: this.hero?.name || "",
				description: this.hero?.description || "",
				powers: this.hero?.powers?.join(", ") || "",
			});
		}
	}

	private initForm() {
		this.form = this.fb.group({
			name: [
				this.hero?.name || "",
				[Validators.required, Validators.minLength(3)],
			],
			description: [this.hero?.description || "", Validators.required],
			powers: [this.hero?.powers?.join(", ") || "", Validators.required],
		});
	}

	onSubmit() {
		if (this.form.valid) {
			const { name, description, powers } = this.form.value;
			this.save.emit({
				name,
				description,
				powers: powers.split(",").map((p: string) => p.trim()),
			});
		}
	}
}
