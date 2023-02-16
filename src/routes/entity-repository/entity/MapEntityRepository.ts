import { v4 as uuidV4 } from 'uuid';
import { EntityRepository } from '../interface/EntityRepository';
import { Repository } from 'typeorm';

export class MapEntityRepository<Entity, CreateEntityDto, UpdateEntityDto>
  implements EntityRepository<Entity, CreateEntityDto, UpdateEntityDto>
{
  protected entities: Map<string, Entity> = new Map();
  protected entityRepo: Repository<Entity>;
  constructor(repository: Repository<Entity>) {
    this.entityRepo = repository;
  }
  public async getAll(): Promise<Entity[]> {
    const entities: Entity[] = [];
    for (const key of this.entities.keys()) {
      entities.push(this.entities.get(key));
    }
    return this.entityRepo.find();
  }

  public async getOne(id: string): Promise<Entity> {
    const entity: Entity | null = this.entities.get(id);
    if (!entity) return null;
    return entity;
  }

  public async create(createEntityDto: CreateEntityDto): Promise<Entity> {
    const key: string = uuidV4();
    const entity: any = {
      ...createEntityDto,
      id: key,
    };
    this.entities.set(key, entity);
    return entity;
  }

  public async update(
    id: string,
    updateEntityDto: UpdateEntityDto,
  ): Promise<Entity | null> {
    let entity: Entity | null = await this.getOne(id);
    if (!entity) return null;
    entity = { ...entity, ...updateEntityDto };
    this.entities.set(id, entity);
    return entity;
  }

  public async delete(id: string): Promise<void | null> {
    const entity: Entity | null = await this.getOne(id);
    if (!entity) return null;
    this.entities.delete(id);
    return;
  }
}
