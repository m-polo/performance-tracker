export default interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  update(id: number, item: T): Promise<T>;
  delete(id: number): Promise<void>;
  create(item: T): Promise<T>;
}
