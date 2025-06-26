import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-loading-skeleton",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./loading-skeleton.component.html",
	styleUrls: ["./loading-skeleton.component.scss"],
})
export class LoadingSkeletonComponent {
	@Input() type: "table" | "form" = "table";
	@Input() rows = 5;
}
