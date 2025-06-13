
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model bookings
 * 
 */
export type bookings = $Result.DefaultSelection<Prisma.$bookingsPayload>
/**
 * Model businesses
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type businesses = $Result.DefaultSelection<Prisma.$businessesPayload>
/**
 * Model employees
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type employees = $Result.DefaultSelection<Prisma.$employeesPayload>
/**
 * Model reviews
 * 
 */
export type reviews = $Result.DefaultSelection<Prisma.$reviewsPayload>
/**
 * Model services
 * 
 */
export type services = $Result.DefaultSelection<Prisma.$servicesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const users_role: {
  cliente: 'cliente',
  negocio: 'negocio',
  client: 'client',
  business_owner: 'business_owner'
};

export type users_role = (typeof users_role)[keyof typeof users_role]


export const bookings_status: {
  pendiente: 'pendiente',
  confirmada: 'confirmada',
  cancelada: 'cancelada',
  completada: 'completada',
  rechazada: 'rechazada'
};

export type bookings_status = (typeof bookings_status)[keyof typeof bookings_status]

}

export type users_role = $Enums.users_role

export const users_role: typeof $Enums.users_role

export type bookings_status = $Enums.bookings_status

export const bookings_status: typeof $Enums.bookings_status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bookings
 * const bookings = await prisma.bookings.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Bookings
   * const bookings = await prisma.bookings.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.bookings`: Exposes CRUD operations for the **bookings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.bookings.findMany()
    * ```
    */
  get bookings(): Prisma.bookingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.businesses`: Exposes CRUD operations for the **businesses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Businesses
    * const businesses = await prisma.businesses.findMany()
    * ```
    */
  get businesses(): Prisma.businessesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employees`: Exposes CRUD operations for the **employees** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employees.findMany()
    * ```
    */
  get employees(): Prisma.employeesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reviews`: Exposes CRUD operations for the **reviews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.reviews.findMany()
    * ```
    */
  get reviews(): Prisma.reviewsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.services`: Exposes CRUD operations for the **services** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.services.findMany()
    * ```
    */
  get services(): Prisma.servicesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    bookings: 'bookings',
    businesses: 'businesses',
    employees: 'employees',
    reviews: 'reviews',
    services: 'services',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bookings" | "businesses" | "employees" | "reviews" | "services" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      bookings: {
        payload: Prisma.$bookingsPayload<ExtArgs>
        fields: Prisma.bookingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bookingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bookingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          findFirst: {
            args: Prisma.bookingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bookingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          findMany: {
            args: Prisma.bookingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>[]
          }
          create: {
            args: Prisma.bookingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          createMany: {
            args: Prisma.bookingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.bookingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          update: {
            args: Prisma.bookingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          deleteMany: {
            args: Prisma.bookingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bookingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bookingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          aggregate: {
            args: Prisma.BookingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookings>
          }
          groupBy: {
            args: Prisma.bookingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bookingsCountArgs<ExtArgs>
            result: $Utils.Optional<BookingsCountAggregateOutputType> | number
          }
        }
      }
      businesses: {
        payload: Prisma.$businessesPayload<ExtArgs>
        fields: Prisma.businessesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.businessesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.businessesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload>
          }
          findFirst: {
            args: Prisma.businessesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.businessesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload>
          }
          findMany: {
            args: Prisma.businessesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload>[]
          }
          create: {
            args: Prisma.businessesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload>
          }
          createMany: {
            args: Prisma.businessesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.businessesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload>
          }
          update: {
            args: Prisma.businessesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload>
          }
          deleteMany: {
            args: Prisma.businessesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.businessesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.businessesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$businessesPayload>
          }
          aggregate: {
            args: Prisma.BusinessesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinesses>
          }
          groupBy: {
            args: Prisma.businessesGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessesGroupByOutputType>[]
          }
          count: {
            args: Prisma.businessesCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessesCountAggregateOutputType> | number
          }
        }
      }
      employees: {
        payload: Prisma.$employeesPayload<ExtArgs>
        fields: Prisma.employeesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.employeesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.employeesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          findFirst: {
            args: Prisma.employeesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.employeesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          findMany: {
            args: Prisma.employeesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>[]
          }
          create: {
            args: Prisma.employeesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          createMany: {
            args: Prisma.employeesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.employeesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          update: {
            args: Prisma.employeesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          deleteMany: {
            args: Prisma.employeesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.employeesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.employeesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$employeesPayload>
          }
          aggregate: {
            args: Prisma.EmployeesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployees>
          }
          groupBy: {
            args: Prisma.employeesGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeesGroupByOutputType>[]
          }
          count: {
            args: Prisma.employeesCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeesCountAggregateOutputType> | number
          }
        }
      }
      reviews: {
        payload: Prisma.$reviewsPayload<ExtArgs>
        fields: Prisma.reviewsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reviewsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reviewsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findFirst: {
            args: Prisma.reviewsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reviewsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findMany: {
            args: Prisma.reviewsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          create: {
            args: Prisma.reviewsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          createMany: {
            args: Prisma.reviewsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.reviewsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          update: {
            args: Prisma.reviewsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          deleteMany: {
            args: Prisma.reviewsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reviewsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.reviewsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          aggregate: {
            args: Prisma.ReviewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReviews>
          }
          groupBy: {
            args: Prisma.reviewsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.reviewsCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewsCountAggregateOutputType> | number
          }
        }
      }
      services: {
        payload: Prisma.$servicesPayload<ExtArgs>
        fields: Prisma.servicesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.servicesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.servicesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload>
          }
          findFirst: {
            args: Prisma.servicesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.servicesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload>
          }
          findMany: {
            args: Prisma.servicesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload>[]
          }
          create: {
            args: Prisma.servicesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload>
          }
          createMany: {
            args: Prisma.servicesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.servicesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload>
          }
          update: {
            args: Prisma.servicesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload>
          }
          deleteMany: {
            args: Prisma.servicesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.servicesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.servicesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicesPayload>
          }
          aggregate: {
            args: Prisma.ServicesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServices>
          }
          groupBy: {
            args: Prisma.servicesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServicesGroupByOutputType>[]
          }
          count: {
            args: Prisma.servicesCountArgs<ExtArgs>
            result: $Utils.Optional<ServicesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    bookings?: bookingsOmit
    businesses?: businessesOmit
    employees?: employeesOmit
    reviews?: reviewsOmit
    services?: servicesOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BusinessesCountOutputType
   */

  export type BusinessesCountOutputType = {
    bookings: number
    employees: number
    reviews: number
    services: number
  }

  export type BusinessesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | BusinessesCountOutputTypeCountBookingsArgs
    employees?: boolean | BusinessesCountOutputTypeCountEmployeesArgs
    reviews?: boolean | BusinessesCountOutputTypeCountReviewsArgs
    services?: boolean | BusinessesCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * BusinessesCountOutputType without action
   */
  export type BusinessesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessesCountOutputType
     */
    select?: BusinessesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BusinessesCountOutputType without action
   */
  export type BusinessesCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
  }

  /**
   * BusinessesCountOutputType without action
   */
  export type BusinessesCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeesWhereInput
  }

  /**
   * BusinessesCountOutputType without action
   */
  export type BusinessesCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }

  /**
   * BusinessesCountOutputType without action
   */
  export type BusinessesCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: servicesWhereInput
  }


  /**
   * Count Type EmployeesCountOutputType
   */

  export type EmployeesCountOutputType = {
    bookings: number
  }

  export type EmployeesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | EmployeesCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeesCountOutputType
     */
    select?: EmployeesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeesCountOutputType without action
   */
  export type EmployeesCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
  }


  /**
   * Count Type ServicesCountOutputType
   */

  export type ServicesCountOutputType = {
    bookings: number
  }

  export type ServicesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | ServicesCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * ServicesCountOutputType without action
   */
  export type ServicesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicesCountOutputType
     */
    select?: ServicesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServicesCountOutputType without action
   */
  export type ServicesCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    bookings: number
    businesses: number
    reviews: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UsersCountOutputTypeCountBookingsArgs
    businesses?: boolean | UsersCountOutputTypeCountBusinessesArgs
    reviews?: boolean | UsersCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBusinessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: businessesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model bookings
   */

  export type AggregateBookings = {
    _count: BookingsCountAggregateOutputType | null
    _avg: BookingsAvgAggregateOutputType | null
    _sum: BookingsSumAggregateOutputType | null
    _min: BookingsMinAggregateOutputType | null
    _max: BookingsMaxAggregateOutputType | null
  }

  export type BookingsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    business_id: number | null
    service_id: number | null
    employee_id: number | null
  }

  export type BookingsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    business_id: number | null
    service_id: number | null
    employee_id: number | null
  }

  export type BookingsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    business_id: number | null
    service_id: number | null
    employee_id: number | null
    booking_date: Date | null
    booking_time: Date | null
    status: $Enums.bookings_status | null
    notes: string | null
    created_at: Date | null
  }

  export type BookingsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    business_id: number | null
    service_id: number | null
    employee_id: number | null
    booking_date: Date | null
    booking_time: Date | null
    status: $Enums.bookings_status | null
    notes: string | null
    created_at: Date | null
  }

  export type BookingsCountAggregateOutputType = {
    id: number
    user_id: number
    business_id: number
    service_id: number
    employee_id: number
    booking_date: number
    booking_time: number
    status: number
    notes: number
    created_at: number
    _all: number
  }


  export type BookingsAvgAggregateInputType = {
    id?: true
    user_id?: true
    business_id?: true
    service_id?: true
    employee_id?: true
  }

  export type BookingsSumAggregateInputType = {
    id?: true
    user_id?: true
    business_id?: true
    service_id?: true
    employee_id?: true
  }

  export type BookingsMinAggregateInputType = {
    id?: true
    user_id?: true
    business_id?: true
    service_id?: true
    employee_id?: true
    booking_date?: true
    booking_time?: true
    status?: true
    notes?: true
    created_at?: true
  }

  export type BookingsMaxAggregateInputType = {
    id?: true
    user_id?: true
    business_id?: true
    service_id?: true
    employee_id?: true
    booking_date?: true
    booking_time?: true
    status?: true
    notes?: true
    created_at?: true
  }

  export type BookingsCountAggregateInputType = {
    id?: true
    user_id?: true
    business_id?: true
    service_id?: true
    employee_id?: true
    booking_date?: true
    booking_time?: true
    status?: true
    notes?: true
    created_at?: true
    _all?: true
  }

  export type BookingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookings to aggregate.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bookings
    **/
    _count?: true | BookingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingsMaxAggregateInputType
  }

  export type GetBookingsAggregateType<T extends BookingsAggregateArgs> = {
        [P in keyof T & keyof AggregateBookings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookings[P]>
      : GetScalarType<T[P], AggregateBookings[P]>
  }




  export type bookingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithAggregationInput | bookingsOrderByWithAggregationInput[]
    by: BookingsScalarFieldEnum[] | BookingsScalarFieldEnum
    having?: bookingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingsCountAggregateInputType | true
    _avg?: BookingsAvgAggregateInputType
    _sum?: BookingsSumAggregateInputType
    _min?: BookingsMinAggregateInputType
    _max?: BookingsMaxAggregateInputType
  }

  export type BookingsGroupByOutputType = {
    id: number
    user_id: number
    business_id: number
    service_id: number
    employee_id: number | null
    booking_date: Date
    booking_time: Date
    status: $Enums.bookings_status
    notes: string | null
    created_at: Date | null
    _count: BookingsCountAggregateOutputType | null
    _avg: BookingsAvgAggregateOutputType | null
    _sum: BookingsSumAggregateOutputType | null
    _min: BookingsMinAggregateOutputType | null
    _max: BookingsMaxAggregateOutputType | null
  }

  type GetBookingsGroupByPayload<T extends bookingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingsGroupByOutputType[P]>
            : GetScalarType<T[P], BookingsGroupByOutputType[P]>
        }
      >
    >


  export type bookingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    business_id?: boolean
    service_id?: boolean
    employee_id?: boolean
    booking_date?: boolean
    booking_time?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    employees?: boolean | bookings$employeesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    services?: boolean | servicesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookings"]>



  export type bookingsSelectScalar = {
    id?: boolean
    user_id?: boolean
    business_id?: boolean
    service_id?: boolean
    employee_id?: boolean
    booking_date?: boolean
    booking_time?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
  }

  export type bookingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "business_id" | "service_id" | "employee_id" | "booking_date" | "booking_time" | "status" | "notes" | "created_at", ExtArgs["result"]["bookings"]>
  export type bookingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | bookings$employeesArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    services?: boolean | servicesDefaultArgs<ExtArgs>
  }

  export type $bookingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bookings"
    objects: {
      employees: Prisma.$employeesPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs>
      businesses: Prisma.$businessesPayload<ExtArgs>
      services: Prisma.$servicesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      business_id: number
      service_id: number
      employee_id: number | null
      booking_date: Date
      booking_time: Date
      status: $Enums.bookings_status
      notes: string | null
      created_at: Date | null
    }, ExtArgs["result"]["bookings"]>
    composites: {}
  }

  type bookingsGetPayload<S extends boolean | null | undefined | bookingsDefaultArgs> = $Result.GetResult<Prisma.$bookingsPayload, S>

  type bookingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bookingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingsCountAggregateInputType | true
    }

  export interface bookingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bookings'], meta: { name: 'bookings' } }
    /**
     * Find zero or one Bookings that matches the filter.
     * @param {bookingsFindUniqueArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bookingsFindUniqueArgs>(args: SelectSubset<T, bookingsFindUniqueArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bookingsFindUniqueOrThrowArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bookingsFindUniqueOrThrowArgs>(args: SelectSubset<T, bookingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsFindFirstArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bookingsFindFirstArgs>(args?: SelectSubset<T, bookingsFindFirstArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsFindFirstOrThrowArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bookingsFindFirstOrThrowArgs>(args?: SelectSubset<T, bookingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.bookings.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.bookings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingsWithIdOnly = await prisma.bookings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bookingsFindManyArgs>(args?: SelectSubset<T, bookingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookings.
     * @param {bookingsCreateArgs} args - Arguments to create a Bookings.
     * @example
     * // Create one Bookings
     * const Bookings = await prisma.bookings.create({
     *   data: {
     *     // ... data to create a Bookings
     *   }
     * })
     * 
     */
    create<T extends bookingsCreateArgs>(args: SelectSubset<T, bookingsCreateArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {bookingsCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const bookings = await prisma.bookings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bookingsCreateManyArgs>(args?: SelectSubset<T, bookingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Bookings.
     * @param {bookingsDeleteArgs} args - Arguments to delete one Bookings.
     * @example
     * // Delete one Bookings
     * const Bookings = await prisma.bookings.delete({
     *   where: {
     *     // ... filter to delete one Bookings
     *   }
     * })
     * 
     */
    delete<T extends bookingsDeleteArgs>(args: SelectSubset<T, bookingsDeleteArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookings.
     * @param {bookingsUpdateArgs} args - Arguments to update one Bookings.
     * @example
     * // Update one Bookings
     * const bookings = await prisma.bookings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bookingsUpdateArgs>(args: SelectSubset<T, bookingsUpdateArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {bookingsDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.bookings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bookingsDeleteManyArgs>(args?: SelectSubset<T, bookingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const bookings = await prisma.bookings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bookingsUpdateManyArgs>(args: SelectSubset<T, bookingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bookings.
     * @param {bookingsUpsertArgs} args - Arguments to update or create a Bookings.
     * @example
     * // Update or create a Bookings
     * const bookings = await prisma.bookings.upsert({
     *   create: {
     *     // ... data to create a Bookings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookings we want to update
     *   }
     * })
     */
    upsert<T extends bookingsUpsertArgs>(args: SelectSubset<T, bookingsUpsertArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.bookings.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends bookingsCountArgs>(
      args?: Subset<T, bookingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingsAggregateArgs>(args: Subset<T, BookingsAggregateArgs>): Prisma.PrismaPromise<GetBookingsAggregateType<T>>

    /**
     * Group by Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bookingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bookingsGroupByArgs['orderBy'] }
        : { orderBy?: bookingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bookingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bookings model
   */
  readonly fields: bookingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bookings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bookingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employees<T extends bookings$employeesArgs<ExtArgs> = {}>(args?: Subset<T, bookings$employeesArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    businesses<T extends businessesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, businessesDefaultArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    services<T extends servicesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, servicesDefaultArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bookings model
   */
  interface bookingsFieldRefs {
    readonly id: FieldRef<"bookings", 'Int'>
    readonly user_id: FieldRef<"bookings", 'Int'>
    readonly business_id: FieldRef<"bookings", 'Int'>
    readonly service_id: FieldRef<"bookings", 'Int'>
    readonly employee_id: FieldRef<"bookings", 'Int'>
    readonly booking_date: FieldRef<"bookings", 'DateTime'>
    readonly booking_time: FieldRef<"bookings", 'DateTime'>
    readonly status: FieldRef<"bookings", 'bookings_status'>
    readonly notes: FieldRef<"bookings", 'String'>
    readonly created_at: FieldRef<"bookings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bookings findUnique
   */
  export type bookingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings findUniqueOrThrow
   */
  export type bookingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings findFirst
   */
  export type bookingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookings.
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookings.
     */
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * bookings findFirstOrThrow
   */
  export type bookingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookings.
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookings.
     */
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * bookings findMany
   */
  export type bookingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bookings.
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * bookings create
   */
  export type bookingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * The data needed to create a bookings.
     */
    data: XOR<bookingsCreateInput, bookingsUncheckedCreateInput>
  }

  /**
   * bookings createMany
   */
  export type bookingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bookings.
     */
    data: bookingsCreateManyInput | bookingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookings update
   */
  export type bookingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * The data needed to update a bookings.
     */
    data: XOR<bookingsUpdateInput, bookingsUncheckedUpdateInput>
    /**
     * Choose, which bookings to update.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings updateMany
   */
  export type bookingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bookings.
     */
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyInput>
    /**
     * Filter which bookings to update
     */
    where?: bookingsWhereInput
    /**
     * Limit how many bookings to update.
     */
    limit?: number
  }

  /**
   * bookings upsert
   */
  export type bookingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * The filter to search for the bookings to update in case it exists.
     */
    where: bookingsWhereUniqueInput
    /**
     * In case the bookings found by the `where` argument doesn't exist, create a new bookings with this data.
     */
    create: XOR<bookingsCreateInput, bookingsUncheckedCreateInput>
    /**
     * In case the bookings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bookingsUpdateInput, bookingsUncheckedUpdateInput>
  }

  /**
   * bookings delete
   */
  export type bookingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter which bookings to delete.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings deleteMany
   */
  export type bookingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookings to delete
     */
    where?: bookingsWhereInput
    /**
     * Limit how many bookings to delete.
     */
    limit?: number
  }

  /**
   * bookings.employees
   */
  export type bookings$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    where?: employeesWhereInput
  }

  /**
   * bookings without action
   */
  export type bookingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
  }


  /**
   * Model businesses
   */

  export type AggregateBusinesses = {
    _count: BusinessesCountAggregateOutputType | null
    _avg: BusinessesAvgAggregateOutputType | null
    _sum: BusinessesSumAggregateOutputType | null
    _min: BusinessesMinAggregateOutputType | null
    _max: BusinessesMaxAggregateOutputType | null
  }

  export type BusinessesAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type BusinessesSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type BusinessesMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    name: string | null
    address: string | null
    phone: string | null
    email: string | null
    description: string | null
    category: string | null
    image: string | null
    is_open: boolean | null
    created_at: Date | null
    opening_hours: string | null
    is_featured: boolean | null
  }

  export type BusinessesMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    name: string | null
    address: string | null
    phone: string | null
    email: string | null
    description: string | null
    category: string | null
    image: string | null
    is_open: boolean | null
    created_at: Date | null
    opening_hours: string | null
    is_featured: boolean | null
  }

  export type BusinessesCountAggregateOutputType = {
    id: number
    user_id: number
    name: number
    address: number
    phone: number
    email: number
    description: number
    category: number
    image: number
    is_open: number
    created_at: number
    opening_hours: number
    is_featured: number
    _all: number
  }


  export type BusinessesAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type BusinessesSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type BusinessesMinAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    description?: true
    category?: true
    image?: true
    is_open?: true
    created_at?: true
    opening_hours?: true
    is_featured?: true
  }

  export type BusinessesMaxAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    description?: true
    category?: true
    image?: true
    is_open?: true
    created_at?: true
    opening_hours?: true
    is_featured?: true
  }

  export type BusinessesCountAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    address?: true
    phone?: true
    email?: true
    description?: true
    category?: true
    image?: true
    is_open?: true
    created_at?: true
    opening_hours?: true
    is_featured?: true
    _all?: true
  }

  export type BusinessesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which businesses to aggregate.
     */
    where?: businessesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of businesses to fetch.
     */
    orderBy?: businessesOrderByWithRelationInput | businessesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: businessesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned businesses
    **/
    _count?: true | BusinessesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BusinessesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BusinessesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessesMaxAggregateInputType
  }

  export type GetBusinessesAggregateType<T extends BusinessesAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinesses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinesses[P]>
      : GetScalarType<T[P], AggregateBusinesses[P]>
  }




  export type businessesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: businessesWhereInput
    orderBy?: businessesOrderByWithAggregationInput | businessesOrderByWithAggregationInput[]
    by: BusinessesScalarFieldEnum[] | BusinessesScalarFieldEnum
    having?: businessesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessesCountAggregateInputType | true
    _avg?: BusinessesAvgAggregateInputType
    _sum?: BusinessesSumAggregateInputType
    _min?: BusinessesMinAggregateInputType
    _max?: BusinessesMaxAggregateInputType
  }

  export type BusinessesGroupByOutputType = {
    id: number
    user_id: number
    name: string
    address: string | null
    phone: string | null
    email: string
    description: string | null
    category: string | null
    image: string | null
    is_open: boolean | null
    created_at: Date | null
    opening_hours: string | null
    is_featured: boolean | null
    _count: BusinessesCountAggregateOutputType | null
    _avg: BusinessesAvgAggregateOutputType | null
    _sum: BusinessesSumAggregateOutputType | null
    _min: BusinessesMinAggregateOutputType | null
    _max: BusinessesMaxAggregateOutputType | null
  }

  type GetBusinessesGroupByPayload<T extends businessesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessesGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessesGroupByOutputType[P]>
        }
      >
    >


  export type businessesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    description?: boolean
    category?: boolean
    image?: boolean
    is_open?: boolean
    created_at?: boolean
    opening_hours?: boolean
    is_featured?: boolean
    bookings?: boolean | businesses$bookingsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    employees?: boolean | businesses$employeesArgs<ExtArgs>
    reviews?: boolean | businesses$reviewsArgs<ExtArgs>
    services?: boolean | businesses$servicesArgs<ExtArgs>
    _count?: boolean | BusinessesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businesses"]>



  export type businessesSelectScalar = {
    id?: boolean
    user_id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    email?: boolean
    description?: boolean
    category?: boolean
    image?: boolean
    is_open?: boolean
    created_at?: boolean
    opening_hours?: boolean
    is_featured?: boolean
  }

  export type businessesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "name" | "address" | "phone" | "email" | "description" | "category" | "image" | "is_open" | "created_at" | "opening_hours" | "is_featured", ExtArgs["result"]["businesses"]>
  export type businessesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | businesses$bookingsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    employees?: boolean | businesses$employeesArgs<ExtArgs>
    reviews?: boolean | businesses$reviewsArgs<ExtArgs>
    services?: boolean | businesses$servicesArgs<ExtArgs>
    _count?: boolean | BusinessesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $businessesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "businesses"
    objects: {
      bookings: Prisma.$bookingsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>
      employees: Prisma.$employeesPayload<ExtArgs>[]
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
      services: Prisma.$servicesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      name: string
      address: string | null
      phone: string | null
      email: string
      description: string | null
      category: string | null
      image: string | null
      is_open: boolean | null
      created_at: Date | null
      opening_hours: string | null
      is_featured: boolean | null
    }, ExtArgs["result"]["businesses"]>
    composites: {}
  }

  type businessesGetPayload<S extends boolean | null | undefined | businessesDefaultArgs> = $Result.GetResult<Prisma.$businessesPayload, S>

  type businessesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<businessesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessesCountAggregateInputType | true
    }

  export interface businessesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['businesses'], meta: { name: 'businesses' } }
    /**
     * Find zero or one Businesses that matches the filter.
     * @param {businessesFindUniqueArgs} args - Arguments to find a Businesses
     * @example
     * // Get one Businesses
     * const businesses = await prisma.businesses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends businessesFindUniqueArgs>(args: SelectSubset<T, businessesFindUniqueArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Businesses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {businessesFindUniqueOrThrowArgs} args - Arguments to find a Businesses
     * @example
     * // Get one Businesses
     * const businesses = await prisma.businesses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends businessesFindUniqueOrThrowArgs>(args: SelectSubset<T, businessesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Businesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {businessesFindFirstArgs} args - Arguments to find a Businesses
     * @example
     * // Get one Businesses
     * const businesses = await prisma.businesses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends businessesFindFirstArgs>(args?: SelectSubset<T, businessesFindFirstArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Businesses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {businessesFindFirstOrThrowArgs} args - Arguments to find a Businesses
     * @example
     * // Get one Businesses
     * const businesses = await prisma.businesses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends businessesFindFirstOrThrowArgs>(args?: SelectSubset<T, businessesFindFirstOrThrowArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Businesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {businessesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Businesses
     * const businesses = await prisma.businesses.findMany()
     * 
     * // Get first 10 Businesses
     * const businesses = await prisma.businesses.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessesWithIdOnly = await prisma.businesses.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends businessesFindManyArgs>(args?: SelectSubset<T, businessesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Businesses.
     * @param {businessesCreateArgs} args - Arguments to create a Businesses.
     * @example
     * // Create one Businesses
     * const Businesses = await prisma.businesses.create({
     *   data: {
     *     // ... data to create a Businesses
     *   }
     * })
     * 
     */
    create<T extends businessesCreateArgs>(args: SelectSubset<T, businessesCreateArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Businesses.
     * @param {businessesCreateManyArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const businesses = await prisma.businesses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends businessesCreateManyArgs>(args?: SelectSubset<T, businessesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Businesses.
     * @param {businessesDeleteArgs} args - Arguments to delete one Businesses.
     * @example
     * // Delete one Businesses
     * const Businesses = await prisma.businesses.delete({
     *   where: {
     *     // ... filter to delete one Businesses
     *   }
     * })
     * 
     */
    delete<T extends businessesDeleteArgs>(args: SelectSubset<T, businessesDeleteArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Businesses.
     * @param {businessesUpdateArgs} args - Arguments to update one Businesses.
     * @example
     * // Update one Businesses
     * const businesses = await prisma.businesses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends businessesUpdateArgs>(args: SelectSubset<T, businessesUpdateArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Businesses.
     * @param {businessesDeleteManyArgs} args - Arguments to filter Businesses to delete.
     * @example
     * // Delete a few Businesses
     * const { count } = await prisma.businesses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends businessesDeleteManyArgs>(args?: SelectSubset<T, businessesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {businessesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Businesses
     * const businesses = await prisma.businesses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends businessesUpdateManyArgs>(args: SelectSubset<T, businessesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Businesses.
     * @param {businessesUpsertArgs} args - Arguments to update or create a Businesses.
     * @example
     * // Update or create a Businesses
     * const businesses = await prisma.businesses.upsert({
     *   create: {
     *     // ... data to create a Businesses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Businesses we want to update
     *   }
     * })
     */
    upsert<T extends businessesUpsertArgs>(args: SelectSubset<T, businessesUpsertArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {businessesCountArgs} args - Arguments to filter Businesses to count.
     * @example
     * // Count the number of Businesses
     * const count = await prisma.businesses.count({
     *   where: {
     *     // ... the filter for the Businesses we want to count
     *   }
     * })
    **/
    count<T extends businessesCountArgs>(
      args?: Subset<T, businessesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessesAggregateArgs>(args: Subset<T, BusinessesAggregateArgs>): Prisma.PrismaPromise<GetBusinessesAggregateType<T>>

    /**
     * Group by Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {businessesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends businessesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: businessesGroupByArgs['orderBy'] }
        : { orderBy?: businessesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, businessesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the businesses model
   */
  readonly fields: businessesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for businesses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__businessesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends businesses$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, businesses$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    employees<T extends businesses$employeesArgs<ExtArgs> = {}>(args?: Subset<T, businesses$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends businesses$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, businesses$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends businesses$servicesArgs<ExtArgs> = {}>(args?: Subset<T, businesses$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the businesses model
   */
  interface businessesFieldRefs {
    readonly id: FieldRef<"businesses", 'Int'>
    readonly user_id: FieldRef<"businesses", 'Int'>
    readonly name: FieldRef<"businesses", 'String'>
    readonly address: FieldRef<"businesses", 'String'>
    readonly phone: FieldRef<"businesses", 'String'>
    readonly email: FieldRef<"businesses", 'String'>
    readonly description: FieldRef<"businesses", 'String'>
    readonly category: FieldRef<"businesses", 'String'>
    readonly image: FieldRef<"businesses", 'String'>
    readonly is_open: FieldRef<"businesses", 'Boolean'>
    readonly created_at: FieldRef<"businesses", 'DateTime'>
    readonly opening_hours: FieldRef<"businesses", 'String'>
    readonly is_featured: FieldRef<"businesses", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * businesses findUnique
   */
  export type businessesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * Filter, which businesses to fetch.
     */
    where: businessesWhereUniqueInput
  }

  /**
   * businesses findUniqueOrThrow
   */
  export type businessesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * Filter, which businesses to fetch.
     */
    where: businessesWhereUniqueInput
  }

  /**
   * businesses findFirst
   */
  export type businessesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * Filter, which businesses to fetch.
     */
    where?: businessesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of businesses to fetch.
     */
    orderBy?: businessesOrderByWithRelationInput | businessesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for businesses.
     */
    cursor?: businessesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of businesses.
     */
    distinct?: BusinessesScalarFieldEnum | BusinessesScalarFieldEnum[]
  }

  /**
   * businesses findFirstOrThrow
   */
  export type businessesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * Filter, which businesses to fetch.
     */
    where?: businessesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of businesses to fetch.
     */
    orderBy?: businessesOrderByWithRelationInput | businessesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for businesses.
     */
    cursor?: businessesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of businesses.
     */
    distinct?: BusinessesScalarFieldEnum | BusinessesScalarFieldEnum[]
  }

  /**
   * businesses findMany
   */
  export type businessesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * Filter, which businesses to fetch.
     */
    where?: businessesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of businesses to fetch.
     */
    orderBy?: businessesOrderByWithRelationInput | businessesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing businesses.
     */
    cursor?: businessesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` businesses.
     */
    skip?: number
    distinct?: BusinessesScalarFieldEnum | BusinessesScalarFieldEnum[]
  }

  /**
   * businesses create
   */
  export type businessesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * The data needed to create a businesses.
     */
    data: XOR<businessesCreateInput, businessesUncheckedCreateInput>
  }

  /**
   * businesses createMany
   */
  export type businessesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many businesses.
     */
    data: businessesCreateManyInput | businessesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * businesses update
   */
  export type businessesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * The data needed to update a businesses.
     */
    data: XOR<businessesUpdateInput, businessesUncheckedUpdateInput>
    /**
     * Choose, which businesses to update.
     */
    where: businessesWhereUniqueInput
  }

  /**
   * businesses updateMany
   */
  export type businessesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update businesses.
     */
    data: XOR<businessesUpdateManyMutationInput, businessesUncheckedUpdateManyInput>
    /**
     * Filter which businesses to update
     */
    where?: businessesWhereInput
    /**
     * Limit how many businesses to update.
     */
    limit?: number
  }

  /**
   * businesses upsert
   */
  export type businessesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * The filter to search for the businesses to update in case it exists.
     */
    where: businessesWhereUniqueInput
    /**
     * In case the businesses found by the `where` argument doesn't exist, create a new businesses with this data.
     */
    create: XOR<businessesCreateInput, businessesUncheckedCreateInput>
    /**
     * In case the businesses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<businessesUpdateInput, businessesUncheckedUpdateInput>
  }

  /**
   * businesses delete
   */
  export type businessesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    /**
     * Filter which businesses to delete.
     */
    where: businessesWhereUniqueInput
  }

  /**
   * businesses deleteMany
   */
  export type businessesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which businesses to delete
     */
    where?: businessesWhereInput
    /**
     * Limit how many businesses to delete.
     */
    limit?: number
  }

  /**
   * businesses.bookings
   */
  export type businesses$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    cursor?: bookingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * businesses.employees
   */
  export type businesses$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    where?: employeesWhereInput
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    cursor?: employeesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }

  /**
   * businesses.reviews
   */
  export type businesses$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * businesses.services
   */
  export type businesses$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    where?: servicesWhereInput
    orderBy?: servicesOrderByWithRelationInput | servicesOrderByWithRelationInput[]
    cursor?: servicesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServicesScalarFieldEnum | ServicesScalarFieldEnum[]
  }

  /**
   * businesses without action
   */
  export type businessesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
  }


  /**
   * Model employees
   */

  export type AggregateEmployees = {
    _count: EmployeesCountAggregateOutputType | null
    _avg: EmployeesAvgAggregateOutputType | null
    _sum: EmployeesSumAggregateOutputType | null
    _min: EmployeesMinAggregateOutputType | null
    _max: EmployeesMaxAggregateOutputType | null
  }

  export type EmployeesAvgAggregateOutputType = {
    id: number | null
    business_id: number | null
  }

  export type EmployeesSumAggregateOutputType = {
    id: number | null
    business_id: number | null
  }

  export type EmployeesMinAggregateOutputType = {
    id: number | null
    business_id: number | null
    name: string | null
    position: string | null
    specialties: string | null
    profile_image: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployeesMaxAggregateOutputType = {
    id: number | null
    business_id: number | null
    name: string | null
    position: string | null
    specialties: string | null
    profile_image: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EmployeesCountAggregateOutputType = {
    id: number
    business_id: number
    name: number
    position: number
    specialties: number
    profile_image: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EmployeesAvgAggregateInputType = {
    id?: true
    business_id?: true
  }

  export type EmployeesSumAggregateInputType = {
    id?: true
    business_id?: true
  }

  export type EmployeesMinAggregateInputType = {
    id?: true
    business_id?: true
    name?: true
    position?: true
    specialties?: true
    profile_image?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployeesMaxAggregateInputType = {
    id?: true
    business_id?: true
    name?: true
    position?: true
    specialties?: true
    profile_image?: true
    created_at?: true
    updated_at?: true
  }

  export type EmployeesCountAggregateInputType = {
    id?: true
    business_id?: true
    name?: true
    position?: true
    specialties?: true
    profile_image?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EmployeesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employees to aggregate.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned employees
    **/
    _count?: true | EmployeesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeesMaxAggregateInputType
  }

  export type GetEmployeesAggregateType<T extends EmployeesAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployees]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployees[P]>
      : GetScalarType<T[P], AggregateEmployees[P]>
  }




  export type employeesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: employeesWhereInput
    orderBy?: employeesOrderByWithAggregationInput | employeesOrderByWithAggregationInput[]
    by: EmployeesScalarFieldEnum[] | EmployeesScalarFieldEnum
    having?: employeesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeesCountAggregateInputType | true
    _avg?: EmployeesAvgAggregateInputType
    _sum?: EmployeesSumAggregateInputType
    _min?: EmployeesMinAggregateInputType
    _max?: EmployeesMaxAggregateInputType
  }

  export type EmployeesGroupByOutputType = {
    id: number
    business_id: number
    name: string
    position: string | null
    specialties: string | null
    profile_image: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: EmployeesCountAggregateOutputType | null
    _avg: EmployeesAvgAggregateOutputType | null
    _sum: EmployeesSumAggregateOutputType | null
    _min: EmployeesMinAggregateOutputType | null
    _max: EmployeesMaxAggregateOutputType | null
  }

  type GetEmployeesGroupByPayload<T extends employeesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeesGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeesGroupByOutputType[P]>
        }
      >
    >


  export type employeesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    business_id?: boolean
    name?: boolean
    position?: boolean
    specialties?: boolean
    profile_image?: boolean
    created_at?: boolean
    updated_at?: boolean
    bookings?: boolean | employees$bookingsArgs<ExtArgs>
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    _count?: boolean | EmployeesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employees"]>



  export type employeesSelectScalar = {
    id?: boolean
    business_id?: boolean
    name?: boolean
    position?: boolean
    specialties?: boolean
    profile_image?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type employeesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "business_id" | "name" | "position" | "specialties" | "profile_image" | "created_at" | "updated_at", ExtArgs["result"]["employees"]>
  export type employeesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | employees$bookingsArgs<ExtArgs>
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    _count?: boolean | EmployeesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $employeesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "employees"
    objects: {
      bookings: Prisma.$bookingsPayload<ExtArgs>[]
      businesses: Prisma.$businessesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      business_id: number
      name: string
      position: string | null
      specialties: string | null
      profile_image: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["employees"]>
    composites: {}
  }

  type employeesGetPayload<S extends boolean | null | undefined | employeesDefaultArgs> = $Result.GetResult<Prisma.$employeesPayload, S>

  type employeesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<employeesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeesCountAggregateInputType | true
    }

  export interface employeesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['employees'], meta: { name: 'employees' } }
    /**
     * Find zero or one Employees that matches the filter.
     * @param {employeesFindUniqueArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends employeesFindUniqueArgs>(args: SelectSubset<T, employeesFindUniqueArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employees that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {employeesFindUniqueOrThrowArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends employeesFindUniqueOrThrowArgs>(args: SelectSubset<T, employeesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindFirstArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends employeesFindFirstArgs>(args?: SelectSubset<T, employeesFindFirstArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employees that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindFirstOrThrowArgs} args - Arguments to find a Employees
     * @example
     * // Get one Employees
     * const employees = await prisma.employees.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends employeesFindFirstOrThrowArgs>(args?: SelectSubset<T, employeesFindFirstOrThrowArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employees.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employees.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeesWithIdOnly = await prisma.employees.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends employeesFindManyArgs>(args?: SelectSubset<T, employeesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employees.
     * @param {employeesCreateArgs} args - Arguments to create a Employees.
     * @example
     * // Create one Employees
     * const Employees = await prisma.employees.create({
     *   data: {
     *     // ... data to create a Employees
     *   }
     * })
     * 
     */
    create<T extends employeesCreateArgs>(args: SelectSubset<T, employeesCreateArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {employeesCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employees = await prisma.employees.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends employeesCreateManyArgs>(args?: SelectSubset<T, employeesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Employees.
     * @param {employeesDeleteArgs} args - Arguments to delete one Employees.
     * @example
     * // Delete one Employees
     * const Employees = await prisma.employees.delete({
     *   where: {
     *     // ... filter to delete one Employees
     *   }
     * })
     * 
     */
    delete<T extends employeesDeleteArgs>(args: SelectSubset<T, employeesDeleteArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employees.
     * @param {employeesUpdateArgs} args - Arguments to update one Employees.
     * @example
     * // Update one Employees
     * const employees = await prisma.employees.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends employeesUpdateArgs>(args: SelectSubset<T, employeesUpdateArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {employeesDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employees.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends employeesDeleteManyArgs>(args?: SelectSubset<T, employeesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employees = await prisma.employees.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends employeesUpdateManyArgs>(args: SelectSubset<T, employeesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employees.
     * @param {employeesUpsertArgs} args - Arguments to update or create a Employees.
     * @example
     * // Update or create a Employees
     * const employees = await prisma.employees.upsert({
     *   create: {
     *     // ... data to create a Employees
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employees we want to update
     *   }
     * })
     */
    upsert<T extends employeesUpsertArgs>(args: SelectSubset<T, employeesUpsertArgs<ExtArgs>>): Prisma__employeesClient<$Result.GetResult<Prisma.$employeesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employees.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends employeesCountArgs>(
      args?: Subset<T, employeesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeesAggregateArgs>(args: Subset<T, EmployeesAggregateArgs>): Prisma.PrismaPromise<GetEmployeesAggregateType<T>>

    /**
     * Group by Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {employeesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends employeesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: employeesGroupByArgs['orderBy'] }
        : { orderBy?: employeesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, employeesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the employees model
   */
  readonly fields: employeesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for employees.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__employeesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends employees$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, employees$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businesses<T extends businessesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, businessesDefaultArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the employees model
   */
  interface employeesFieldRefs {
    readonly id: FieldRef<"employees", 'Int'>
    readonly business_id: FieldRef<"employees", 'Int'>
    readonly name: FieldRef<"employees", 'String'>
    readonly position: FieldRef<"employees", 'String'>
    readonly specialties: FieldRef<"employees", 'String'>
    readonly profile_image: FieldRef<"employees", 'String'>
    readonly created_at: FieldRef<"employees", 'DateTime'>
    readonly updated_at: FieldRef<"employees", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * employees findUnique
   */
  export type employeesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees findUniqueOrThrow
   */
  export type employeesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees findFirst
   */
  export type employeesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }

  /**
   * employees findFirstOrThrow
   */
  export type employeesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of employees.
     */
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }

  /**
   * employees findMany
   */
  export type employeesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter, which employees to fetch.
     */
    where?: employeesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of employees to fetch.
     */
    orderBy?: employeesOrderByWithRelationInput | employeesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing employees.
     */
    cursor?: employeesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` employees.
     */
    skip?: number
    distinct?: EmployeesScalarFieldEnum | EmployeesScalarFieldEnum[]
  }

  /**
   * employees create
   */
  export type employeesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The data needed to create a employees.
     */
    data: XOR<employeesCreateInput, employeesUncheckedCreateInput>
  }

  /**
   * employees createMany
   */
  export type employeesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many employees.
     */
    data: employeesCreateManyInput | employeesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * employees update
   */
  export type employeesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The data needed to update a employees.
     */
    data: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
    /**
     * Choose, which employees to update.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees updateMany
   */
  export type employeesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update employees.
     */
    data: XOR<employeesUpdateManyMutationInput, employeesUncheckedUpdateManyInput>
    /**
     * Filter which employees to update
     */
    where?: employeesWhereInput
    /**
     * Limit how many employees to update.
     */
    limit?: number
  }

  /**
   * employees upsert
   */
  export type employeesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * The filter to search for the employees to update in case it exists.
     */
    where: employeesWhereUniqueInput
    /**
     * In case the employees found by the `where` argument doesn't exist, create a new employees with this data.
     */
    create: XOR<employeesCreateInput, employeesUncheckedCreateInput>
    /**
     * In case the employees was found with the provided `where` argument, update it with this data.
     */
    update: XOR<employeesUpdateInput, employeesUncheckedUpdateInput>
  }

  /**
   * employees delete
   */
  export type employeesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
    /**
     * Filter which employees to delete.
     */
    where: employeesWhereUniqueInput
  }

  /**
   * employees deleteMany
   */
  export type employeesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which employees to delete
     */
    where?: employeesWhereInput
    /**
     * Limit how many employees to delete.
     */
    limit?: number
  }

  /**
   * employees.bookings
   */
  export type employees$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    cursor?: bookingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * employees without action
   */
  export type employeesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the employees
     */
    select?: employeesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the employees
     */
    omit?: employeesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: employeesInclude<ExtArgs> | null
  }


  /**
   * Model reviews
   */

  export type AggregateReviews = {
    _count: ReviewsCountAggregateOutputType | null
    _avg: ReviewsAvgAggregateOutputType | null
    _sum: ReviewsSumAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  export type ReviewsAvgAggregateOutputType = {
    id: number | null
    business_id: number | null
    user_id: number | null
    rating: Decimal | null
  }

  export type ReviewsSumAggregateOutputType = {
    id: number | null
    business_id: number | null
    user_id: number | null
    rating: Decimal | null
  }

  export type ReviewsMinAggregateOutputType = {
    id: number | null
    business_id: number | null
    user_id: number | null
    rating: Decimal | null
    comment: string | null
    created_at: Date | null
  }

  export type ReviewsMaxAggregateOutputType = {
    id: number | null
    business_id: number | null
    user_id: number | null
    rating: Decimal | null
    comment: string | null
    created_at: Date | null
  }

  export type ReviewsCountAggregateOutputType = {
    id: number
    business_id: number
    user_id: number
    rating: number
    comment: number
    created_at: number
    _all: number
  }


  export type ReviewsAvgAggregateInputType = {
    id?: true
    business_id?: true
    user_id?: true
    rating?: true
  }

  export type ReviewsSumAggregateInputType = {
    id?: true
    business_id?: true
    user_id?: true
    rating?: true
  }

  export type ReviewsMinAggregateInputType = {
    id?: true
    business_id?: true
    user_id?: true
    rating?: true
    comment?: true
    created_at?: true
  }

  export type ReviewsMaxAggregateInputType = {
    id?: true
    business_id?: true
    user_id?: true
    rating?: true
    comment?: true
    created_at?: true
  }

  export type ReviewsCountAggregateInputType = {
    id?: true
    business_id?: true
    user_id?: true
    rating?: true
    comment?: true
    created_at?: true
    _all?: true
  }

  export type ReviewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to aggregate.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reviews
    **/
    _count?: true | ReviewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewsMaxAggregateInputType
  }

  export type GetReviewsAggregateType<T extends ReviewsAggregateArgs> = {
        [P in keyof T & keyof AggregateReviews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviews[P]>
      : GetScalarType<T[P], AggregateReviews[P]>
  }




  export type reviewsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithAggregationInput | reviewsOrderByWithAggregationInput[]
    by: ReviewsScalarFieldEnum[] | ReviewsScalarFieldEnum
    having?: reviewsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewsCountAggregateInputType | true
    _avg?: ReviewsAvgAggregateInputType
    _sum?: ReviewsSumAggregateInputType
    _min?: ReviewsMinAggregateInputType
    _max?: ReviewsMaxAggregateInputType
  }

  export type ReviewsGroupByOutputType = {
    id: number
    business_id: number
    user_id: number
    rating: Decimal
    comment: string | null
    created_at: Date | null
    _count: ReviewsCountAggregateOutputType | null
    _avg: ReviewsAvgAggregateOutputType | null
    _sum: ReviewsSumAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  type GetReviewsGroupByPayload<T extends reviewsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
        }
      >
    >


  export type reviewsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    business_id?: boolean
    user_id?: boolean
    rating?: boolean
    comment?: boolean
    created_at?: boolean
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>



  export type reviewsSelectScalar = {
    id?: boolean
    business_id?: boolean
    user_id?: boolean
    rating?: boolean
    comment?: boolean
    created_at?: boolean
  }

  export type reviewsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "business_id" | "user_id" | "rating" | "comment" | "created_at", ExtArgs["result"]["reviews"]>
  export type reviewsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $reviewsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "reviews"
    objects: {
      businesses: Prisma.$businessesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      business_id: number
      user_id: number
      rating: Prisma.Decimal
      comment: string | null
      created_at: Date | null
    }, ExtArgs["result"]["reviews"]>
    composites: {}
  }

  type reviewsGetPayload<S extends boolean | null | undefined | reviewsDefaultArgs> = $Result.GetResult<Prisma.$reviewsPayload, S>

  type reviewsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reviewsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewsCountAggregateInputType | true
    }

  export interface reviewsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['reviews'], meta: { name: 'reviews' } }
    /**
     * Find zero or one Reviews that matches the filter.
     * @param {reviewsFindUniqueArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reviewsFindUniqueArgs>(args: SelectSubset<T, reviewsFindUniqueArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reviews that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reviewsFindUniqueOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reviewsFindUniqueOrThrowArgs>(args: SelectSubset<T, reviewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reviewsFindFirstArgs>(args?: SelectSubset<T, reviewsFindFirstArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reviews that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reviewsFindFirstOrThrowArgs>(args?: SelectSubset<T, reviewsFindFirstOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.reviews.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.reviews.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewsWithIdOnly = await prisma.reviews.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends reviewsFindManyArgs>(args?: SelectSubset<T, reviewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reviews.
     * @param {reviewsCreateArgs} args - Arguments to create a Reviews.
     * @example
     * // Create one Reviews
     * const Reviews = await prisma.reviews.create({
     *   data: {
     *     // ... data to create a Reviews
     *   }
     * })
     * 
     */
    create<T extends reviewsCreateArgs>(args: SelectSubset<T, reviewsCreateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {reviewsCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const reviews = await prisma.reviews.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reviewsCreateManyArgs>(args?: SelectSubset<T, reviewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Reviews.
     * @param {reviewsDeleteArgs} args - Arguments to delete one Reviews.
     * @example
     * // Delete one Reviews
     * const Reviews = await prisma.reviews.delete({
     *   where: {
     *     // ... filter to delete one Reviews
     *   }
     * })
     * 
     */
    delete<T extends reviewsDeleteArgs>(args: SelectSubset<T, reviewsDeleteArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reviews.
     * @param {reviewsUpdateArgs} args - Arguments to update one Reviews.
     * @example
     * // Update one Reviews
     * const reviews = await prisma.reviews.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reviewsUpdateArgs>(args: SelectSubset<T, reviewsUpdateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {reviewsDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.reviews.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reviewsDeleteManyArgs>(args?: SelectSubset<T, reviewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const reviews = await prisma.reviews.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reviewsUpdateManyArgs>(args: SelectSubset<T, reviewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Reviews.
     * @param {reviewsUpsertArgs} args - Arguments to update or create a Reviews.
     * @example
     * // Update or create a Reviews
     * const reviews = await prisma.reviews.upsert({
     *   create: {
     *     // ... data to create a Reviews
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reviews we want to update
     *   }
     * })
     */
    upsert<T extends reviewsUpsertArgs>(args: SelectSubset<T, reviewsUpsertArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.reviews.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends reviewsCountArgs>(
      args?: Subset<T, reviewsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewsAggregateArgs>(args: Subset<T, ReviewsAggregateArgs>): Prisma.PrismaPromise<GetReviewsAggregateType<T>>

    /**
     * Group by Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends reviewsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reviewsGroupByArgs['orderBy'] }
        : { orderBy?: reviewsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, reviewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the reviews model
   */
  readonly fields: reviewsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for reviews.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reviewsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    businesses<T extends businessesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, businessesDefaultArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the reviews model
   */
  interface reviewsFieldRefs {
    readonly id: FieldRef<"reviews", 'Int'>
    readonly business_id: FieldRef<"reviews", 'Int'>
    readonly user_id: FieldRef<"reviews", 'Int'>
    readonly rating: FieldRef<"reviews", 'Decimal'>
    readonly comment: FieldRef<"reviews", 'String'>
    readonly created_at: FieldRef<"reviews", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * reviews findUnique
   */
  export type reviewsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findUniqueOrThrow
   */
  export type reviewsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findFirst
   */
  export type reviewsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findFirstOrThrow
   */
  export type reviewsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findMany
   */
  export type reviewsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews create
   */
  export type reviewsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to create a reviews.
     */
    data: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
  }

  /**
   * reviews createMany
   */
  export type reviewsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reviews.
     */
    data: reviewsCreateManyInput | reviewsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * reviews update
   */
  export type reviewsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to update a reviews.
     */
    data: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
    /**
     * Choose, which reviews to update.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews updateMany
   */
  export type reviewsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
  }

  /**
   * reviews upsert
   */
  export type reviewsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The filter to search for the reviews to update in case it exists.
     */
    where: reviewsWhereUniqueInput
    /**
     * In case the reviews found by the `where` argument doesn't exist, create a new reviews with this data.
     */
    create: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
    /**
     * In case the reviews was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
  }

  /**
   * reviews delete
   */
  export type reviewsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter which reviews to delete.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews deleteMany
   */
  export type reviewsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to delete
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to delete.
     */
    limit?: number
  }

  /**
   * reviews without action
   */
  export type reviewsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
  }


  /**
   * Model services
   */

  export type AggregateServices = {
    _count: ServicesCountAggregateOutputType | null
    _avg: ServicesAvgAggregateOutputType | null
    _sum: ServicesSumAggregateOutputType | null
    _min: ServicesMinAggregateOutputType | null
    _max: ServicesMaxAggregateOutputType | null
  }

  export type ServicesAvgAggregateOutputType = {
    id: number | null
    business_id: number | null
    duration_minutes: number | null
    price: Decimal | null
  }

  export type ServicesSumAggregateOutputType = {
    id: number | null
    business_id: number | null
    duration_minutes: number | null
    price: Decimal | null
  }

  export type ServicesMinAggregateOutputType = {
    id: number | null
    business_id: number | null
    name: string | null
    description: string | null
    duration_minutes: number | null
    category: string | null
    price: Decimal | null
    created_at: Date | null
  }

  export type ServicesMaxAggregateOutputType = {
    id: number | null
    business_id: number | null
    name: string | null
    description: string | null
    duration_minutes: number | null
    category: string | null
    price: Decimal | null
    created_at: Date | null
  }

  export type ServicesCountAggregateOutputType = {
    id: number
    business_id: number
    name: number
    description: number
    duration_minutes: number
    category: number
    price: number
    created_at: number
    _all: number
  }


  export type ServicesAvgAggregateInputType = {
    id?: true
    business_id?: true
    duration_minutes?: true
    price?: true
  }

  export type ServicesSumAggregateInputType = {
    id?: true
    business_id?: true
    duration_minutes?: true
    price?: true
  }

  export type ServicesMinAggregateInputType = {
    id?: true
    business_id?: true
    name?: true
    description?: true
    duration_minutes?: true
    category?: true
    price?: true
    created_at?: true
  }

  export type ServicesMaxAggregateInputType = {
    id?: true
    business_id?: true
    name?: true
    description?: true
    duration_minutes?: true
    category?: true
    price?: true
    created_at?: true
  }

  export type ServicesCountAggregateInputType = {
    id?: true
    business_id?: true
    name?: true
    description?: true
    duration_minutes?: true
    category?: true
    price?: true
    created_at?: true
    _all?: true
  }

  export type ServicesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which services to aggregate.
     */
    where?: servicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of services to fetch.
     */
    orderBy?: servicesOrderByWithRelationInput | servicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: servicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned services
    **/
    _count?: true | ServicesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServicesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServicesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServicesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServicesMaxAggregateInputType
  }

  export type GetServicesAggregateType<T extends ServicesAggregateArgs> = {
        [P in keyof T & keyof AggregateServices]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServices[P]>
      : GetScalarType<T[P], AggregateServices[P]>
  }




  export type servicesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: servicesWhereInput
    orderBy?: servicesOrderByWithAggregationInput | servicesOrderByWithAggregationInput[]
    by: ServicesScalarFieldEnum[] | ServicesScalarFieldEnum
    having?: servicesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServicesCountAggregateInputType | true
    _avg?: ServicesAvgAggregateInputType
    _sum?: ServicesSumAggregateInputType
    _min?: ServicesMinAggregateInputType
    _max?: ServicesMaxAggregateInputType
  }

  export type ServicesGroupByOutputType = {
    id: number
    business_id: number
    name: string
    description: string | null
    duration_minutes: number
    category: string | null
    price: Decimal
    created_at: Date | null
    _count: ServicesCountAggregateOutputType | null
    _avg: ServicesAvgAggregateOutputType | null
    _sum: ServicesSumAggregateOutputType | null
    _min: ServicesMinAggregateOutputType | null
    _max: ServicesMaxAggregateOutputType | null
  }

  type GetServicesGroupByPayload<T extends servicesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServicesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServicesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServicesGroupByOutputType[P]>
            : GetScalarType<T[P], ServicesGroupByOutputType[P]>
        }
      >
    >


  export type servicesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    business_id?: boolean
    name?: boolean
    description?: boolean
    duration_minutes?: boolean
    category?: boolean
    price?: boolean
    created_at?: boolean
    bookings?: boolean | services$bookingsArgs<ExtArgs>
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    _count?: boolean | ServicesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["services"]>



  export type servicesSelectScalar = {
    id?: boolean
    business_id?: boolean
    name?: boolean
    description?: boolean
    duration_minutes?: boolean
    category?: boolean
    price?: boolean
    created_at?: boolean
  }

  export type servicesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "business_id" | "name" | "description" | "duration_minutes" | "category" | "price" | "created_at", ExtArgs["result"]["services"]>
  export type servicesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | services$bookingsArgs<ExtArgs>
    businesses?: boolean | businessesDefaultArgs<ExtArgs>
    _count?: boolean | ServicesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $servicesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "services"
    objects: {
      bookings: Prisma.$bookingsPayload<ExtArgs>[]
      businesses: Prisma.$businessesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      business_id: number
      name: string
      description: string | null
      duration_minutes: number
      category: string | null
      price: Prisma.Decimal
      created_at: Date | null
    }, ExtArgs["result"]["services"]>
    composites: {}
  }

  type servicesGetPayload<S extends boolean | null | undefined | servicesDefaultArgs> = $Result.GetResult<Prisma.$servicesPayload, S>

  type servicesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<servicesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServicesCountAggregateInputType | true
    }

  export interface servicesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['services'], meta: { name: 'services' } }
    /**
     * Find zero or one Services that matches the filter.
     * @param {servicesFindUniqueArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends servicesFindUniqueArgs>(args: SelectSubset<T, servicesFindUniqueArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Services that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {servicesFindUniqueOrThrowArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends servicesFindUniqueOrThrowArgs>(args: SelectSubset<T, servicesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicesFindFirstArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends servicesFindFirstArgs>(args?: SelectSubset<T, servicesFindFirstArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Services that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicesFindFirstOrThrowArgs} args - Arguments to find a Services
     * @example
     * // Get one Services
     * const services = await prisma.services.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends servicesFindFirstOrThrowArgs>(args?: SelectSubset<T, servicesFindFirstOrThrowArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.services.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.services.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const servicesWithIdOnly = await prisma.services.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends servicesFindManyArgs>(args?: SelectSubset<T, servicesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Services.
     * @param {servicesCreateArgs} args - Arguments to create a Services.
     * @example
     * // Create one Services
     * const Services = await prisma.services.create({
     *   data: {
     *     // ... data to create a Services
     *   }
     * })
     * 
     */
    create<T extends servicesCreateArgs>(args: SelectSubset<T, servicesCreateArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {servicesCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const services = await prisma.services.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends servicesCreateManyArgs>(args?: SelectSubset<T, servicesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Services.
     * @param {servicesDeleteArgs} args - Arguments to delete one Services.
     * @example
     * // Delete one Services
     * const Services = await prisma.services.delete({
     *   where: {
     *     // ... filter to delete one Services
     *   }
     * })
     * 
     */
    delete<T extends servicesDeleteArgs>(args: SelectSubset<T, servicesDeleteArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Services.
     * @param {servicesUpdateArgs} args - Arguments to update one Services.
     * @example
     * // Update one Services
     * const services = await prisma.services.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends servicesUpdateArgs>(args: SelectSubset<T, servicesUpdateArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {servicesDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.services.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends servicesDeleteManyArgs>(args?: SelectSubset<T, servicesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const services = await prisma.services.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends servicesUpdateManyArgs>(args: SelectSubset<T, servicesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Services.
     * @param {servicesUpsertArgs} args - Arguments to update or create a Services.
     * @example
     * // Update or create a Services
     * const services = await prisma.services.upsert({
     *   create: {
     *     // ... data to create a Services
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Services we want to update
     *   }
     * })
     */
    upsert<T extends servicesUpsertArgs>(args: SelectSubset<T, servicesUpsertArgs<ExtArgs>>): Prisma__servicesClient<$Result.GetResult<Prisma.$servicesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicesCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.services.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends servicesCountArgs>(
      args?: Subset<T, servicesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServicesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServicesAggregateArgs>(args: Subset<T, ServicesAggregateArgs>): Prisma.PrismaPromise<GetServicesAggregateType<T>>

    /**
     * Group by Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends servicesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: servicesGroupByArgs['orderBy'] }
        : { orderBy?: servicesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, servicesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServicesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the services model
   */
  readonly fields: servicesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for services.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__servicesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends services$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, services$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businesses<T extends businessesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, businessesDefaultArgs<ExtArgs>>): Prisma__businessesClient<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the services model
   */
  interface servicesFieldRefs {
    readonly id: FieldRef<"services", 'Int'>
    readonly business_id: FieldRef<"services", 'Int'>
    readonly name: FieldRef<"services", 'String'>
    readonly description: FieldRef<"services", 'String'>
    readonly duration_minutes: FieldRef<"services", 'Int'>
    readonly category: FieldRef<"services", 'String'>
    readonly price: FieldRef<"services", 'Decimal'>
    readonly created_at: FieldRef<"services", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * services findUnique
   */
  export type servicesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * Filter, which services to fetch.
     */
    where: servicesWhereUniqueInput
  }

  /**
   * services findUniqueOrThrow
   */
  export type servicesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * Filter, which services to fetch.
     */
    where: servicesWhereUniqueInput
  }

  /**
   * services findFirst
   */
  export type servicesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * Filter, which services to fetch.
     */
    where?: servicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of services to fetch.
     */
    orderBy?: servicesOrderByWithRelationInput | servicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for services.
     */
    cursor?: servicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of services.
     */
    distinct?: ServicesScalarFieldEnum | ServicesScalarFieldEnum[]
  }

  /**
   * services findFirstOrThrow
   */
  export type servicesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * Filter, which services to fetch.
     */
    where?: servicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of services to fetch.
     */
    orderBy?: servicesOrderByWithRelationInput | servicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for services.
     */
    cursor?: servicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of services.
     */
    distinct?: ServicesScalarFieldEnum | ServicesScalarFieldEnum[]
  }

  /**
   * services findMany
   */
  export type servicesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * Filter, which services to fetch.
     */
    where?: servicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of services to fetch.
     */
    orderBy?: servicesOrderByWithRelationInput | servicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing services.
     */
    cursor?: servicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` services.
     */
    skip?: number
    distinct?: ServicesScalarFieldEnum | ServicesScalarFieldEnum[]
  }

  /**
   * services create
   */
  export type servicesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * The data needed to create a services.
     */
    data: XOR<servicesCreateInput, servicesUncheckedCreateInput>
  }

  /**
   * services createMany
   */
  export type servicesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many services.
     */
    data: servicesCreateManyInput | servicesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * services update
   */
  export type servicesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * The data needed to update a services.
     */
    data: XOR<servicesUpdateInput, servicesUncheckedUpdateInput>
    /**
     * Choose, which services to update.
     */
    where: servicesWhereUniqueInput
  }

  /**
   * services updateMany
   */
  export type servicesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update services.
     */
    data: XOR<servicesUpdateManyMutationInput, servicesUncheckedUpdateManyInput>
    /**
     * Filter which services to update
     */
    where?: servicesWhereInput
    /**
     * Limit how many services to update.
     */
    limit?: number
  }

  /**
   * services upsert
   */
  export type servicesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * The filter to search for the services to update in case it exists.
     */
    where: servicesWhereUniqueInput
    /**
     * In case the services found by the `where` argument doesn't exist, create a new services with this data.
     */
    create: XOR<servicesCreateInput, servicesUncheckedCreateInput>
    /**
     * In case the services was found with the provided `where` argument, update it with this data.
     */
    update: XOR<servicesUpdateInput, servicesUncheckedUpdateInput>
  }

  /**
   * services delete
   */
  export type servicesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
    /**
     * Filter which services to delete.
     */
    where: servicesWhereUniqueInput
  }

  /**
   * services deleteMany
   */
  export type servicesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which services to delete
     */
    where?: servicesWhereInput
    /**
     * Limit how many services to delete.
     */
    limit?: number
  }

  /**
   * services.bookings
   */
  export type services$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    cursor?: bookingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * services without action
   */
  export type servicesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the services
     */
    select?: servicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the services
     */
    omit?: servicesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.users_role | null
    created_at: Date | null
    google_id: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    role: $Enums.users_role | null
    created_at: Date | null
    google_id: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    phone: number
    role: number
    created_at: number
    google_id: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    created_at?: true
    google_id?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    created_at?: true
    google_id?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    role?: true
    created_at?: true
    google_id?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    phone: string | null
    role: $Enums.users_role
    created_at: Date | null
    google_id: string | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    created_at?: boolean
    google_id?: boolean
    bookings?: boolean | users$bookingsArgs<ExtArgs>
    businesses?: boolean | users$businessesArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    created_at?: boolean
    google_id?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "phone" | "role" | "created_at" | "google_id", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | users$bookingsArgs<ExtArgs>
    businesses?: boolean | users$businessesArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      bookings: Prisma.$bookingsPayload<ExtArgs>[]
      businesses: Prisma.$businessesPayload<ExtArgs>[]
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      phone: string | null
      role: $Enums.users_role
      created_at: Date | null
      google_id: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends users$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, users$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businesses<T extends users$businessesArgs<ExtArgs> = {}>(args?: Subset<T, users$businessesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$businessesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends users$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, users$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly phone: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'users_role'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly google_id: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.bookings
   */
  export type users$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    cursor?: bookingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * users.businesses
   */
  export type users$businessesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the businesses
     */
    select?: businessesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the businesses
     */
    omit?: businessesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: businessesInclude<ExtArgs> | null
    where?: businessesWhereInput
    orderBy?: businessesOrderByWithRelationInput | businessesOrderByWithRelationInput[]
    cursor?: businessesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessesScalarFieldEnum | BusinessesScalarFieldEnum[]
  }

  /**
   * users.reviews
   */
  export type users$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BookingsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    business_id: 'business_id',
    service_id: 'service_id',
    employee_id: 'employee_id',
    booking_date: 'booking_date',
    booking_time: 'booking_time',
    status: 'status',
    notes: 'notes',
    created_at: 'created_at'
  };

  export type BookingsScalarFieldEnum = (typeof BookingsScalarFieldEnum)[keyof typeof BookingsScalarFieldEnum]


  export const BusinessesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    email: 'email',
    description: 'description',
    category: 'category',
    image: 'image',
    is_open: 'is_open',
    created_at: 'created_at',
    opening_hours: 'opening_hours',
    is_featured: 'is_featured'
  };

  export type BusinessesScalarFieldEnum = (typeof BusinessesScalarFieldEnum)[keyof typeof BusinessesScalarFieldEnum]


  export const EmployeesScalarFieldEnum: {
    id: 'id',
    business_id: 'business_id',
    name: 'name',
    position: 'position',
    specialties: 'specialties',
    profile_image: 'profile_image',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EmployeesScalarFieldEnum = (typeof EmployeesScalarFieldEnum)[keyof typeof EmployeesScalarFieldEnum]


  export const ReviewsScalarFieldEnum: {
    id: 'id',
    business_id: 'business_id',
    user_id: 'user_id',
    rating: 'rating',
    comment: 'comment',
    created_at: 'created_at'
  };

  export type ReviewsScalarFieldEnum = (typeof ReviewsScalarFieldEnum)[keyof typeof ReviewsScalarFieldEnum]


  export const ServicesScalarFieldEnum: {
    id: 'id',
    business_id: 'business_id',
    name: 'name',
    description: 'description',
    duration_minutes: 'duration_minutes',
    category: 'category',
    price: 'price',
    created_at: 'created_at'
  };

  export type ServicesScalarFieldEnum = (typeof ServicesScalarFieldEnum)[keyof typeof ServicesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    role: 'role',
    created_at: 'created_at',
    google_id: 'google_id'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const bookingsOrderByRelevanceFieldEnum: {
    notes: 'notes'
  };

  export type bookingsOrderByRelevanceFieldEnum = (typeof bookingsOrderByRelevanceFieldEnum)[keyof typeof bookingsOrderByRelevanceFieldEnum]


  export const businessesOrderByRelevanceFieldEnum: {
    name: 'name',
    address: 'address',
    phone: 'phone',
    email: 'email',
    description: 'description',
    category: 'category',
    image: 'image',
    opening_hours: 'opening_hours'
  };

  export type businessesOrderByRelevanceFieldEnum = (typeof businessesOrderByRelevanceFieldEnum)[keyof typeof businessesOrderByRelevanceFieldEnum]


  export const employeesOrderByRelevanceFieldEnum: {
    name: 'name',
    position: 'position',
    specialties: 'specialties',
    profile_image: 'profile_image'
  };

  export type employeesOrderByRelevanceFieldEnum = (typeof employeesOrderByRelevanceFieldEnum)[keyof typeof employeesOrderByRelevanceFieldEnum]


  export const reviewsOrderByRelevanceFieldEnum: {
    comment: 'comment'
  };

  export type reviewsOrderByRelevanceFieldEnum = (typeof reviewsOrderByRelevanceFieldEnum)[keyof typeof reviewsOrderByRelevanceFieldEnum]


  export const servicesOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description',
    category: 'category'
  };

  export type servicesOrderByRelevanceFieldEnum = (typeof servicesOrderByRelevanceFieldEnum)[keyof typeof servicesOrderByRelevanceFieldEnum]


  export const usersOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    google_id: 'google_id'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'bookings_status'
   */
  export type Enumbookings_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'bookings_status'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'users_role'
   */
  export type Enumusers_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_role'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type bookingsWhereInput = {
    AND?: bookingsWhereInput | bookingsWhereInput[]
    OR?: bookingsWhereInput[]
    NOT?: bookingsWhereInput | bookingsWhereInput[]
    id?: IntFilter<"bookings"> | number
    user_id?: IntFilter<"bookings"> | number
    business_id?: IntFilter<"bookings"> | number
    service_id?: IntFilter<"bookings"> | number
    employee_id?: IntNullableFilter<"bookings"> | number | null
    booking_date?: DateTimeFilter<"bookings"> | Date | string
    booking_time?: DateTimeFilter<"bookings"> | Date | string
    status?: Enumbookings_statusFilter<"bookings"> | $Enums.bookings_status
    notes?: StringNullableFilter<"bookings"> | string | null
    created_at?: DateTimeNullableFilter<"bookings"> | Date | string | null
    employees?: XOR<EmployeesNullableScalarRelationFilter, employeesWhereInput> | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
    services?: XOR<ServicesScalarRelationFilter, servicesWhereInput>
  }

  export type bookingsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    business_id?: SortOrder
    service_id?: SortOrder
    employee_id?: SortOrderInput | SortOrder
    booking_date?: SortOrder
    booking_time?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    employees?: employeesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    businesses?: businessesOrderByWithRelationInput
    services?: servicesOrderByWithRelationInput
    _relevance?: bookingsOrderByRelevanceInput
  }

  export type bookingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: bookingsWhereInput | bookingsWhereInput[]
    OR?: bookingsWhereInput[]
    NOT?: bookingsWhereInput | bookingsWhereInput[]
    user_id?: IntFilter<"bookings"> | number
    business_id?: IntFilter<"bookings"> | number
    service_id?: IntFilter<"bookings"> | number
    employee_id?: IntNullableFilter<"bookings"> | number | null
    booking_date?: DateTimeFilter<"bookings"> | Date | string
    booking_time?: DateTimeFilter<"bookings"> | Date | string
    status?: Enumbookings_statusFilter<"bookings"> | $Enums.bookings_status
    notes?: StringNullableFilter<"bookings"> | string | null
    created_at?: DateTimeNullableFilter<"bookings"> | Date | string | null
    employees?: XOR<EmployeesNullableScalarRelationFilter, employeesWhereInput> | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
    services?: XOR<ServicesScalarRelationFilter, servicesWhereInput>
  }, "id">

  export type bookingsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    business_id?: SortOrder
    service_id?: SortOrder
    employee_id?: SortOrderInput | SortOrder
    booking_date?: SortOrder
    booking_time?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: bookingsCountOrderByAggregateInput
    _avg?: bookingsAvgOrderByAggregateInput
    _max?: bookingsMaxOrderByAggregateInput
    _min?: bookingsMinOrderByAggregateInput
    _sum?: bookingsSumOrderByAggregateInput
  }

  export type bookingsScalarWhereWithAggregatesInput = {
    AND?: bookingsScalarWhereWithAggregatesInput | bookingsScalarWhereWithAggregatesInput[]
    OR?: bookingsScalarWhereWithAggregatesInput[]
    NOT?: bookingsScalarWhereWithAggregatesInput | bookingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"bookings"> | number
    user_id?: IntWithAggregatesFilter<"bookings"> | number
    business_id?: IntWithAggregatesFilter<"bookings"> | number
    service_id?: IntWithAggregatesFilter<"bookings"> | number
    employee_id?: IntNullableWithAggregatesFilter<"bookings"> | number | null
    booking_date?: DateTimeWithAggregatesFilter<"bookings"> | Date | string
    booking_time?: DateTimeWithAggregatesFilter<"bookings"> | Date | string
    status?: Enumbookings_statusWithAggregatesFilter<"bookings"> | $Enums.bookings_status
    notes?: StringNullableWithAggregatesFilter<"bookings"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"bookings"> | Date | string | null
  }

  export type businessesWhereInput = {
    AND?: businessesWhereInput | businessesWhereInput[]
    OR?: businessesWhereInput[]
    NOT?: businessesWhereInput | businessesWhereInput[]
    id?: IntFilter<"businesses"> | number
    user_id?: IntFilter<"businesses"> | number
    name?: StringFilter<"businesses"> | string
    address?: StringNullableFilter<"businesses"> | string | null
    phone?: StringNullableFilter<"businesses"> | string | null
    email?: StringFilter<"businesses"> | string
    description?: StringNullableFilter<"businesses"> | string | null
    category?: StringNullableFilter<"businesses"> | string | null
    image?: StringNullableFilter<"businesses"> | string | null
    is_open?: BoolNullableFilter<"businesses"> | boolean | null
    created_at?: DateTimeNullableFilter<"businesses"> | Date | string | null
    opening_hours?: StringNullableFilter<"businesses"> | string | null
    is_featured?: BoolNullableFilter<"businesses"> | boolean | null
    bookings?: BookingsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    employees?: EmployeesListRelationFilter
    reviews?: ReviewsListRelationFilter
    services?: ServicesListRelationFilter
  }

  export type businessesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    is_open?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    opening_hours?: SortOrderInput | SortOrder
    is_featured?: SortOrderInput | SortOrder
    bookings?: bookingsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
    employees?: employeesOrderByRelationAggregateInput
    reviews?: reviewsOrderByRelationAggregateInput
    services?: servicesOrderByRelationAggregateInput
    _relevance?: businessesOrderByRelevanceInput
  }

  export type businessesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: businessesWhereInput | businessesWhereInput[]
    OR?: businessesWhereInput[]
    NOT?: businessesWhereInput | businessesWhereInput[]
    user_id?: IntFilter<"businesses"> | number
    name?: StringFilter<"businesses"> | string
    address?: StringNullableFilter<"businesses"> | string | null
    phone?: StringNullableFilter<"businesses"> | string | null
    email?: StringFilter<"businesses"> | string
    description?: StringNullableFilter<"businesses"> | string | null
    category?: StringNullableFilter<"businesses"> | string | null
    image?: StringNullableFilter<"businesses"> | string | null
    is_open?: BoolNullableFilter<"businesses"> | boolean | null
    created_at?: DateTimeNullableFilter<"businesses"> | Date | string | null
    opening_hours?: StringNullableFilter<"businesses"> | string | null
    is_featured?: BoolNullableFilter<"businesses"> | boolean | null
    bookings?: BookingsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    employees?: EmployeesListRelationFilter
    reviews?: ReviewsListRelationFilter
    services?: ServicesListRelationFilter
  }, "id">

  export type businessesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    is_open?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    opening_hours?: SortOrderInput | SortOrder
    is_featured?: SortOrderInput | SortOrder
    _count?: businessesCountOrderByAggregateInput
    _avg?: businessesAvgOrderByAggregateInput
    _max?: businessesMaxOrderByAggregateInput
    _min?: businessesMinOrderByAggregateInput
    _sum?: businessesSumOrderByAggregateInput
  }

  export type businessesScalarWhereWithAggregatesInput = {
    AND?: businessesScalarWhereWithAggregatesInput | businessesScalarWhereWithAggregatesInput[]
    OR?: businessesScalarWhereWithAggregatesInput[]
    NOT?: businessesScalarWhereWithAggregatesInput | businessesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"businesses"> | number
    user_id?: IntWithAggregatesFilter<"businesses"> | number
    name?: StringWithAggregatesFilter<"businesses"> | string
    address?: StringNullableWithAggregatesFilter<"businesses"> | string | null
    phone?: StringNullableWithAggregatesFilter<"businesses"> | string | null
    email?: StringWithAggregatesFilter<"businesses"> | string
    description?: StringNullableWithAggregatesFilter<"businesses"> | string | null
    category?: StringNullableWithAggregatesFilter<"businesses"> | string | null
    image?: StringNullableWithAggregatesFilter<"businesses"> | string | null
    is_open?: BoolNullableWithAggregatesFilter<"businesses"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"businesses"> | Date | string | null
    opening_hours?: StringNullableWithAggregatesFilter<"businesses"> | string | null
    is_featured?: BoolNullableWithAggregatesFilter<"businesses"> | boolean | null
  }

  export type employeesWhereInput = {
    AND?: employeesWhereInput | employeesWhereInput[]
    OR?: employeesWhereInput[]
    NOT?: employeesWhereInput | employeesWhereInput[]
    id?: IntFilter<"employees"> | number
    business_id?: IntFilter<"employees"> | number
    name?: StringFilter<"employees"> | string
    position?: StringNullableFilter<"employees"> | string | null
    specialties?: StringNullableFilter<"employees"> | string | null
    profile_image?: StringNullableFilter<"employees"> | string | null
    created_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    bookings?: BookingsListRelationFilter
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
  }

  export type employeesOrderByWithRelationInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    position?: SortOrderInput | SortOrder
    specialties?: SortOrderInput | SortOrder
    profile_image?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    bookings?: bookingsOrderByRelationAggregateInput
    businesses?: businessesOrderByWithRelationInput
    _relevance?: employeesOrderByRelevanceInput
  }

  export type employeesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: employeesWhereInput | employeesWhereInput[]
    OR?: employeesWhereInput[]
    NOT?: employeesWhereInput | employeesWhereInput[]
    business_id?: IntFilter<"employees"> | number
    name?: StringFilter<"employees"> | string
    position?: StringNullableFilter<"employees"> | string | null
    specialties?: StringNullableFilter<"employees"> | string | null
    profile_image?: StringNullableFilter<"employees"> | string | null
    created_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    bookings?: BookingsListRelationFilter
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
  }, "id">

  export type employeesOrderByWithAggregationInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    position?: SortOrderInput | SortOrder
    specialties?: SortOrderInput | SortOrder
    profile_image?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: employeesCountOrderByAggregateInput
    _avg?: employeesAvgOrderByAggregateInput
    _max?: employeesMaxOrderByAggregateInput
    _min?: employeesMinOrderByAggregateInput
    _sum?: employeesSumOrderByAggregateInput
  }

  export type employeesScalarWhereWithAggregatesInput = {
    AND?: employeesScalarWhereWithAggregatesInput | employeesScalarWhereWithAggregatesInput[]
    OR?: employeesScalarWhereWithAggregatesInput[]
    NOT?: employeesScalarWhereWithAggregatesInput | employeesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"employees"> | number
    business_id?: IntWithAggregatesFilter<"employees"> | number
    name?: StringWithAggregatesFilter<"employees"> | string
    position?: StringNullableWithAggregatesFilter<"employees"> | string | null
    specialties?: StringNullableWithAggregatesFilter<"employees"> | string | null
    profile_image?: StringNullableWithAggregatesFilter<"employees"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"employees"> | Date | string | null
  }

  export type reviewsWhereInput = {
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    id?: IntFilter<"reviews"> | number
    business_id?: IntFilter<"reviews"> | number
    user_id?: IntFilter<"reviews"> | number
    rating?: DecimalFilter<"reviews"> | Decimal | DecimalJsLike | number | string
    comment?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeNullableFilter<"reviews"> | Date | string | null
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type reviewsOrderByWithRelationInput = {
    id?: SortOrder
    business_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    businesses?: businessesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: reviewsOrderByRelevanceInput
  }

  export type reviewsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    business_id?: IntFilter<"reviews"> | number
    user_id?: IntFilter<"reviews"> | number
    rating?: DecimalFilter<"reviews"> | Decimal | DecimalJsLike | number | string
    comment?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeNullableFilter<"reviews"> | Date | string | null
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type reviewsOrderByWithAggregationInput = {
    id?: SortOrder
    business_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: reviewsCountOrderByAggregateInput
    _avg?: reviewsAvgOrderByAggregateInput
    _max?: reviewsMaxOrderByAggregateInput
    _min?: reviewsMinOrderByAggregateInput
    _sum?: reviewsSumOrderByAggregateInput
  }

  export type reviewsScalarWhereWithAggregatesInput = {
    AND?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    OR?: reviewsScalarWhereWithAggregatesInput[]
    NOT?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"reviews"> | number
    business_id?: IntWithAggregatesFilter<"reviews"> | number
    user_id?: IntWithAggregatesFilter<"reviews"> | number
    rating?: DecimalWithAggregatesFilter<"reviews"> | Decimal | DecimalJsLike | number | string
    comment?: StringNullableWithAggregatesFilter<"reviews"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"reviews"> | Date | string | null
  }

  export type servicesWhereInput = {
    AND?: servicesWhereInput | servicesWhereInput[]
    OR?: servicesWhereInput[]
    NOT?: servicesWhereInput | servicesWhereInput[]
    id?: IntFilter<"services"> | number
    business_id?: IntFilter<"services"> | number
    name?: StringFilter<"services"> | string
    description?: StringNullableFilter<"services"> | string | null
    duration_minutes?: IntFilter<"services"> | number
    category?: StringNullableFilter<"services"> | string | null
    price?: DecimalFilter<"services"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"services"> | Date | string | null
    bookings?: BookingsListRelationFilter
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
  }

  export type servicesOrderByWithRelationInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    duration_minutes?: SortOrder
    category?: SortOrderInput | SortOrder
    price?: SortOrder
    created_at?: SortOrderInput | SortOrder
    bookings?: bookingsOrderByRelationAggregateInput
    businesses?: businessesOrderByWithRelationInput
    _relevance?: servicesOrderByRelevanceInput
  }

  export type servicesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: servicesWhereInput | servicesWhereInput[]
    OR?: servicesWhereInput[]
    NOT?: servicesWhereInput | servicesWhereInput[]
    business_id?: IntFilter<"services"> | number
    name?: StringFilter<"services"> | string
    description?: StringNullableFilter<"services"> | string | null
    duration_minutes?: IntFilter<"services"> | number
    category?: StringNullableFilter<"services"> | string | null
    price?: DecimalFilter<"services"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"services"> | Date | string | null
    bookings?: BookingsListRelationFilter
    businesses?: XOR<BusinessesScalarRelationFilter, businessesWhereInput>
  }, "id">

  export type servicesOrderByWithAggregationInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    duration_minutes?: SortOrder
    category?: SortOrderInput | SortOrder
    price?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: servicesCountOrderByAggregateInput
    _avg?: servicesAvgOrderByAggregateInput
    _max?: servicesMaxOrderByAggregateInput
    _min?: servicesMinOrderByAggregateInput
    _sum?: servicesSumOrderByAggregateInput
  }

  export type servicesScalarWhereWithAggregatesInput = {
    AND?: servicesScalarWhereWithAggregatesInput | servicesScalarWhereWithAggregatesInput[]
    OR?: servicesScalarWhereWithAggregatesInput[]
    NOT?: servicesScalarWhereWithAggregatesInput | servicesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"services"> | number
    business_id?: IntWithAggregatesFilter<"services"> | number
    name?: StringWithAggregatesFilter<"services"> | string
    description?: StringNullableWithAggregatesFilter<"services"> | string | null
    duration_minutes?: IntWithAggregatesFilter<"services"> | number
    category?: StringNullableWithAggregatesFilter<"services"> | string | null
    price?: DecimalWithAggregatesFilter<"services"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableWithAggregatesFilter<"services"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    phone?: StringNullableFilter<"users"> | string | null
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    google_id?: StringNullableFilter<"users"> | string | null
    bookings?: BookingsListRelationFilter
    businesses?: BusinessesListRelationFilter
    reviews?: ReviewsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    bookings?: bookingsOrderByRelationAggregateInput
    businesses?: businessesOrderByRelationAggregateInput
    reviews?: reviewsOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    phone?: StringNullableFilter<"users"> | string | null
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    google_id?: StringNullableFilter<"users"> | string | null
    bookings?: BookingsListRelationFilter
    businesses?: BusinessesListRelationFilter
    reviews?: ReviewsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    phone?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: Enumusers_roleWithAggregatesFilter<"users"> | $Enums.users_role
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    google_id?: StringNullableWithAggregatesFilter<"users"> | string | null
  }

  export type bookingsCreateInput = {
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
    employees?: employeesCreateNestedOneWithoutBookingsInput
    users: usersCreateNestedOneWithoutBookingsInput
    businesses: businessesCreateNestedOneWithoutBookingsInput
    services: servicesCreateNestedOneWithoutBookingsInput
  }

  export type bookingsUncheckedCreateInput = {
    id?: number
    user_id: number
    business_id: number
    service_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsUpdateInput = {
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employees?: employeesUpdateOneWithoutBookingsNestedInput
    users?: usersUpdateOneRequiredWithoutBookingsNestedInput
    businesses?: businessesUpdateOneRequiredWithoutBookingsNestedInput
    services?: servicesUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type bookingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsCreateManyInput = {
    id?: number
    user_id: number
    business_id: number
    service_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsUpdateManyMutationInput = {
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type businessesCreateInput = {
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsCreateNestedManyWithoutBusinessesInput
    users: usersCreateNestedOneWithoutBusinessesInput
    employees?: employeesCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsCreateNestedManyWithoutBusinessesInput
    services?: servicesCreateNestedManyWithoutBusinessesInput
  }

  export type businessesUncheckedCreateInput = {
    id?: number
    user_id: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutBusinessesInput
    employees?: employeesUncheckedCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBusinessesInput
    services?: servicesUncheckedCreateNestedManyWithoutBusinessesInput
  }

  export type businessesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUpdateManyWithoutBusinessesNestedInput
    users?: usersUpdateOneRequiredWithoutBusinessesNestedInput
    employees?: employeesUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUpdateManyWithoutBusinessesNestedInput
    services?: servicesUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUncheckedUpdateManyWithoutBusinessesNestedInput
    employees?: employeesUncheckedUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBusinessesNestedInput
    services?: servicesUncheckedUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesCreateManyInput = {
    id?: number
    user_id: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
  }

  export type businessesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type businessesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type employeesCreateInput = {
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    bookings?: bookingsCreateNestedManyWithoutEmployeesInput
    businesses: businessesCreateNestedOneWithoutEmployeesInput
  }

  export type employeesUncheckedCreateInput = {
    id?: number
    business_id: number
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutEmployeesInput
  }

  export type employeesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUpdateManyWithoutEmployeesNestedInput
    businesses?: businessesUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type employeesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutEmployeesNestedInput
  }

  export type employeesCreateManyInput = {
    id?: number
    business_id: number
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type employeesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employeesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewsCreateInput = {
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
    businesses: businessesCreateNestedOneWithoutReviewsInput
    users: usersCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateInput = {
    id?: number
    business_id: number
    user_id: number
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
  }

  export type reviewsUpdateInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    businesses?: businessesUpdateOneRequiredWithoutReviewsNestedInput
    users?: usersUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewsCreateManyInput = {
    id?: number
    business_id: number
    user_id: number
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
  }

  export type reviewsUpdateManyMutationInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type servicesCreateInput = {
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    bookings?: bookingsCreateNestedManyWithoutServicesInput
    businesses: businessesCreateNestedOneWithoutServicesInput
  }

  export type servicesUncheckedCreateInput = {
    id?: number
    business_id: number
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutServicesInput
  }

  export type servicesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUpdateManyWithoutServicesNestedInput
    businesses?: businessesUpdateOneRequiredWithoutServicesNestedInput
  }

  export type servicesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutServicesNestedInput
  }

  export type servicesCreateManyInput = {
    id?: number
    business_id: number
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
  }

  export type servicesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type servicesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    bookings?: bookingsCreateNestedManyWithoutUsersInput
    businesses?: businessesCreateNestedManyWithoutUsersInput
    reviews?: reviewsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutUsersInput
    businesses?: businessesUncheckedCreateNestedManyWithoutUsersInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: bookingsUpdateManyWithoutUsersNestedInput
    businesses?: businessesUpdateManyWithoutUsersNestedInput
    reviews?: reviewsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutUsersNestedInput
    businesses?: businessesUncheckedUpdateManyWithoutUsersNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
  }

  export type usersUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Enumbookings_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.bookings_status | Enumbookings_statusFieldRefInput<$PrismaModel>
    in?: $Enums.bookings_status[]
    notIn?: $Enums.bookings_status[]
    not?: NestedEnumbookings_statusFilter<$PrismaModel> | $Enums.bookings_status
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EmployeesNullableScalarRelationFilter = {
    is?: employeesWhereInput | null
    isNot?: employeesWhereInput | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type BusinessesScalarRelationFilter = {
    is?: businessesWhereInput
    isNot?: businessesWhereInput
  }

  export type ServicesScalarRelationFilter = {
    is?: servicesWhereInput
    isNot?: servicesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type bookingsOrderByRelevanceInput = {
    fields: bookingsOrderByRelevanceFieldEnum | bookingsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type bookingsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    business_id?: SortOrder
    service_id?: SortOrder
    employee_id?: SortOrder
    booking_date?: SortOrder
    booking_time?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type bookingsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    business_id?: SortOrder
    service_id?: SortOrder
    employee_id?: SortOrder
  }

  export type bookingsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    business_id?: SortOrder
    service_id?: SortOrder
    employee_id?: SortOrder
    booking_date?: SortOrder
    booking_time?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type bookingsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    business_id?: SortOrder
    service_id?: SortOrder
    employee_id?: SortOrder
    booking_date?: SortOrder
    booking_time?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type bookingsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    business_id?: SortOrder
    service_id?: SortOrder
    employee_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumbookings_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.bookings_status | Enumbookings_statusFieldRefInput<$PrismaModel>
    in?: $Enums.bookings_status[]
    notIn?: $Enums.bookings_status[]
    not?: NestedEnumbookings_statusWithAggregatesFilter<$PrismaModel> | $Enums.bookings_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumbookings_statusFilter<$PrismaModel>
    _max?: NestedEnumbookings_statusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BookingsListRelationFilter = {
    every?: bookingsWhereInput
    some?: bookingsWhereInput
    none?: bookingsWhereInput
  }

  export type EmployeesListRelationFilter = {
    every?: employeesWhereInput
    some?: employeesWhereInput
    none?: employeesWhereInput
  }

  export type ReviewsListRelationFilter = {
    every?: reviewsWhereInput
    some?: reviewsWhereInput
    none?: reviewsWhereInput
  }

  export type ServicesListRelationFilter = {
    every?: servicesWhereInput
    some?: servicesWhereInput
    none?: servicesWhereInput
  }

  export type bookingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type employeesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reviewsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type servicesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type businessesOrderByRelevanceInput = {
    fields: businessesOrderByRelevanceFieldEnum | businessesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type businessesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    description?: SortOrder
    category?: SortOrder
    image?: SortOrder
    is_open?: SortOrder
    created_at?: SortOrder
    opening_hours?: SortOrder
    is_featured?: SortOrder
  }

  export type businessesAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type businessesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    description?: SortOrder
    category?: SortOrder
    image?: SortOrder
    is_open?: SortOrder
    created_at?: SortOrder
    opening_hours?: SortOrder
    is_featured?: SortOrder
  }

  export type businessesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    description?: SortOrder
    category?: SortOrder
    image?: SortOrder
    is_open?: SortOrder
    created_at?: SortOrder
    opening_hours?: SortOrder
    is_featured?: SortOrder
  }

  export type businessesSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type employeesOrderByRelevanceInput = {
    fields: employeesOrderByRelevanceFieldEnum | employeesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type employeesCountOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    specialties?: SortOrder
    profile_image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type employeesAvgOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
  }

  export type employeesMaxOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    specialties?: SortOrder
    profile_image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type employeesMinOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    position?: SortOrder
    specialties?: SortOrder
    profile_image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type employeesSumOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type reviewsOrderByRelevanceInput = {
    fields: reviewsOrderByRelevanceFieldEnum | reviewsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type reviewsCountOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    created_at?: SortOrder
  }

  export type reviewsAvgOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
  }

  export type reviewsMaxOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    created_at?: SortOrder
  }

  export type reviewsMinOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    created_at?: SortOrder
  }

  export type reviewsSumOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    user_id?: SortOrder
    rating?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type servicesOrderByRelevanceInput = {
    fields: servicesOrderByRelevanceFieldEnum | servicesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type servicesCountOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration_minutes?: SortOrder
    category?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
  }

  export type servicesAvgOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    duration_minutes?: SortOrder
    price?: SortOrder
  }

  export type servicesMaxOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration_minutes?: SortOrder
    category?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
  }

  export type servicesMinOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    duration_minutes?: SortOrder
    category?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
  }

  export type servicesSumOrderByAggregateInput = {
    id?: SortOrder
    business_id?: SortOrder
    duration_minutes?: SortOrder
    price?: SortOrder
  }

  export type Enumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
  }

  export type BusinessesListRelationFilter = {
    every?: businessesWhereInput
    some?: businessesWhereInput
    none?: businessesWhereInput
  }

  export type businessesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    google_id?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    google_id?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    google_id?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Enumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
  }

  export type employeesCreateNestedOneWithoutBookingsInput = {
    create?: XOR<employeesCreateWithoutBookingsInput, employeesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: employeesCreateOrConnectWithoutBookingsInput
    connect?: employeesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutBookingsInput = {
    create?: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBookingsInput
    connect?: usersWhereUniqueInput
  }

  export type businessesCreateNestedOneWithoutBookingsInput = {
    create?: XOR<businessesCreateWithoutBookingsInput, businessesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: businessesCreateOrConnectWithoutBookingsInput
    connect?: businessesWhereUniqueInput
  }

  export type servicesCreateNestedOneWithoutBookingsInput = {
    create?: XOR<servicesCreateWithoutBookingsInput, servicesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: servicesCreateOrConnectWithoutBookingsInput
    connect?: servicesWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type Enumbookings_statusFieldUpdateOperationsInput = {
    set?: $Enums.bookings_status
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type employeesUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<employeesCreateWithoutBookingsInput, employeesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: employeesCreateOrConnectWithoutBookingsInput
    upsert?: employeesUpsertWithoutBookingsInput
    disconnect?: employeesWhereInput | boolean
    delete?: employeesWhereInput | boolean
    connect?: employeesWhereUniqueInput
    update?: XOR<XOR<employeesUpdateToOneWithWhereWithoutBookingsInput, employeesUpdateWithoutBookingsInput>, employeesUncheckedUpdateWithoutBookingsInput>
  }

  export type usersUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBookingsInput
    upsert?: usersUpsertWithoutBookingsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBookingsInput, usersUpdateWithoutBookingsInput>, usersUncheckedUpdateWithoutBookingsInput>
  }

  export type businessesUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<businessesCreateWithoutBookingsInput, businessesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: businessesCreateOrConnectWithoutBookingsInput
    upsert?: businessesUpsertWithoutBookingsInput
    connect?: businessesWhereUniqueInput
    update?: XOR<XOR<businessesUpdateToOneWithWhereWithoutBookingsInput, businessesUpdateWithoutBookingsInput>, businessesUncheckedUpdateWithoutBookingsInput>
  }

  export type servicesUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<servicesCreateWithoutBookingsInput, servicesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: servicesCreateOrConnectWithoutBookingsInput
    upsert?: servicesUpsertWithoutBookingsInput
    connect?: servicesWhereUniqueInput
    update?: XOR<XOR<servicesUpdateToOneWithWhereWithoutBookingsInput, servicesUpdateWithoutBookingsInput>, servicesUncheckedUpdateWithoutBookingsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type bookingsCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<bookingsCreateWithoutBusinessesInput, bookingsUncheckedCreateWithoutBusinessesInput> | bookingsCreateWithoutBusinessesInput[] | bookingsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutBusinessesInput | bookingsCreateOrConnectWithoutBusinessesInput[]
    createMany?: bookingsCreateManyBusinessesInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutBusinessesInput = {
    create?: XOR<usersCreateWithoutBusinessesInput, usersUncheckedCreateWithoutBusinessesInput>
    connectOrCreate?: usersCreateOrConnectWithoutBusinessesInput
    connect?: usersWhereUniqueInput
  }

  export type employeesCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<employeesCreateWithoutBusinessesInput, employeesUncheckedCreateWithoutBusinessesInput> | employeesCreateWithoutBusinessesInput[] | employeesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutBusinessesInput | employeesCreateOrConnectWithoutBusinessesInput[]
    createMany?: employeesCreateManyBusinessesInputEnvelope
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
  }

  export type reviewsCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<reviewsCreateWithoutBusinessesInput, reviewsUncheckedCreateWithoutBusinessesInput> | reviewsCreateWithoutBusinessesInput[] | reviewsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBusinessesInput | reviewsCreateOrConnectWithoutBusinessesInput[]
    createMany?: reviewsCreateManyBusinessesInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type servicesCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<servicesCreateWithoutBusinessesInput, servicesUncheckedCreateWithoutBusinessesInput> | servicesCreateWithoutBusinessesInput[] | servicesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: servicesCreateOrConnectWithoutBusinessesInput | servicesCreateOrConnectWithoutBusinessesInput[]
    createMany?: servicesCreateManyBusinessesInputEnvelope
    connect?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
  }

  export type bookingsUncheckedCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<bookingsCreateWithoutBusinessesInput, bookingsUncheckedCreateWithoutBusinessesInput> | bookingsCreateWithoutBusinessesInput[] | bookingsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutBusinessesInput | bookingsCreateOrConnectWithoutBusinessesInput[]
    createMany?: bookingsCreateManyBusinessesInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type employeesUncheckedCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<employeesCreateWithoutBusinessesInput, employeesUncheckedCreateWithoutBusinessesInput> | employeesCreateWithoutBusinessesInput[] | employeesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutBusinessesInput | employeesCreateOrConnectWithoutBusinessesInput[]
    createMany?: employeesCreateManyBusinessesInputEnvelope
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<reviewsCreateWithoutBusinessesInput, reviewsUncheckedCreateWithoutBusinessesInput> | reviewsCreateWithoutBusinessesInput[] | reviewsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBusinessesInput | reviewsCreateOrConnectWithoutBusinessesInput[]
    createMany?: reviewsCreateManyBusinessesInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type servicesUncheckedCreateNestedManyWithoutBusinessesInput = {
    create?: XOR<servicesCreateWithoutBusinessesInput, servicesUncheckedCreateWithoutBusinessesInput> | servicesCreateWithoutBusinessesInput[] | servicesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: servicesCreateOrConnectWithoutBusinessesInput | servicesCreateOrConnectWithoutBusinessesInput[]
    createMany?: servicesCreateManyBusinessesInputEnvelope
    connect?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type bookingsUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<bookingsCreateWithoutBusinessesInput, bookingsUncheckedCreateWithoutBusinessesInput> | bookingsCreateWithoutBusinessesInput[] | bookingsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutBusinessesInput | bookingsCreateOrConnectWithoutBusinessesInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutBusinessesInput | bookingsUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: bookingsCreateManyBusinessesInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutBusinessesInput | bookingsUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutBusinessesInput | bookingsUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type usersUpdateOneRequiredWithoutBusinessesNestedInput = {
    create?: XOR<usersCreateWithoutBusinessesInput, usersUncheckedCreateWithoutBusinessesInput>
    connectOrCreate?: usersCreateOrConnectWithoutBusinessesInput
    upsert?: usersUpsertWithoutBusinessesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBusinessesInput, usersUpdateWithoutBusinessesInput>, usersUncheckedUpdateWithoutBusinessesInput>
  }

  export type employeesUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<employeesCreateWithoutBusinessesInput, employeesUncheckedCreateWithoutBusinessesInput> | employeesCreateWithoutBusinessesInput[] | employeesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutBusinessesInput | employeesCreateOrConnectWithoutBusinessesInput[]
    upsert?: employeesUpsertWithWhereUniqueWithoutBusinessesInput | employeesUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: employeesCreateManyBusinessesInputEnvelope
    set?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    disconnect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    delete?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    update?: employeesUpdateWithWhereUniqueWithoutBusinessesInput | employeesUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: employeesUpdateManyWithWhereWithoutBusinessesInput | employeesUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: employeesScalarWhereInput | employeesScalarWhereInput[]
  }

  export type reviewsUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<reviewsCreateWithoutBusinessesInput, reviewsUncheckedCreateWithoutBusinessesInput> | reviewsCreateWithoutBusinessesInput[] | reviewsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBusinessesInput | reviewsCreateOrConnectWithoutBusinessesInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutBusinessesInput | reviewsUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: reviewsCreateManyBusinessesInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutBusinessesInput | reviewsUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutBusinessesInput | reviewsUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type servicesUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<servicesCreateWithoutBusinessesInput, servicesUncheckedCreateWithoutBusinessesInput> | servicesCreateWithoutBusinessesInput[] | servicesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: servicesCreateOrConnectWithoutBusinessesInput | servicesCreateOrConnectWithoutBusinessesInput[]
    upsert?: servicesUpsertWithWhereUniqueWithoutBusinessesInput | servicesUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: servicesCreateManyBusinessesInputEnvelope
    set?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    disconnect?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    delete?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    connect?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    update?: servicesUpdateWithWhereUniqueWithoutBusinessesInput | servicesUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: servicesUpdateManyWithWhereWithoutBusinessesInput | servicesUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: servicesScalarWhereInput | servicesScalarWhereInput[]
  }

  export type bookingsUncheckedUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<bookingsCreateWithoutBusinessesInput, bookingsUncheckedCreateWithoutBusinessesInput> | bookingsCreateWithoutBusinessesInput[] | bookingsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutBusinessesInput | bookingsCreateOrConnectWithoutBusinessesInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutBusinessesInput | bookingsUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: bookingsCreateManyBusinessesInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutBusinessesInput | bookingsUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutBusinessesInput | bookingsUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type employeesUncheckedUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<employeesCreateWithoutBusinessesInput, employeesUncheckedCreateWithoutBusinessesInput> | employeesCreateWithoutBusinessesInput[] | employeesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: employeesCreateOrConnectWithoutBusinessesInput | employeesCreateOrConnectWithoutBusinessesInput[]
    upsert?: employeesUpsertWithWhereUniqueWithoutBusinessesInput | employeesUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: employeesCreateManyBusinessesInputEnvelope
    set?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    disconnect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    delete?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    connect?: employeesWhereUniqueInput | employeesWhereUniqueInput[]
    update?: employeesUpdateWithWhereUniqueWithoutBusinessesInput | employeesUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: employeesUpdateManyWithWhereWithoutBusinessesInput | employeesUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: employeesScalarWhereInput | employeesScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<reviewsCreateWithoutBusinessesInput, reviewsUncheckedCreateWithoutBusinessesInput> | reviewsCreateWithoutBusinessesInput[] | reviewsUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBusinessesInput | reviewsCreateOrConnectWithoutBusinessesInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutBusinessesInput | reviewsUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: reviewsCreateManyBusinessesInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutBusinessesInput | reviewsUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutBusinessesInput | reviewsUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type servicesUncheckedUpdateManyWithoutBusinessesNestedInput = {
    create?: XOR<servicesCreateWithoutBusinessesInput, servicesUncheckedCreateWithoutBusinessesInput> | servicesCreateWithoutBusinessesInput[] | servicesUncheckedCreateWithoutBusinessesInput[]
    connectOrCreate?: servicesCreateOrConnectWithoutBusinessesInput | servicesCreateOrConnectWithoutBusinessesInput[]
    upsert?: servicesUpsertWithWhereUniqueWithoutBusinessesInput | servicesUpsertWithWhereUniqueWithoutBusinessesInput[]
    createMany?: servicesCreateManyBusinessesInputEnvelope
    set?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    disconnect?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    delete?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    connect?: servicesWhereUniqueInput | servicesWhereUniqueInput[]
    update?: servicesUpdateWithWhereUniqueWithoutBusinessesInput | servicesUpdateWithWhereUniqueWithoutBusinessesInput[]
    updateMany?: servicesUpdateManyWithWhereWithoutBusinessesInput | servicesUpdateManyWithWhereWithoutBusinessesInput[]
    deleteMany?: servicesScalarWhereInput | servicesScalarWhereInput[]
  }

  export type bookingsCreateNestedManyWithoutEmployeesInput = {
    create?: XOR<bookingsCreateWithoutEmployeesInput, bookingsUncheckedCreateWithoutEmployeesInput> | bookingsCreateWithoutEmployeesInput[] | bookingsUncheckedCreateWithoutEmployeesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutEmployeesInput | bookingsCreateOrConnectWithoutEmployeesInput[]
    createMany?: bookingsCreateManyEmployeesInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type businessesCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<businessesCreateWithoutEmployeesInput, businessesUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: businessesCreateOrConnectWithoutEmployeesInput
    connect?: businessesWhereUniqueInput
  }

  export type bookingsUncheckedCreateNestedManyWithoutEmployeesInput = {
    create?: XOR<bookingsCreateWithoutEmployeesInput, bookingsUncheckedCreateWithoutEmployeesInput> | bookingsCreateWithoutEmployeesInput[] | bookingsUncheckedCreateWithoutEmployeesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutEmployeesInput | bookingsCreateOrConnectWithoutEmployeesInput[]
    createMany?: bookingsCreateManyEmployeesInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type bookingsUpdateManyWithoutEmployeesNestedInput = {
    create?: XOR<bookingsCreateWithoutEmployeesInput, bookingsUncheckedCreateWithoutEmployeesInput> | bookingsCreateWithoutEmployeesInput[] | bookingsUncheckedCreateWithoutEmployeesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutEmployeesInput | bookingsCreateOrConnectWithoutEmployeesInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutEmployeesInput | bookingsUpsertWithWhereUniqueWithoutEmployeesInput[]
    createMany?: bookingsCreateManyEmployeesInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutEmployeesInput | bookingsUpdateWithWhereUniqueWithoutEmployeesInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutEmployeesInput | bookingsUpdateManyWithWhereWithoutEmployeesInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type businessesUpdateOneRequiredWithoutEmployeesNestedInput = {
    create?: XOR<businessesCreateWithoutEmployeesInput, businessesUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: businessesCreateOrConnectWithoutEmployeesInput
    upsert?: businessesUpsertWithoutEmployeesInput
    connect?: businessesWhereUniqueInput
    update?: XOR<XOR<businessesUpdateToOneWithWhereWithoutEmployeesInput, businessesUpdateWithoutEmployeesInput>, businessesUncheckedUpdateWithoutEmployeesInput>
  }

  export type bookingsUncheckedUpdateManyWithoutEmployeesNestedInput = {
    create?: XOR<bookingsCreateWithoutEmployeesInput, bookingsUncheckedCreateWithoutEmployeesInput> | bookingsCreateWithoutEmployeesInput[] | bookingsUncheckedCreateWithoutEmployeesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutEmployeesInput | bookingsCreateOrConnectWithoutEmployeesInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutEmployeesInput | bookingsUpsertWithWhereUniqueWithoutEmployeesInput[]
    createMany?: bookingsCreateManyEmployeesInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutEmployeesInput | bookingsUpdateWithWhereUniqueWithoutEmployeesInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutEmployeesInput | bookingsUpdateManyWithWhereWithoutEmployeesInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type businessesCreateNestedOneWithoutReviewsInput = {
    create?: XOR<businessesCreateWithoutReviewsInput, businessesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: businessesCreateOrConnectWithoutReviewsInput
    connect?: businessesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutReviewsInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    connect?: usersWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type businessesUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<businessesCreateWithoutReviewsInput, businessesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: businessesCreateOrConnectWithoutReviewsInput
    upsert?: businessesUpsertWithoutReviewsInput
    connect?: businessesWhereUniqueInput
    update?: XOR<XOR<businessesUpdateToOneWithWhereWithoutReviewsInput, businessesUpdateWithoutReviewsInput>, businessesUncheckedUpdateWithoutReviewsInput>
  }

  export type usersUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    upsert?: usersUpsertWithoutReviewsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReviewsInput, usersUpdateWithoutReviewsInput>, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type bookingsCreateNestedManyWithoutServicesInput = {
    create?: XOR<bookingsCreateWithoutServicesInput, bookingsUncheckedCreateWithoutServicesInput> | bookingsCreateWithoutServicesInput[] | bookingsUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutServicesInput | bookingsCreateOrConnectWithoutServicesInput[]
    createMany?: bookingsCreateManyServicesInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type businessesCreateNestedOneWithoutServicesInput = {
    create?: XOR<businessesCreateWithoutServicesInput, businessesUncheckedCreateWithoutServicesInput>
    connectOrCreate?: businessesCreateOrConnectWithoutServicesInput
    connect?: businessesWhereUniqueInput
  }

  export type bookingsUncheckedCreateNestedManyWithoutServicesInput = {
    create?: XOR<bookingsCreateWithoutServicesInput, bookingsUncheckedCreateWithoutServicesInput> | bookingsCreateWithoutServicesInput[] | bookingsUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutServicesInput | bookingsCreateOrConnectWithoutServicesInput[]
    createMany?: bookingsCreateManyServicesInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type bookingsUpdateManyWithoutServicesNestedInput = {
    create?: XOR<bookingsCreateWithoutServicesInput, bookingsUncheckedCreateWithoutServicesInput> | bookingsCreateWithoutServicesInput[] | bookingsUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutServicesInput | bookingsCreateOrConnectWithoutServicesInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutServicesInput | bookingsUpsertWithWhereUniqueWithoutServicesInput[]
    createMany?: bookingsCreateManyServicesInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutServicesInput | bookingsUpdateWithWhereUniqueWithoutServicesInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutServicesInput | bookingsUpdateManyWithWhereWithoutServicesInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type businessesUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<businessesCreateWithoutServicesInput, businessesUncheckedCreateWithoutServicesInput>
    connectOrCreate?: businessesCreateOrConnectWithoutServicesInput
    upsert?: businessesUpsertWithoutServicesInput
    connect?: businessesWhereUniqueInput
    update?: XOR<XOR<businessesUpdateToOneWithWhereWithoutServicesInput, businessesUpdateWithoutServicesInput>, businessesUncheckedUpdateWithoutServicesInput>
  }

  export type bookingsUncheckedUpdateManyWithoutServicesNestedInput = {
    create?: XOR<bookingsCreateWithoutServicesInput, bookingsUncheckedCreateWithoutServicesInput> | bookingsCreateWithoutServicesInput[] | bookingsUncheckedCreateWithoutServicesInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutServicesInput | bookingsCreateOrConnectWithoutServicesInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutServicesInput | bookingsUpsertWithWhereUniqueWithoutServicesInput[]
    createMany?: bookingsCreateManyServicesInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutServicesInput | bookingsUpdateWithWhereUniqueWithoutServicesInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutServicesInput | bookingsUpdateManyWithWhereWithoutServicesInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type bookingsCreateNestedManyWithoutUsersInput = {
    create?: XOR<bookingsCreateWithoutUsersInput, bookingsUncheckedCreateWithoutUsersInput> | bookingsCreateWithoutUsersInput[] | bookingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUsersInput | bookingsCreateOrConnectWithoutUsersInput[]
    createMany?: bookingsCreateManyUsersInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type businessesCreateNestedManyWithoutUsersInput = {
    create?: XOR<businessesCreateWithoutUsersInput, businessesUncheckedCreateWithoutUsersInput> | businessesCreateWithoutUsersInput[] | businessesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: businessesCreateOrConnectWithoutUsersInput | businessesCreateOrConnectWithoutUsersInput[]
    createMany?: businessesCreateManyUsersInputEnvelope
    connect?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
  }

  export type reviewsCreateNestedManyWithoutUsersInput = {
    create?: XOR<reviewsCreateWithoutUsersInput, reviewsUncheckedCreateWithoutUsersInput> | reviewsCreateWithoutUsersInput[] | reviewsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUsersInput | reviewsCreateOrConnectWithoutUsersInput[]
    createMany?: reviewsCreateManyUsersInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type bookingsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<bookingsCreateWithoutUsersInput, bookingsUncheckedCreateWithoutUsersInput> | bookingsCreateWithoutUsersInput[] | bookingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUsersInput | bookingsCreateOrConnectWithoutUsersInput[]
    createMany?: bookingsCreateManyUsersInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type businessesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<businessesCreateWithoutUsersInput, businessesUncheckedCreateWithoutUsersInput> | businessesCreateWithoutUsersInput[] | businessesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: businessesCreateOrConnectWithoutUsersInput | businessesCreateOrConnectWithoutUsersInput[]
    createMany?: businessesCreateManyUsersInputEnvelope
    connect?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<reviewsCreateWithoutUsersInput, reviewsUncheckedCreateWithoutUsersInput> | reviewsCreateWithoutUsersInput[] | reviewsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUsersInput | reviewsCreateOrConnectWithoutUsersInput[]
    createMany?: reviewsCreateManyUsersInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type Enumusers_roleFieldUpdateOperationsInput = {
    set?: $Enums.users_role
  }

  export type bookingsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<bookingsCreateWithoutUsersInput, bookingsUncheckedCreateWithoutUsersInput> | bookingsCreateWithoutUsersInput[] | bookingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUsersInput | bookingsCreateOrConnectWithoutUsersInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutUsersInput | bookingsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: bookingsCreateManyUsersInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutUsersInput | bookingsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutUsersInput | bookingsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type businessesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<businessesCreateWithoutUsersInput, businessesUncheckedCreateWithoutUsersInput> | businessesCreateWithoutUsersInput[] | businessesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: businessesCreateOrConnectWithoutUsersInput | businessesCreateOrConnectWithoutUsersInput[]
    upsert?: businessesUpsertWithWhereUniqueWithoutUsersInput | businessesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: businessesCreateManyUsersInputEnvelope
    set?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    disconnect?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    delete?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    connect?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    update?: businessesUpdateWithWhereUniqueWithoutUsersInput | businessesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: businessesUpdateManyWithWhereWithoutUsersInput | businessesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: businessesScalarWhereInput | businessesScalarWhereInput[]
  }

  export type reviewsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<reviewsCreateWithoutUsersInput, reviewsUncheckedCreateWithoutUsersInput> | reviewsCreateWithoutUsersInput[] | reviewsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUsersInput | reviewsCreateOrConnectWithoutUsersInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUsersInput | reviewsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: reviewsCreateManyUsersInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUsersInput | reviewsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUsersInput | reviewsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type bookingsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<bookingsCreateWithoutUsersInput, bookingsUncheckedCreateWithoutUsersInput> | bookingsCreateWithoutUsersInput[] | bookingsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUsersInput | bookingsCreateOrConnectWithoutUsersInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutUsersInput | bookingsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: bookingsCreateManyUsersInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutUsersInput | bookingsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutUsersInput | bookingsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type businessesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<businessesCreateWithoutUsersInput, businessesUncheckedCreateWithoutUsersInput> | businessesCreateWithoutUsersInput[] | businessesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: businessesCreateOrConnectWithoutUsersInput | businessesCreateOrConnectWithoutUsersInput[]
    upsert?: businessesUpsertWithWhereUniqueWithoutUsersInput | businessesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: businessesCreateManyUsersInputEnvelope
    set?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    disconnect?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    delete?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    connect?: businessesWhereUniqueInput | businessesWhereUniqueInput[]
    update?: businessesUpdateWithWhereUniqueWithoutUsersInput | businessesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: businessesUpdateManyWithWhereWithoutUsersInput | businessesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: businessesScalarWhereInput | businessesScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<reviewsCreateWithoutUsersInput, reviewsUncheckedCreateWithoutUsersInput> | reviewsCreateWithoutUsersInput[] | reviewsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUsersInput | reviewsCreateOrConnectWithoutUsersInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUsersInput | reviewsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: reviewsCreateManyUsersInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUsersInput | reviewsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUsersInput | reviewsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumbookings_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.bookings_status | Enumbookings_statusFieldRefInput<$PrismaModel>
    in?: $Enums.bookings_status[]
    notIn?: $Enums.bookings_status[]
    not?: NestedEnumbookings_statusFilter<$PrismaModel> | $Enums.bookings_status
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumbookings_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.bookings_status | Enumbookings_statusFieldRefInput<$PrismaModel>
    in?: $Enums.bookings_status[]
    notIn?: $Enums.bookings_status[]
    not?: NestedEnumbookings_statusWithAggregatesFilter<$PrismaModel> | $Enums.bookings_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumbookings_statusFilter<$PrismaModel>
    _max?: NestedEnumbookings_statusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
  }

  export type NestedEnumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
  }

  export type employeesCreateWithoutBookingsInput = {
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    businesses: businessesCreateNestedOneWithoutEmployeesInput
  }

  export type employeesUncheckedCreateWithoutBookingsInput = {
    id?: number
    business_id: number
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type employeesCreateOrConnectWithoutBookingsInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutBookingsInput, employeesUncheckedCreateWithoutBookingsInput>
  }

  export type usersCreateWithoutBookingsInput = {
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    businesses?: businessesCreateNestedManyWithoutUsersInput
    reviews?: reviewsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutBookingsInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    businesses?: businessesUncheckedCreateNestedManyWithoutUsersInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutBookingsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
  }

  export type businessesCreateWithoutBookingsInput = {
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    users: usersCreateNestedOneWithoutBusinessesInput
    employees?: employeesCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsCreateNestedManyWithoutBusinessesInput
    services?: servicesCreateNestedManyWithoutBusinessesInput
  }

  export type businessesUncheckedCreateWithoutBookingsInput = {
    id?: number
    user_id: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    employees?: employeesUncheckedCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBusinessesInput
    services?: servicesUncheckedCreateNestedManyWithoutBusinessesInput
  }

  export type businessesCreateOrConnectWithoutBookingsInput = {
    where: businessesWhereUniqueInput
    create: XOR<businessesCreateWithoutBookingsInput, businessesUncheckedCreateWithoutBookingsInput>
  }

  export type servicesCreateWithoutBookingsInput = {
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    businesses: businessesCreateNestedOneWithoutServicesInput
  }

  export type servicesUncheckedCreateWithoutBookingsInput = {
    id?: number
    business_id: number
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
  }

  export type servicesCreateOrConnectWithoutBookingsInput = {
    where: servicesWhereUniqueInput
    create: XOR<servicesCreateWithoutBookingsInput, servicesUncheckedCreateWithoutBookingsInput>
  }

  export type employeesUpsertWithoutBookingsInput = {
    update: XOR<employeesUpdateWithoutBookingsInput, employeesUncheckedUpdateWithoutBookingsInput>
    create: XOR<employeesCreateWithoutBookingsInput, employeesUncheckedCreateWithoutBookingsInput>
    where?: employeesWhereInput
  }

  export type employeesUpdateToOneWithWhereWithoutBookingsInput = {
    where?: employeesWhereInput
    data: XOR<employeesUpdateWithoutBookingsInput, employeesUncheckedUpdateWithoutBookingsInput>
  }

  export type employeesUpdateWithoutBookingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    businesses?: businessesUpdateOneRequiredWithoutEmployeesNestedInput
  }

  export type employeesUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUpsertWithoutBookingsInput = {
    update: XOR<usersUpdateWithoutBookingsInput, usersUncheckedUpdateWithoutBookingsInput>
    create: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBookingsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBookingsInput, usersUncheckedUpdateWithoutBookingsInput>
  }

  export type usersUpdateWithoutBookingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    businesses?: businessesUpdateManyWithoutUsersNestedInput
    reviews?: reviewsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    businesses?: businessesUncheckedUpdateManyWithoutUsersNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type businessesUpsertWithoutBookingsInput = {
    update: XOR<businessesUpdateWithoutBookingsInput, businessesUncheckedUpdateWithoutBookingsInput>
    create: XOR<businessesCreateWithoutBookingsInput, businessesUncheckedCreateWithoutBookingsInput>
    where?: businessesWhereInput
  }

  export type businessesUpdateToOneWithWhereWithoutBookingsInput = {
    where?: businessesWhereInput
    data: XOR<businessesUpdateWithoutBookingsInput, businessesUncheckedUpdateWithoutBookingsInput>
  }

  export type businessesUpdateWithoutBookingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    users?: usersUpdateOneRequiredWithoutBusinessesNestedInput
    employees?: employeesUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUpdateManyWithoutBusinessesNestedInput
    services?: servicesUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    employees?: employeesUncheckedUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBusinessesNestedInput
    services?: servicesUncheckedUpdateManyWithoutBusinessesNestedInput
  }

  export type servicesUpsertWithoutBookingsInput = {
    update: XOR<servicesUpdateWithoutBookingsInput, servicesUncheckedUpdateWithoutBookingsInput>
    create: XOR<servicesCreateWithoutBookingsInput, servicesUncheckedCreateWithoutBookingsInput>
    where?: servicesWhereInput
  }

  export type servicesUpdateToOneWithWhereWithoutBookingsInput = {
    where?: servicesWhereInput
    data: XOR<servicesUpdateWithoutBookingsInput, servicesUncheckedUpdateWithoutBookingsInput>
  }

  export type servicesUpdateWithoutBookingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    businesses?: businessesUpdateOneRequiredWithoutServicesNestedInput
  }

  export type servicesUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsCreateWithoutBusinessesInput = {
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
    employees?: employeesCreateNestedOneWithoutBookingsInput
    users: usersCreateNestedOneWithoutBookingsInput
    services: servicesCreateNestedOneWithoutBookingsInput
  }

  export type bookingsUncheckedCreateWithoutBusinessesInput = {
    id?: number
    user_id: number
    service_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsCreateOrConnectWithoutBusinessesInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutBusinessesInput, bookingsUncheckedCreateWithoutBusinessesInput>
  }

  export type bookingsCreateManyBusinessesInputEnvelope = {
    data: bookingsCreateManyBusinessesInput | bookingsCreateManyBusinessesInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutBusinessesInput = {
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    bookings?: bookingsCreateNestedManyWithoutUsersInput
    reviews?: reviewsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutBusinessesInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutUsersInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutBusinessesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBusinessesInput, usersUncheckedCreateWithoutBusinessesInput>
  }

  export type employeesCreateWithoutBusinessesInput = {
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    bookings?: bookingsCreateNestedManyWithoutEmployeesInput
  }

  export type employeesUncheckedCreateWithoutBusinessesInput = {
    id?: number
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutEmployeesInput
  }

  export type employeesCreateOrConnectWithoutBusinessesInput = {
    where: employeesWhereUniqueInput
    create: XOR<employeesCreateWithoutBusinessesInput, employeesUncheckedCreateWithoutBusinessesInput>
  }

  export type employeesCreateManyBusinessesInputEnvelope = {
    data: employeesCreateManyBusinessesInput | employeesCreateManyBusinessesInput[]
    skipDuplicates?: boolean
  }

  export type reviewsCreateWithoutBusinessesInput = {
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutBusinessesInput = {
    id?: number
    user_id: number
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
  }

  export type reviewsCreateOrConnectWithoutBusinessesInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutBusinessesInput, reviewsUncheckedCreateWithoutBusinessesInput>
  }

  export type reviewsCreateManyBusinessesInputEnvelope = {
    data: reviewsCreateManyBusinessesInput | reviewsCreateManyBusinessesInput[]
    skipDuplicates?: boolean
  }

  export type servicesCreateWithoutBusinessesInput = {
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    bookings?: bookingsCreateNestedManyWithoutServicesInput
  }

  export type servicesUncheckedCreateWithoutBusinessesInput = {
    id?: number
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutServicesInput
  }

  export type servicesCreateOrConnectWithoutBusinessesInput = {
    where: servicesWhereUniqueInput
    create: XOR<servicesCreateWithoutBusinessesInput, servicesUncheckedCreateWithoutBusinessesInput>
  }

  export type servicesCreateManyBusinessesInputEnvelope = {
    data: servicesCreateManyBusinessesInput | servicesCreateManyBusinessesInput[]
    skipDuplicates?: boolean
  }

  export type bookingsUpsertWithWhereUniqueWithoutBusinessesInput = {
    where: bookingsWhereUniqueInput
    update: XOR<bookingsUpdateWithoutBusinessesInput, bookingsUncheckedUpdateWithoutBusinessesInput>
    create: XOR<bookingsCreateWithoutBusinessesInput, bookingsUncheckedCreateWithoutBusinessesInput>
  }

  export type bookingsUpdateWithWhereUniqueWithoutBusinessesInput = {
    where: bookingsWhereUniqueInput
    data: XOR<bookingsUpdateWithoutBusinessesInput, bookingsUncheckedUpdateWithoutBusinessesInput>
  }

  export type bookingsUpdateManyWithWhereWithoutBusinessesInput = {
    where: bookingsScalarWhereInput
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyWithoutBusinessesInput>
  }

  export type bookingsScalarWhereInput = {
    AND?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
    OR?: bookingsScalarWhereInput[]
    NOT?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
    id?: IntFilter<"bookings"> | number
    user_id?: IntFilter<"bookings"> | number
    business_id?: IntFilter<"bookings"> | number
    service_id?: IntFilter<"bookings"> | number
    employee_id?: IntNullableFilter<"bookings"> | number | null
    booking_date?: DateTimeFilter<"bookings"> | Date | string
    booking_time?: DateTimeFilter<"bookings"> | Date | string
    status?: Enumbookings_statusFilter<"bookings"> | $Enums.bookings_status
    notes?: StringNullableFilter<"bookings"> | string | null
    created_at?: DateTimeNullableFilter<"bookings"> | Date | string | null
  }

  export type usersUpsertWithoutBusinessesInput = {
    update: XOR<usersUpdateWithoutBusinessesInput, usersUncheckedUpdateWithoutBusinessesInput>
    create: XOR<usersCreateWithoutBusinessesInput, usersUncheckedCreateWithoutBusinessesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBusinessesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBusinessesInput, usersUncheckedUpdateWithoutBusinessesInput>
  }

  export type usersUpdateWithoutBusinessesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: bookingsUpdateManyWithoutUsersNestedInput
    reviews?: reviewsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutUsersNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type employeesUpsertWithWhereUniqueWithoutBusinessesInput = {
    where: employeesWhereUniqueInput
    update: XOR<employeesUpdateWithoutBusinessesInput, employeesUncheckedUpdateWithoutBusinessesInput>
    create: XOR<employeesCreateWithoutBusinessesInput, employeesUncheckedCreateWithoutBusinessesInput>
  }

  export type employeesUpdateWithWhereUniqueWithoutBusinessesInput = {
    where: employeesWhereUniqueInput
    data: XOR<employeesUpdateWithoutBusinessesInput, employeesUncheckedUpdateWithoutBusinessesInput>
  }

  export type employeesUpdateManyWithWhereWithoutBusinessesInput = {
    where: employeesScalarWhereInput
    data: XOR<employeesUpdateManyMutationInput, employeesUncheckedUpdateManyWithoutBusinessesInput>
  }

  export type employeesScalarWhereInput = {
    AND?: employeesScalarWhereInput | employeesScalarWhereInput[]
    OR?: employeesScalarWhereInput[]
    NOT?: employeesScalarWhereInput | employeesScalarWhereInput[]
    id?: IntFilter<"employees"> | number
    business_id?: IntFilter<"employees"> | number
    name?: StringFilter<"employees"> | string
    position?: StringNullableFilter<"employees"> | string | null
    specialties?: StringNullableFilter<"employees"> | string | null
    profile_image?: StringNullableFilter<"employees"> | string | null
    created_at?: DateTimeNullableFilter<"employees"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"employees"> | Date | string | null
  }

  export type reviewsUpsertWithWhereUniqueWithoutBusinessesInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutBusinessesInput, reviewsUncheckedUpdateWithoutBusinessesInput>
    create: XOR<reviewsCreateWithoutBusinessesInput, reviewsUncheckedCreateWithoutBusinessesInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutBusinessesInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutBusinessesInput, reviewsUncheckedUpdateWithoutBusinessesInput>
  }

  export type reviewsUpdateManyWithWhereWithoutBusinessesInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutBusinessesInput>
  }

  export type reviewsScalarWhereInput = {
    AND?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    OR?: reviewsScalarWhereInput[]
    NOT?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    id?: IntFilter<"reviews"> | number
    business_id?: IntFilter<"reviews"> | number
    user_id?: IntFilter<"reviews"> | number
    rating?: DecimalFilter<"reviews"> | Decimal | DecimalJsLike | number | string
    comment?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeNullableFilter<"reviews"> | Date | string | null
  }

  export type servicesUpsertWithWhereUniqueWithoutBusinessesInput = {
    where: servicesWhereUniqueInput
    update: XOR<servicesUpdateWithoutBusinessesInput, servicesUncheckedUpdateWithoutBusinessesInput>
    create: XOR<servicesCreateWithoutBusinessesInput, servicesUncheckedCreateWithoutBusinessesInput>
  }

  export type servicesUpdateWithWhereUniqueWithoutBusinessesInput = {
    where: servicesWhereUniqueInput
    data: XOR<servicesUpdateWithoutBusinessesInput, servicesUncheckedUpdateWithoutBusinessesInput>
  }

  export type servicesUpdateManyWithWhereWithoutBusinessesInput = {
    where: servicesScalarWhereInput
    data: XOR<servicesUpdateManyMutationInput, servicesUncheckedUpdateManyWithoutBusinessesInput>
  }

  export type servicesScalarWhereInput = {
    AND?: servicesScalarWhereInput | servicesScalarWhereInput[]
    OR?: servicesScalarWhereInput[]
    NOT?: servicesScalarWhereInput | servicesScalarWhereInput[]
    id?: IntFilter<"services"> | number
    business_id?: IntFilter<"services"> | number
    name?: StringFilter<"services"> | string
    description?: StringNullableFilter<"services"> | string | null
    duration_minutes?: IntFilter<"services"> | number
    category?: StringNullableFilter<"services"> | string | null
    price?: DecimalFilter<"services"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"services"> | Date | string | null
  }

  export type bookingsCreateWithoutEmployeesInput = {
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutBookingsInput
    businesses: businessesCreateNestedOneWithoutBookingsInput
    services: servicesCreateNestedOneWithoutBookingsInput
  }

  export type bookingsUncheckedCreateWithoutEmployeesInput = {
    id?: number
    user_id: number
    business_id: number
    service_id: number
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsCreateOrConnectWithoutEmployeesInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutEmployeesInput, bookingsUncheckedCreateWithoutEmployeesInput>
  }

  export type bookingsCreateManyEmployeesInputEnvelope = {
    data: bookingsCreateManyEmployeesInput | bookingsCreateManyEmployeesInput[]
    skipDuplicates?: boolean
  }

  export type businessesCreateWithoutEmployeesInput = {
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsCreateNestedManyWithoutBusinessesInput
    users: usersCreateNestedOneWithoutBusinessesInput
    reviews?: reviewsCreateNestedManyWithoutBusinessesInput
    services?: servicesCreateNestedManyWithoutBusinessesInput
  }

  export type businessesUncheckedCreateWithoutEmployeesInput = {
    id?: number
    user_id: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBusinessesInput
    services?: servicesUncheckedCreateNestedManyWithoutBusinessesInput
  }

  export type businessesCreateOrConnectWithoutEmployeesInput = {
    where: businessesWhereUniqueInput
    create: XOR<businessesCreateWithoutEmployeesInput, businessesUncheckedCreateWithoutEmployeesInput>
  }

  export type bookingsUpsertWithWhereUniqueWithoutEmployeesInput = {
    where: bookingsWhereUniqueInput
    update: XOR<bookingsUpdateWithoutEmployeesInput, bookingsUncheckedUpdateWithoutEmployeesInput>
    create: XOR<bookingsCreateWithoutEmployeesInput, bookingsUncheckedCreateWithoutEmployeesInput>
  }

  export type bookingsUpdateWithWhereUniqueWithoutEmployeesInput = {
    where: bookingsWhereUniqueInput
    data: XOR<bookingsUpdateWithoutEmployeesInput, bookingsUncheckedUpdateWithoutEmployeesInput>
  }

  export type bookingsUpdateManyWithWhereWithoutEmployeesInput = {
    where: bookingsScalarWhereInput
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyWithoutEmployeesInput>
  }

  export type businessesUpsertWithoutEmployeesInput = {
    update: XOR<businessesUpdateWithoutEmployeesInput, businessesUncheckedUpdateWithoutEmployeesInput>
    create: XOR<businessesCreateWithoutEmployeesInput, businessesUncheckedCreateWithoutEmployeesInput>
    where?: businessesWhereInput
  }

  export type businessesUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: businessesWhereInput
    data: XOR<businessesUpdateWithoutEmployeesInput, businessesUncheckedUpdateWithoutEmployeesInput>
  }

  export type businessesUpdateWithoutEmployeesInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUpdateManyWithoutBusinessesNestedInput
    users?: usersUpdateOneRequiredWithoutBusinessesNestedInput
    reviews?: reviewsUpdateManyWithoutBusinessesNestedInput
    services?: servicesUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesUncheckedUpdateWithoutEmployeesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUncheckedUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBusinessesNestedInput
    services?: servicesUncheckedUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesCreateWithoutReviewsInput = {
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsCreateNestedManyWithoutBusinessesInput
    users: usersCreateNestedOneWithoutBusinessesInput
    employees?: employeesCreateNestedManyWithoutBusinessesInput
    services?: servicesCreateNestedManyWithoutBusinessesInput
  }

  export type businessesUncheckedCreateWithoutReviewsInput = {
    id?: number
    user_id: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutBusinessesInput
    employees?: employeesUncheckedCreateNestedManyWithoutBusinessesInput
    services?: servicesUncheckedCreateNestedManyWithoutBusinessesInput
  }

  export type businessesCreateOrConnectWithoutReviewsInput = {
    where: businessesWhereUniqueInput
    create: XOR<businessesCreateWithoutReviewsInput, businessesUncheckedCreateWithoutReviewsInput>
  }

  export type usersCreateWithoutReviewsInput = {
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    bookings?: bookingsCreateNestedManyWithoutUsersInput
    businesses?: businessesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutReviewsInput = {
    id?: number
    name: string
    email: string
    password: string
    phone?: string | null
    role?: $Enums.users_role
    created_at?: Date | string | null
    google_id?: string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutUsersInput
    businesses?: businessesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutReviewsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
  }

  export type businessesUpsertWithoutReviewsInput = {
    update: XOR<businessesUpdateWithoutReviewsInput, businessesUncheckedUpdateWithoutReviewsInput>
    create: XOR<businessesCreateWithoutReviewsInput, businessesUncheckedCreateWithoutReviewsInput>
    where?: businessesWhereInput
  }

  export type businessesUpdateToOneWithWhereWithoutReviewsInput = {
    where?: businessesWhereInput
    data: XOR<businessesUpdateWithoutReviewsInput, businessesUncheckedUpdateWithoutReviewsInput>
  }

  export type businessesUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUpdateManyWithoutBusinessesNestedInput
    users?: usersUpdateOneRequiredWithoutBusinessesNestedInput
    employees?: employeesUpdateManyWithoutBusinessesNestedInput
    services?: servicesUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUncheckedUpdateManyWithoutBusinessesNestedInput
    employees?: employeesUncheckedUpdateManyWithoutBusinessesNestedInput
    services?: servicesUncheckedUpdateManyWithoutBusinessesNestedInput
  }

  export type usersUpsertWithoutReviewsInput = {
    update: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReviewsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type usersUpdateWithoutReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: bookingsUpdateManyWithoutUsersNestedInput
    businesses?: businessesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutUsersNestedInput
    businesses?: businessesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type bookingsCreateWithoutServicesInput = {
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
    employees?: employeesCreateNestedOneWithoutBookingsInput
    users: usersCreateNestedOneWithoutBookingsInput
    businesses: businessesCreateNestedOneWithoutBookingsInput
  }

  export type bookingsUncheckedCreateWithoutServicesInput = {
    id?: number
    user_id: number
    business_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsCreateOrConnectWithoutServicesInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutServicesInput, bookingsUncheckedCreateWithoutServicesInput>
  }

  export type bookingsCreateManyServicesInputEnvelope = {
    data: bookingsCreateManyServicesInput | bookingsCreateManyServicesInput[]
    skipDuplicates?: boolean
  }

  export type businessesCreateWithoutServicesInput = {
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsCreateNestedManyWithoutBusinessesInput
    users: usersCreateNestedOneWithoutBusinessesInput
    employees?: employeesCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsCreateNestedManyWithoutBusinessesInput
  }

  export type businessesUncheckedCreateWithoutServicesInput = {
    id?: number
    user_id: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutBusinessesInput
    employees?: employeesUncheckedCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBusinessesInput
  }

  export type businessesCreateOrConnectWithoutServicesInput = {
    where: businessesWhereUniqueInput
    create: XOR<businessesCreateWithoutServicesInput, businessesUncheckedCreateWithoutServicesInput>
  }

  export type bookingsUpsertWithWhereUniqueWithoutServicesInput = {
    where: bookingsWhereUniqueInput
    update: XOR<bookingsUpdateWithoutServicesInput, bookingsUncheckedUpdateWithoutServicesInput>
    create: XOR<bookingsCreateWithoutServicesInput, bookingsUncheckedCreateWithoutServicesInput>
  }

  export type bookingsUpdateWithWhereUniqueWithoutServicesInput = {
    where: bookingsWhereUniqueInput
    data: XOR<bookingsUpdateWithoutServicesInput, bookingsUncheckedUpdateWithoutServicesInput>
  }

  export type bookingsUpdateManyWithWhereWithoutServicesInput = {
    where: bookingsScalarWhereInput
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyWithoutServicesInput>
  }

  export type businessesUpsertWithoutServicesInput = {
    update: XOR<businessesUpdateWithoutServicesInput, businessesUncheckedUpdateWithoutServicesInput>
    create: XOR<businessesCreateWithoutServicesInput, businessesUncheckedCreateWithoutServicesInput>
    where?: businessesWhereInput
  }

  export type businessesUpdateToOneWithWhereWithoutServicesInput = {
    where?: businessesWhereInput
    data: XOR<businessesUpdateWithoutServicesInput, businessesUncheckedUpdateWithoutServicesInput>
  }

  export type businessesUpdateWithoutServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUpdateManyWithoutBusinessesNestedInput
    users?: usersUpdateOneRequiredWithoutBusinessesNestedInput
    employees?: employeesUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUncheckedUpdateManyWithoutBusinessesNestedInput
    employees?: employeesUncheckedUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBusinessesNestedInput
  }

  export type bookingsCreateWithoutUsersInput = {
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
    employees?: employeesCreateNestedOneWithoutBookingsInput
    businesses: businessesCreateNestedOneWithoutBookingsInput
    services: servicesCreateNestedOneWithoutBookingsInput
  }

  export type bookingsUncheckedCreateWithoutUsersInput = {
    id?: number
    business_id: number
    service_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsCreateOrConnectWithoutUsersInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutUsersInput, bookingsUncheckedCreateWithoutUsersInput>
  }

  export type bookingsCreateManyUsersInputEnvelope = {
    data: bookingsCreateManyUsersInput | bookingsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type businessesCreateWithoutUsersInput = {
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsCreateNestedManyWithoutBusinessesInput
    employees?: employeesCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsCreateNestedManyWithoutBusinessesInput
    services?: servicesCreateNestedManyWithoutBusinessesInput
  }

  export type businessesUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutBusinessesInput
    employees?: employeesUncheckedCreateNestedManyWithoutBusinessesInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBusinessesInput
    services?: servicesUncheckedCreateNestedManyWithoutBusinessesInput
  }

  export type businessesCreateOrConnectWithoutUsersInput = {
    where: businessesWhereUniqueInput
    create: XOR<businessesCreateWithoutUsersInput, businessesUncheckedCreateWithoutUsersInput>
  }

  export type businessesCreateManyUsersInputEnvelope = {
    data: businessesCreateManyUsersInput | businessesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type reviewsCreateWithoutUsersInput = {
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
    businesses: businessesCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutUsersInput = {
    id?: number
    business_id: number
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
  }

  export type reviewsCreateOrConnectWithoutUsersInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutUsersInput, reviewsUncheckedCreateWithoutUsersInput>
  }

  export type reviewsCreateManyUsersInputEnvelope = {
    data: reviewsCreateManyUsersInput | reviewsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type bookingsUpsertWithWhereUniqueWithoutUsersInput = {
    where: bookingsWhereUniqueInput
    update: XOR<bookingsUpdateWithoutUsersInput, bookingsUncheckedUpdateWithoutUsersInput>
    create: XOR<bookingsCreateWithoutUsersInput, bookingsUncheckedCreateWithoutUsersInput>
  }

  export type bookingsUpdateWithWhereUniqueWithoutUsersInput = {
    where: bookingsWhereUniqueInput
    data: XOR<bookingsUpdateWithoutUsersInput, bookingsUncheckedUpdateWithoutUsersInput>
  }

  export type bookingsUpdateManyWithWhereWithoutUsersInput = {
    where: bookingsScalarWhereInput
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyWithoutUsersInput>
  }

  export type businessesUpsertWithWhereUniqueWithoutUsersInput = {
    where: businessesWhereUniqueInput
    update: XOR<businessesUpdateWithoutUsersInput, businessesUncheckedUpdateWithoutUsersInput>
    create: XOR<businessesCreateWithoutUsersInput, businessesUncheckedCreateWithoutUsersInput>
  }

  export type businessesUpdateWithWhereUniqueWithoutUsersInput = {
    where: businessesWhereUniqueInput
    data: XOR<businessesUpdateWithoutUsersInput, businessesUncheckedUpdateWithoutUsersInput>
  }

  export type businessesUpdateManyWithWhereWithoutUsersInput = {
    where: businessesScalarWhereInput
    data: XOR<businessesUpdateManyMutationInput, businessesUncheckedUpdateManyWithoutUsersInput>
  }

  export type businessesScalarWhereInput = {
    AND?: businessesScalarWhereInput | businessesScalarWhereInput[]
    OR?: businessesScalarWhereInput[]
    NOT?: businessesScalarWhereInput | businessesScalarWhereInput[]
    id?: IntFilter<"businesses"> | number
    user_id?: IntFilter<"businesses"> | number
    name?: StringFilter<"businesses"> | string
    address?: StringNullableFilter<"businesses"> | string | null
    phone?: StringNullableFilter<"businesses"> | string | null
    email?: StringFilter<"businesses"> | string
    description?: StringNullableFilter<"businesses"> | string | null
    category?: StringNullableFilter<"businesses"> | string | null
    image?: StringNullableFilter<"businesses"> | string | null
    is_open?: BoolNullableFilter<"businesses"> | boolean | null
    created_at?: DateTimeNullableFilter<"businesses"> | Date | string | null
    opening_hours?: StringNullableFilter<"businesses"> | string | null
    is_featured?: BoolNullableFilter<"businesses"> | boolean | null
  }

  export type reviewsUpsertWithWhereUniqueWithoutUsersInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutUsersInput, reviewsUncheckedUpdateWithoutUsersInput>
    create: XOR<reviewsCreateWithoutUsersInput, reviewsUncheckedCreateWithoutUsersInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutUsersInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutUsersInput, reviewsUncheckedUpdateWithoutUsersInput>
  }

  export type reviewsUpdateManyWithWhereWithoutUsersInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutUsersInput>
  }

  export type bookingsCreateManyBusinessesInput = {
    id?: number
    user_id: number
    service_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type employeesCreateManyBusinessesInput = {
    id?: number
    name: string
    position?: string | null
    specialties?: string | null
    profile_image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reviewsCreateManyBusinessesInput = {
    id?: number
    user_id: number
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
  }

  export type servicesCreateManyBusinessesInput = {
    id?: number
    name: string
    description?: string | null
    duration_minutes: number
    category?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
  }

  export type bookingsUpdateWithoutBusinessesInput = {
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employees?: employeesUpdateOneWithoutBookingsNestedInput
    users?: usersUpdateOneRequiredWithoutBookingsNestedInput
    services?: servicesUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type bookingsUncheckedUpdateWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsUncheckedUpdateManyWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type employeesUpdateWithoutBusinessesInput = {
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUpdateManyWithoutEmployeesNestedInput
  }

  export type employeesUncheckedUpdateWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutEmployeesNestedInput
  }

  export type employeesUncheckedUpdateManyWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    position?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewsUpdateWithoutBusinessesInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewsUncheckedUpdateManyWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type servicesUpdateWithoutBusinessesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUpdateManyWithoutServicesNestedInput
  }

  export type servicesUncheckedUpdateWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutServicesNestedInput
  }

  export type servicesUncheckedUpdateManyWithoutBusinessesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsCreateManyEmployeesInput = {
    id?: number
    user_id: number
    business_id: number
    service_id: number
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsUpdateWithoutEmployeesInput = {
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutBookingsNestedInput
    businesses?: businessesUpdateOneRequiredWithoutBookingsNestedInput
    services?: servicesUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type bookingsUncheckedUpdateWithoutEmployeesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsUncheckedUpdateManyWithoutEmployeesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsCreateManyServicesInput = {
    id?: number
    user_id: number
    business_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type bookingsUpdateWithoutServicesInput = {
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employees?: employeesUpdateOneWithoutBookingsNestedInput
    users?: usersUpdateOneRequiredWithoutBookingsNestedInput
    businesses?: businessesUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type bookingsUncheckedUpdateWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsUncheckedUpdateManyWithoutServicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsCreateManyUsersInput = {
    id?: number
    business_id: number
    service_id: number
    employee_id?: number | null
    booking_date: Date | string
    booking_time: Date | string
    status?: $Enums.bookings_status
    notes?: string | null
    created_at?: Date | string | null
  }

  export type businessesCreateManyUsersInput = {
    id?: number
    name: string
    address?: string | null
    phone?: string | null
    email: string
    description?: string | null
    category?: string | null
    image?: string | null
    is_open?: boolean | null
    created_at?: Date | string | null
    opening_hours?: string | null
    is_featured?: boolean | null
  }

  export type reviewsCreateManyUsersInput = {
    id?: number
    business_id: number
    rating: Decimal | DecimalJsLike | number | string
    comment?: string | null
    created_at?: Date | string | null
  }

  export type bookingsUpdateWithoutUsersInput = {
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employees?: employeesUpdateOneWithoutBookingsNestedInput
    businesses?: businessesUpdateOneRequiredWithoutBookingsNestedInput
    services?: servicesUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type bookingsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bookingsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    service_id?: IntFieldUpdateOperationsInput | number
    employee_id?: NullableIntFieldUpdateOperationsInput | number | null
    booking_date?: DateTimeFieldUpdateOperationsInput | Date | string
    booking_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: Enumbookings_statusFieldUpdateOperationsInput | $Enums.bookings_status
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type businessesUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUpdateManyWithoutBusinessesNestedInput
    employees?: employeesUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUpdateManyWithoutBusinessesNestedInput
    services?: servicesUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bookings?: bookingsUncheckedUpdateManyWithoutBusinessesNestedInput
    employees?: employeesUncheckedUpdateManyWithoutBusinessesNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBusinessesNestedInput
    services?: servicesUncheckedUpdateManyWithoutBusinessesNestedInput
  }

  export type businessesUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    is_open?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opening_hours?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type reviewsUpdateWithoutUsersInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    businesses?: businessesUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    business_id?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}