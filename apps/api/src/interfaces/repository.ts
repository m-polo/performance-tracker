export default interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  edit(id: number, item: T): Promise<T>;
  remove(id: number): Promise<void>;
  add(item: T): Promise<T>;
}
