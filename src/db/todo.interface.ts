export interface DBFields {
    readonly id: number
    readonly createdAt: Date
    readonly updatedAt: Date
}

export interface ITodo extends DBFields{
    description: string
    done: boolean
}

// Data types that directly iteract with the ORM
export namespace IORM {
    // data that comes from postgres+sequelize
    export type FromORM<T> = { dataValues: T }

    // data that needs to be passed to sequlize to create row.
    // removes rows that are defaults
    export type CreateORM<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

    // pass in any number of fields that can be modified.
    // this excludes several defaults
    export type UpdateORM<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
    export type UpdateORMWithID<T> = UpdateORM<T> & { id: number }

    // the shape of the response to updates is very odd.
    export type UpdateResponse<T> = [number, FromORM<T>[]]
}

// Return types coupled to reducers
export namespace ReducerTypes {
    // these are types used for gql reducer returns
    export type OneRecord<T> = { data?: T; error?: string }

    export type AllRecords<T> = { data?: T[]; error?: string }

    export type DeleteOne = { id?: number; error?: string }
}
