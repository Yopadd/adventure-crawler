import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export interface UnitOfWork {
  begin<T>(func: (unitOfWork: unknown) => Promise<T>): Promise<T>
}

export class UnitOfWorkLucid implements UnitOfWork {
  begin<T>(func: (unitOfWork: TransactionClientContract) => Promise<T>): Promise<T> {
    return db.transaction(func)
  }
}
