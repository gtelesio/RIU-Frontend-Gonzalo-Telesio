import { CommonModule } from "@angular/common";
import {
	Component,
	EventEmitter,
	Input,
	type OnInit,
	Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import type { SuperHero } from "../../../domain/models/super-hero.model";
import { LoadingSkeletonComponent } from "../../../shared/components/loading-skeleton/loading-skeleton.component";

@Component({
	selector: "app-hero-list",
	standalone: true,
	imports: [CommonModule, FormsModule, LoadingSkeletonComponent],
	templateUrl: "./hero-list.component.html",
	styleUrls: ["./hero-list.component.scss"],
})
export class HeroListComponent implements OnInit {
	@Input() heroes: SuperHero[] = [];
	@Input() loading = false;
	@Output() add = new EventEmitter<void>();
	@Output() edit = new EventEmitter<SuperHero>();
	@Output() remove = new EventEmitter<SuperHero>();
	@Output() filter = new EventEmitter<string>();

	filterValue = "";

	ngOnInit(): void {}

	onAdd() {
		this.add.emit();
	}
	onEdit(hero: SuperHero) {
		this.edit.emit(hero);
	}
	onRemove(hero: SuperHero) {
		this.remove.emit(hero);
	}
	onFilterChange() {
		this.filter.emit(this.filterValue);
	}
}
