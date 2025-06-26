import { SuperHero } from '../../domain/models/super-hero.model';

export interface SuperHeroDTO {
  id: string;
  name: string;
  description: string;
  powers: string[];
}

export class SuperHeroMapper {
  static toDomain(dto: SuperHeroDTO): SuperHero {
    return { ...dto };
  }

  static toDTO(domain: SuperHero): SuperHeroDTO {
    return { ...domain };
  }
} 