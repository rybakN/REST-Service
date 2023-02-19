import { EntityRepository } from '../interface/EntityRepository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractEntityRepository<
  Entity extends { id: string },
  CreateEntityDto,
  UpdateEntityDto,
> implements EntityRepository<Entity, CreateEntityDto, UpdateEntityDto>
{
  private entityRepo: Repository<Entity>;
  protected constructor(repository: Repository<Entity>) {
    this.entityRepo = repository;
  }
  public async getAll(): Promise<Entity[]> {
    return this.entityRepo.find();
  }

  public async getOne(id: string): Promise<Entity | null> {
    const option: FindOptionsWhere<Entity> = {
      id: id,
    } as FindOptionsWhere<Entity>;
    return this.entityRepo.findOneBy(option);
  }

  public async create(createEntityDto: CreateEntityDto): Promise<Entity> {
    const entity: any = {
      ...createEntityDto,
    };
    return this.entityRepo.save(entity);
  }

  public async update(
    id: string,
    updateEntityDto: UpdateEntityDto,
  ): Promise<Entity | null> {
    const entity: Entity | null = await this.getOne(id);
    if (!entity) return null;
    const _entity: QueryDeepPartialEntity<Entity> = {
      ...entity,
      ...updateEntityDto,
    } as QueryDeepPartialEntity<Entity>;
    const option: FindOptionsWhere<Entity> = {
      id: id,
    } as FindOptionsWhere<Entity>;
    await this.entityRepo.update(option, _entity);
    return _entity as Entity;
  }

  public async delete(id: string): Promise<void | null> {
    const entity: Entity | null = await this.getOne(id);
    if (!entity) return null;
    const option: FindOptionsWhere<Entity> = {
      id: id,
    } as FindOptionsWhere<Entity>;
    await this.entityRepo.delete(option);
    return;
  }
}
