export interface EntityRepository<Entity, CreateDto, UpdateDto> {
  getAll(): Promise<Entity[]>;
  getOne(id: string): Promise<Entity | null>;
  create(createDto: CreateDto): Promise<Entity>;
  update(id: string, updateDto: UpdateDto): Promise<Entity | null>;
  delete(id: string): Promise<void | null>;
  getFavorites(): Promise<Entity[]>;
}
