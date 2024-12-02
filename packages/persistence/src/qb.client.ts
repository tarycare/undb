import { drizzle } from "drizzle-orm/sql-js"
import { SqlJsDialect } from "kysely-wasm"
import InitSqlJs from "sql.js"
import { migrate } from "./migrate.client"
import { createQueryBuilderWithDialect } from "./qb.util"

export const createSqljsDatabase = async () => {
  const SQL = await InitSqlJs({
    locateFile: (file) => `/${file}`,
  })
  return new SQL.Database()
}

export const createDrizzleDatabase = async (db: InitSqlJs.Database) => {
  return drizzle(db)
}

export const createSqljsQueryBuilder = async (db?: InitSqlJs.Database) => {
  if (!db) {
    db = await createSqljsDatabase()
  }

  const dialect = new SqlJsDialect({
    async database() {
      return db
    },
    onWrite: {
      isThrottle: true,
    },
  })

  const drizzleDB = await createDrizzleDatabase(db)

  migrate(drizzleDB)

  return createQueryBuilderWithDialect(dialect)
}
