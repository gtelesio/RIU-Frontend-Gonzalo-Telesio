import { computed, Injectable, signal } from "@angular/core";
import type { SuperHero } from "@/domain/models/super-hero.model";

export interface HeroState {
	heroes: SuperHero[];
	loading: boolean;
	filter: string;
	selectedHero: SuperHero | null;
}

const initialState: HeroState = {
	heroes: [],
	loading: false,
	filter: "",
	selectedHero: null,
};

@Injectable({ providedIn: "root" })
export class HeroStateService {
	private state = signal<HeroState>(initialState);

	heroes = computed(() => this.state().heroes);
	loading = computed(() => this.state().loading);
	filter = computed(() => this.state().filter);
	selectedHero = computed(() => this.state().selectedHero);
	setHeroes(heroes: SuperHero[]) {
		this.updateState({ heroes });
	}

	setLoading(loading: boolean) {
		this.updateState({ loading });
	}

	setFilter(filter: string) {
		this.updateState({ filter });
	}

	setSelectedHero(hero: SuperHero | null) {
		this.updateState({ selectedHero: hero });
	}

	private updateState(partial: Partial<HeroState>) {
		this.state.update((current) => ({ ...current, ...partial }));
	}
}
