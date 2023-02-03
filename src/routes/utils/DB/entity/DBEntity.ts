export abstract class DBEntity<
  Entity extends { id: string },
  CreateDTO,
  changeDTO,
> {
  protected entities: Entity[] = [];

  abstract create(createDTO: CreateDTO): Promise<Entity>;

  public async getAll(): Promise<Array<Entity>> {
    return this.entities;
  }

  public async getOne(id: string): Promise<Entity | null> {
    const entity: Entity | undefined = this.entities.find(
      (entity) => entity.id === id,
    );
    if (!entity) return null;
    return entity;
  }
  public async delete(id: string): Promise<Entity> {
    const idx: number = this.entities.findIndex((entity) => entity.id === id);
    const entity = this.entities[idx];
    this.entities.splice(idx, 1);
    return entity;
  }

  public async change(id: string, changeDTO: changeDTO): Promise<Entity> {
    const idx: number = this.entities.findIndex((entity) => entity.id === id);
    const entity: Entity = { ...this.entities[idx], ...changeDTO };
    this.entities.splice(idx, 1, entity);
    return entity;
  }
}
