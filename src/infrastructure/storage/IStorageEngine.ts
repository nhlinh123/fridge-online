export interface IStorageEngine {
  get<T>(store: string, id: string): Promise<T | null>;
  put<T>(store: string, item: T & { id: string }): Promise<void>;
  delete(store: string, id: string): Promise<void>;
  getAll<T>(store: string): Promise<T[]>;
  query<T>(store: string, predicate: (item: T) => boolean): Promise<T[]>;
}
