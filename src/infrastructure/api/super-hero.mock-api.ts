import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SuperHero } from '../../domain/models/super-hero.model';
import { SuperHeroService } from '../../domain/services/super-hero.service';
import { map, delay } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class SuperHeroMockApiService extends SuperHeroService {
  private heroes$ = new BehaviorSubject<SuperHero[]>([{
    id: uuidv4(),
    name: 'Spiderman',
    description: 'Spider man',
    powers: ['wall crawling', 'spider sense']
  }, {
    id: uuidv4(),
    name: 'Superman',
    description: 'Man of steel',
    powers: ['fly', 'super strength']
  }]);

  create(hero: Omit<SuperHero, 'id'>): Observable<SuperHero> {
    const newHero = { ...hero, id: uuidv4() };
    this.heroes$.next([...this.heroes$.value, newHero]);
    return of(newHero).pipe(delay(500));
  }

  getAll(): Observable<SuperHero[]> {
    return this.heroes$.asObservable().pipe(delay(500));
  }

  getById(id: string): Observable<SuperHero | undefined> {
    return this.heroes$.pipe(map(list => list.find(h => h.id === id)), delay(500));
  }

  searchByName(name: string): Observable<SuperHero[]> {
    return this.heroes$.pipe(
      map(list => list.filter(h => h.name.toLowerCase().includes(name.toLowerCase()))),
      delay(500)
    );
  }

  update(hero: SuperHero): Observable<SuperHero> {
    const list = this.heroes$.value.map(h => h.id === hero.id ? hero : h);
    this.heroes$.next(list);
    return of(hero).pipe(delay(500));
  }

  delete(id: string): Observable<void> {
    this.heroes$.next(this.heroes$.value.filter(h => h.id !== id));
    return of(void 0).pipe(delay(500));
  }
} 