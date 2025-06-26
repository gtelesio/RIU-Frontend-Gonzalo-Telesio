import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SuperHero } from '../../domain/models/super-hero.model';

export interface HeroState {
  heroes: SuperHero[];
  loading: boolean;
  filter: string;
  selectedHero: SuperHero | null;
}

const initialState: HeroState = {
  heroes: [],
  loading: false,
  filter: '',
  selectedHero: null
};

@Injectable({ providedIn: 'root' })
export class HeroStateService {
  private state$ = new BehaviorSubject<HeroState>(initialState);

  // Selectors
  get heroes$(): Observable<SuperHero[]> {
    return this.state$.pipe(map(state => state.heroes));
  }

  get loading$(): Observable<boolean> {
    return this.state$.pipe(map(state => state.loading));
  }

  get filter$(): Observable<string> {
    return this.state$.pipe(map(state => state.filter));
  }

  get selectedHero$(): Observable<SuperHero | null> {
    return this.state$.pipe(map(state => state.selectedHero));
  }

  // Actions
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
    this.state$.next({ ...this.state$.value, ...partial });
  }
}

// Helper function for map operator
function map<T, R>(project: (value: T) => R) {
  return (source: Observable<T>): Observable<R> => {
    return new Observable(subscriber => {
      source.subscribe({
        next: value => subscriber.next(project(value)),
        error: err => subscriber.error(err),
        complete: () => subscriber.complete()
      });
    });
  };
} 