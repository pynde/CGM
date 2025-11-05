import SQLite from 'better-sqlite3'
import { DummyDriver, Kysely, SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely'
import { Database } from '@/kysely/schema'


export const db = new Kysely<Database>({
  dialect: {
    createDriver: () => new DummyDriver(),
    createQueryCompiler: () => new SqliteQueryCompiler(),
    createIntrospector: (db) => new SqliteIntrospector(db),
    createAdapter: () => new SqliteAdapter()
  }
})