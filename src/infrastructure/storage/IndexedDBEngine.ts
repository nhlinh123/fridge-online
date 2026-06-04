import type { Table } from 'dexie';
import { db } from '../indexeddb/db';
import type { IStorageEngine } from './IStorageEngine';

type StoredItem = { id: string };

export class IndexedDBEngine implements IStorageEngine {
  private table<T extends StoredItem>(store: string): Table<T, string> {
    return db.table(store) as Table<T, string>;
  }

  async get<T>(store: string, id: string): Promise<T | null> {
    const item = await this.table<T & StoredItem>(store).get(id);
    return item ?? null;
  }

  async put<T>(store: string, item: T & StoredItem): Promise<void> {
    await this.table<T & StoredItem>(store).put(item);
  }

  async delete(store: string, id: string): Promise<void> {
    await this.table<StoredItem>(store).delete(id);
  }

  async getAll<T>(store: string): Promise<T[]> {
    return this.table<T & StoredItem>(store).toArray();
  }

  async query<T>(store: string, predicate: (item: T) => boolean): Promise<T[]> {
    const items = await this.getAll<T>(store);
    return items.filter(predicate);
  }
}
