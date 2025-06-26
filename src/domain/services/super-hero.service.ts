import type { Observable } from "rxjs";
import type { SuperHero } from "../models/super-hero.model";

export abstract class SuperHeroService {
	abstract create(hero: Omit<SuperHero, "id">): Observable<SuperHero>;
	abstract getAll(): Observable<SuperHero[]>;
	abstract getById(id: string): Observable<SuperHero | undefined>;
	abstract searchByName(name: string): Observable<SuperHero[]>;
	abstract update(hero: SuperHero): Observable<SuperHero>;
	abstract delete(id: string): Observable<void>;
}
