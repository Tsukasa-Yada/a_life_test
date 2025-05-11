
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
 * Model AgeGroupSavings
 * 
 */
export type AgeGroupSavings = $Result.DefaultSelection<Prisma.$AgeGroupSavingsPayload>
/**
 * Model EducationDistribution
 * 
 */
export type EducationDistribution = $Result.DefaultSelection<Prisma.$EducationDistributionPayload>
/**
 * Model IncomeDistribution
 * 
 */
export type IncomeDistribution = $Result.DefaultSelection<Prisma.$IncomeDistributionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AgeGroupSavings
 * const ageGroupSavings = await prisma.ageGroupSavings.findMany()
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
   * // Fetch zero or more AgeGroupSavings
   * const ageGroupSavings = await prisma.ageGroupSavings.findMany()
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
   * `prisma.ageGroupSavings`: Exposes CRUD operations for the **AgeGroupSavings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgeGroupSavings
    * const ageGroupSavings = await prisma.ageGroupSavings.findMany()
    * ```
    */
  get ageGroupSavings(): Prisma.AgeGroupSavingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.educationDistribution`: Exposes CRUD operations for the **EducationDistribution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EducationDistributions
    * const educationDistributions = await prisma.educationDistribution.findMany()
    * ```
    */
  get educationDistribution(): Prisma.EducationDistributionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.incomeDistribution`: Exposes CRUD operations for the **IncomeDistribution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IncomeDistributions
    * const incomeDistributions = await prisma.incomeDistribution.findMany()
    * ```
    */
  get incomeDistribution(): Prisma.IncomeDistributionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
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
    AgeGroupSavings: 'AgeGroupSavings',
    EducationDistribution: 'EducationDistribution',
    IncomeDistribution: 'IncomeDistribution'
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
      modelProps: "ageGroupSavings" | "educationDistribution" | "incomeDistribution"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AgeGroupSavings: {
        payload: Prisma.$AgeGroupSavingsPayload<ExtArgs>
        fields: Prisma.AgeGroupSavingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgeGroupSavingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgeGroupSavingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>
          }
          findFirst: {
            args: Prisma.AgeGroupSavingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgeGroupSavingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>
          }
          findMany: {
            args: Prisma.AgeGroupSavingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>[]
          }
          create: {
            args: Prisma.AgeGroupSavingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>
          }
          createMany: {
            args: Prisma.AgeGroupSavingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgeGroupSavingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>[]
          }
          delete: {
            args: Prisma.AgeGroupSavingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>
          }
          update: {
            args: Prisma.AgeGroupSavingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>
          }
          deleteMany: {
            args: Prisma.AgeGroupSavingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgeGroupSavingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgeGroupSavingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>[]
          }
          upsert: {
            args: Prisma.AgeGroupSavingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgeGroupSavingsPayload>
          }
          aggregate: {
            args: Prisma.AgeGroupSavingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgeGroupSavings>
          }
          groupBy: {
            args: Prisma.AgeGroupSavingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgeGroupSavingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgeGroupSavingsCountArgs<ExtArgs>
            result: $Utils.Optional<AgeGroupSavingsCountAggregateOutputType> | number
          }
        }
      }
      EducationDistribution: {
        payload: Prisma.$EducationDistributionPayload<ExtArgs>
        fields: Prisma.EducationDistributionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EducationDistributionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EducationDistributionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>
          }
          findFirst: {
            args: Prisma.EducationDistributionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EducationDistributionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>
          }
          findMany: {
            args: Prisma.EducationDistributionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>[]
          }
          create: {
            args: Prisma.EducationDistributionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>
          }
          createMany: {
            args: Prisma.EducationDistributionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EducationDistributionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>[]
          }
          delete: {
            args: Prisma.EducationDistributionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>
          }
          update: {
            args: Prisma.EducationDistributionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>
          }
          deleteMany: {
            args: Prisma.EducationDistributionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EducationDistributionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EducationDistributionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>[]
          }
          upsert: {
            args: Prisma.EducationDistributionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EducationDistributionPayload>
          }
          aggregate: {
            args: Prisma.EducationDistributionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEducationDistribution>
          }
          groupBy: {
            args: Prisma.EducationDistributionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EducationDistributionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EducationDistributionCountArgs<ExtArgs>
            result: $Utils.Optional<EducationDistributionCountAggregateOutputType> | number
          }
        }
      }
      IncomeDistribution: {
        payload: Prisma.$IncomeDistributionPayload<ExtArgs>
        fields: Prisma.IncomeDistributionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IncomeDistributionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IncomeDistributionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>
          }
          findFirst: {
            args: Prisma.IncomeDistributionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IncomeDistributionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>
          }
          findMany: {
            args: Prisma.IncomeDistributionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>[]
          }
          create: {
            args: Prisma.IncomeDistributionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>
          }
          createMany: {
            args: Prisma.IncomeDistributionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IncomeDistributionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>[]
          }
          delete: {
            args: Prisma.IncomeDistributionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>
          }
          update: {
            args: Prisma.IncomeDistributionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>
          }
          deleteMany: {
            args: Prisma.IncomeDistributionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IncomeDistributionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IncomeDistributionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>[]
          }
          upsert: {
            args: Prisma.IncomeDistributionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeDistributionPayload>
          }
          aggregate: {
            args: Prisma.IncomeDistributionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIncomeDistribution>
          }
          groupBy: {
            args: Prisma.IncomeDistributionGroupByArgs<ExtArgs>
            result: $Utils.Optional<IncomeDistributionGroupByOutputType>[]
          }
          count: {
            args: Prisma.IncomeDistributionCountArgs<ExtArgs>
            result: $Utils.Optional<IncomeDistributionCountAggregateOutputType> | number
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
    ageGroupSavings?: AgeGroupSavingsOmit
    educationDistribution?: EducationDistributionOmit
    incomeDistribution?: IncomeDistributionOmit
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
   * Models
   */

  /**
   * Model AgeGroupSavings
   */

  export type AggregateAgeGroupSavings = {
    _count: AgeGroupSavingsCountAggregateOutputType | null
    _avg: AgeGroupSavingsAvgAggregateOutputType | null
    _sum: AgeGroupSavingsSumAggregateOutputType | null
    _min: AgeGroupSavingsMinAggregateOutputType | null
    _max: AgeGroupSavingsMaxAggregateOutputType | null
  }

  export type AgeGroupSavingsAvgAggregateOutputType = {
    savings: number | null
  }

  export type AgeGroupSavingsSumAggregateOutputType = {
    savings: number | null
  }

  export type AgeGroupSavingsMinAggregateOutputType = {
    ageGroup: string | null
    savings: number | null
  }

  export type AgeGroupSavingsMaxAggregateOutputType = {
    ageGroup: string | null
    savings: number | null
  }

  export type AgeGroupSavingsCountAggregateOutputType = {
    ageGroup: number
    savings: number
    _all: number
  }


  export type AgeGroupSavingsAvgAggregateInputType = {
    savings?: true
  }

  export type AgeGroupSavingsSumAggregateInputType = {
    savings?: true
  }

  export type AgeGroupSavingsMinAggregateInputType = {
    ageGroup?: true
    savings?: true
  }

  export type AgeGroupSavingsMaxAggregateInputType = {
    ageGroup?: true
    savings?: true
  }

  export type AgeGroupSavingsCountAggregateInputType = {
    ageGroup?: true
    savings?: true
    _all?: true
  }

  export type AgeGroupSavingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgeGroupSavings to aggregate.
     */
    where?: AgeGroupSavingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroupSavings to fetch.
     */
    orderBy?: AgeGroupSavingsOrderByWithRelationInput | AgeGroupSavingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgeGroupSavingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroupSavings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroupSavings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgeGroupSavings
    **/
    _count?: true | AgeGroupSavingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgeGroupSavingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgeGroupSavingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgeGroupSavingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgeGroupSavingsMaxAggregateInputType
  }

  export type GetAgeGroupSavingsAggregateType<T extends AgeGroupSavingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAgeGroupSavings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgeGroupSavings[P]>
      : GetScalarType<T[P], AggregateAgeGroupSavings[P]>
  }




  export type AgeGroupSavingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgeGroupSavingsWhereInput
    orderBy?: AgeGroupSavingsOrderByWithAggregationInput | AgeGroupSavingsOrderByWithAggregationInput[]
    by: AgeGroupSavingsScalarFieldEnum[] | AgeGroupSavingsScalarFieldEnum
    having?: AgeGroupSavingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgeGroupSavingsCountAggregateInputType | true
    _avg?: AgeGroupSavingsAvgAggregateInputType
    _sum?: AgeGroupSavingsSumAggregateInputType
    _min?: AgeGroupSavingsMinAggregateInputType
    _max?: AgeGroupSavingsMaxAggregateInputType
  }

  export type AgeGroupSavingsGroupByOutputType = {
    ageGroup: string
    savings: number
    _count: AgeGroupSavingsCountAggregateOutputType | null
    _avg: AgeGroupSavingsAvgAggregateOutputType | null
    _sum: AgeGroupSavingsSumAggregateOutputType | null
    _min: AgeGroupSavingsMinAggregateOutputType | null
    _max: AgeGroupSavingsMaxAggregateOutputType | null
  }

  type GetAgeGroupSavingsGroupByPayload<T extends AgeGroupSavingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgeGroupSavingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgeGroupSavingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgeGroupSavingsGroupByOutputType[P]>
            : GetScalarType<T[P], AgeGroupSavingsGroupByOutputType[P]>
        }
      >
    >


  export type AgeGroupSavingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageGroup?: boolean
    savings?: boolean
  }, ExtArgs["result"]["ageGroupSavings"]>

  export type AgeGroupSavingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageGroup?: boolean
    savings?: boolean
  }, ExtArgs["result"]["ageGroupSavings"]>

  export type AgeGroupSavingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageGroup?: boolean
    savings?: boolean
  }, ExtArgs["result"]["ageGroupSavings"]>

  export type AgeGroupSavingsSelectScalar = {
    ageGroup?: boolean
    savings?: boolean
  }

  export type AgeGroupSavingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ageGroup" | "savings", ExtArgs["result"]["ageGroupSavings"]>

  export type $AgeGroupSavingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgeGroupSavings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      ageGroup: string
      savings: number
    }, ExtArgs["result"]["ageGroupSavings"]>
    composites: {}
  }

  type AgeGroupSavingsGetPayload<S extends boolean | null | undefined | AgeGroupSavingsDefaultArgs> = $Result.GetResult<Prisma.$AgeGroupSavingsPayload, S>

  type AgeGroupSavingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgeGroupSavingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgeGroupSavingsCountAggregateInputType | true
    }

  export interface AgeGroupSavingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgeGroupSavings'], meta: { name: 'AgeGroupSavings' } }
    /**
     * Find zero or one AgeGroupSavings that matches the filter.
     * @param {AgeGroupSavingsFindUniqueArgs} args - Arguments to find a AgeGroupSavings
     * @example
     * // Get one AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgeGroupSavingsFindUniqueArgs>(args: SelectSubset<T, AgeGroupSavingsFindUniqueArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgeGroupSavings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgeGroupSavingsFindUniqueOrThrowArgs} args - Arguments to find a AgeGroupSavings
     * @example
     * // Get one AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgeGroupSavingsFindUniqueOrThrowArgs>(args: SelectSubset<T, AgeGroupSavingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgeGroupSavings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupSavingsFindFirstArgs} args - Arguments to find a AgeGroupSavings
     * @example
     * // Get one AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgeGroupSavingsFindFirstArgs>(args?: SelectSubset<T, AgeGroupSavingsFindFirstArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgeGroupSavings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupSavingsFindFirstOrThrowArgs} args - Arguments to find a AgeGroupSavings
     * @example
     * // Get one AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgeGroupSavingsFindFirstOrThrowArgs>(args?: SelectSubset<T, AgeGroupSavingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgeGroupSavings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupSavingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.findMany()
     * 
     * // Get first 10 AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.findMany({ take: 10 })
     * 
     * // Only select the `ageGroup`
     * const ageGroupSavingsWithAgeGroupOnly = await prisma.ageGroupSavings.findMany({ select: { ageGroup: true } })
     * 
     */
    findMany<T extends AgeGroupSavingsFindManyArgs>(args?: SelectSubset<T, AgeGroupSavingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgeGroupSavings.
     * @param {AgeGroupSavingsCreateArgs} args - Arguments to create a AgeGroupSavings.
     * @example
     * // Create one AgeGroupSavings
     * const AgeGroupSavings = await prisma.ageGroupSavings.create({
     *   data: {
     *     // ... data to create a AgeGroupSavings
     *   }
     * })
     * 
     */
    create<T extends AgeGroupSavingsCreateArgs>(args: SelectSubset<T, AgeGroupSavingsCreateArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgeGroupSavings.
     * @param {AgeGroupSavingsCreateManyArgs} args - Arguments to create many AgeGroupSavings.
     * @example
     * // Create many AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgeGroupSavingsCreateManyArgs>(args?: SelectSubset<T, AgeGroupSavingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgeGroupSavings and returns the data saved in the database.
     * @param {AgeGroupSavingsCreateManyAndReturnArgs} args - Arguments to create many AgeGroupSavings.
     * @example
     * // Create many AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgeGroupSavings and only return the `ageGroup`
     * const ageGroupSavingsWithAgeGroupOnly = await prisma.ageGroupSavings.createManyAndReturn({
     *   select: { ageGroup: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgeGroupSavingsCreateManyAndReturnArgs>(args?: SelectSubset<T, AgeGroupSavingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgeGroupSavings.
     * @param {AgeGroupSavingsDeleteArgs} args - Arguments to delete one AgeGroupSavings.
     * @example
     * // Delete one AgeGroupSavings
     * const AgeGroupSavings = await prisma.ageGroupSavings.delete({
     *   where: {
     *     // ... filter to delete one AgeGroupSavings
     *   }
     * })
     * 
     */
    delete<T extends AgeGroupSavingsDeleteArgs>(args: SelectSubset<T, AgeGroupSavingsDeleteArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgeGroupSavings.
     * @param {AgeGroupSavingsUpdateArgs} args - Arguments to update one AgeGroupSavings.
     * @example
     * // Update one AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgeGroupSavingsUpdateArgs>(args: SelectSubset<T, AgeGroupSavingsUpdateArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgeGroupSavings.
     * @param {AgeGroupSavingsDeleteManyArgs} args - Arguments to filter AgeGroupSavings to delete.
     * @example
     * // Delete a few AgeGroupSavings
     * const { count } = await prisma.ageGroupSavings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgeGroupSavingsDeleteManyArgs>(args?: SelectSubset<T, AgeGroupSavingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgeGroupSavings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupSavingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgeGroupSavingsUpdateManyArgs>(args: SelectSubset<T, AgeGroupSavingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgeGroupSavings and returns the data updated in the database.
     * @param {AgeGroupSavingsUpdateManyAndReturnArgs} args - Arguments to update many AgeGroupSavings.
     * @example
     * // Update many AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgeGroupSavings and only return the `ageGroup`
     * const ageGroupSavingsWithAgeGroupOnly = await prisma.ageGroupSavings.updateManyAndReturn({
     *   select: { ageGroup: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgeGroupSavingsUpdateManyAndReturnArgs>(args: SelectSubset<T, AgeGroupSavingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgeGroupSavings.
     * @param {AgeGroupSavingsUpsertArgs} args - Arguments to update or create a AgeGroupSavings.
     * @example
     * // Update or create a AgeGroupSavings
     * const ageGroupSavings = await prisma.ageGroupSavings.upsert({
     *   create: {
     *     // ... data to create a AgeGroupSavings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgeGroupSavings we want to update
     *   }
     * })
     */
    upsert<T extends AgeGroupSavingsUpsertArgs>(args: SelectSubset<T, AgeGroupSavingsUpsertArgs<ExtArgs>>): Prisma__AgeGroupSavingsClient<$Result.GetResult<Prisma.$AgeGroupSavingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgeGroupSavings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupSavingsCountArgs} args - Arguments to filter AgeGroupSavings to count.
     * @example
     * // Count the number of AgeGroupSavings
     * const count = await prisma.ageGroupSavings.count({
     *   where: {
     *     // ... the filter for the AgeGroupSavings we want to count
     *   }
     * })
    **/
    count<T extends AgeGroupSavingsCountArgs>(
      args?: Subset<T, AgeGroupSavingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgeGroupSavingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgeGroupSavings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupSavingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AgeGroupSavingsAggregateArgs>(args: Subset<T, AgeGroupSavingsAggregateArgs>): Prisma.PrismaPromise<GetAgeGroupSavingsAggregateType<T>>

    /**
     * Group by AgeGroupSavings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgeGroupSavingsGroupByArgs} args - Group by arguments.
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
      T extends AgeGroupSavingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgeGroupSavingsGroupByArgs['orderBy'] }
        : { orderBy?: AgeGroupSavingsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AgeGroupSavingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgeGroupSavingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgeGroupSavings model
   */
  readonly fields: AgeGroupSavingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgeGroupSavings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgeGroupSavingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AgeGroupSavings model
   */
  interface AgeGroupSavingsFieldRefs {
    readonly ageGroup: FieldRef<"AgeGroupSavings", 'String'>
    readonly savings: FieldRef<"AgeGroupSavings", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AgeGroupSavings findUnique
   */
  export type AgeGroupSavingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * Filter, which AgeGroupSavings to fetch.
     */
    where: AgeGroupSavingsWhereUniqueInput
  }

  /**
   * AgeGroupSavings findUniqueOrThrow
   */
  export type AgeGroupSavingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * Filter, which AgeGroupSavings to fetch.
     */
    where: AgeGroupSavingsWhereUniqueInput
  }

  /**
   * AgeGroupSavings findFirst
   */
  export type AgeGroupSavingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * Filter, which AgeGroupSavings to fetch.
     */
    where?: AgeGroupSavingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroupSavings to fetch.
     */
    orderBy?: AgeGroupSavingsOrderByWithRelationInput | AgeGroupSavingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgeGroupSavings.
     */
    cursor?: AgeGroupSavingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroupSavings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroupSavings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgeGroupSavings.
     */
    distinct?: AgeGroupSavingsScalarFieldEnum | AgeGroupSavingsScalarFieldEnum[]
  }

  /**
   * AgeGroupSavings findFirstOrThrow
   */
  export type AgeGroupSavingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * Filter, which AgeGroupSavings to fetch.
     */
    where?: AgeGroupSavingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroupSavings to fetch.
     */
    orderBy?: AgeGroupSavingsOrderByWithRelationInput | AgeGroupSavingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgeGroupSavings.
     */
    cursor?: AgeGroupSavingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroupSavings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroupSavings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgeGroupSavings.
     */
    distinct?: AgeGroupSavingsScalarFieldEnum | AgeGroupSavingsScalarFieldEnum[]
  }

  /**
   * AgeGroupSavings findMany
   */
  export type AgeGroupSavingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * Filter, which AgeGroupSavings to fetch.
     */
    where?: AgeGroupSavingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgeGroupSavings to fetch.
     */
    orderBy?: AgeGroupSavingsOrderByWithRelationInput | AgeGroupSavingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgeGroupSavings.
     */
    cursor?: AgeGroupSavingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgeGroupSavings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgeGroupSavings.
     */
    skip?: number
    distinct?: AgeGroupSavingsScalarFieldEnum | AgeGroupSavingsScalarFieldEnum[]
  }

  /**
   * AgeGroupSavings create
   */
  export type AgeGroupSavingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * The data needed to create a AgeGroupSavings.
     */
    data: XOR<AgeGroupSavingsCreateInput, AgeGroupSavingsUncheckedCreateInput>
  }

  /**
   * AgeGroupSavings createMany
   */
  export type AgeGroupSavingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgeGroupSavings.
     */
    data: AgeGroupSavingsCreateManyInput | AgeGroupSavingsCreateManyInput[]
  }

  /**
   * AgeGroupSavings createManyAndReturn
   */
  export type AgeGroupSavingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * The data used to create many AgeGroupSavings.
     */
    data: AgeGroupSavingsCreateManyInput | AgeGroupSavingsCreateManyInput[]
  }

  /**
   * AgeGroupSavings update
   */
  export type AgeGroupSavingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * The data needed to update a AgeGroupSavings.
     */
    data: XOR<AgeGroupSavingsUpdateInput, AgeGroupSavingsUncheckedUpdateInput>
    /**
     * Choose, which AgeGroupSavings to update.
     */
    where: AgeGroupSavingsWhereUniqueInput
  }

  /**
   * AgeGroupSavings updateMany
   */
  export type AgeGroupSavingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgeGroupSavings.
     */
    data: XOR<AgeGroupSavingsUpdateManyMutationInput, AgeGroupSavingsUncheckedUpdateManyInput>
    /**
     * Filter which AgeGroupSavings to update
     */
    where?: AgeGroupSavingsWhereInput
    /**
     * Limit how many AgeGroupSavings to update.
     */
    limit?: number
  }

  /**
   * AgeGroupSavings updateManyAndReturn
   */
  export type AgeGroupSavingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * The data used to update AgeGroupSavings.
     */
    data: XOR<AgeGroupSavingsUpdateManyMutationInput, AgeGroupSavingsUncheckedUpdateManyInput>
    /**
     * Filter which AgeGroupSavings to update
     */
    where?: AgeGroupSavingsWhereInput
    /**
     * Limit how many AgeGroupSavings to update.
     */
    limit?: number
  }

  /**
   * AgeGroupSavings upsert
   */
  export type AgeGroupSavingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * The filter to search for the AgeGroupSavings to update in case it exists.
     */
    where: AgeGroupSavingsWhereUniqueInput
    /**
     * In case the AgeGroupSavings found by the `where` argument doesn't exist, create a new AgeGroupSavings with this data.
     */
    create: XOR<AgeGroupSavingsCreateInput, AgeGroupSavingsUncheckedCreateInput>
    /**
     * In case the AgeGroupSavings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgeGroupSavingsUpdateInput, AgeGroupSavingsUncheckedUpdateInput>
  }

  /**
   * AgeGroupSavings delete
   */
  export type AgeGroupSavingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
    /**
     * Filter which AgeGroupSavings to delete.
     */
    where: AgeGroupSavingsWhereUniqueInput
  }

  /**
   * AgeGroupSavings deleteMany
   */
  export type AgeGroupSavingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgeGroupSavings to delete
     */
    where?: AgeGroupSavingsWhereInput
    /**
     * Limit how many AgeGroupSavings to delete.
     */
    limit?: number
  }

  /**
   * AgeGroupSavings without action
   */
  export type AgeGroupSavingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgeGroupSavings
     */
    select?: AgeGroupSavingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgeGroupSavings
     */
    omit?: AgeGroupSavingsOmit<ExtArgs> | null
  }


  /**
   * Model EducationDistribution
   */

  export type AggregateEducationDistribution = {
    _count: EducationDistributionCountAggregateOutputType | null
    _avg: EducationDistributionAvgAggregateOutputType | null
    _sum: EducationDistributionSumAggregateOutputType | null
    _min: EducationDistributionMinAggregateOutputType | null
    _max: EducationDistributionMaxAggregateOutputType | null
  }

  export type EducationDistributionAvgAggregateOutputType = {
    probability: number | null
  }

  export type EducationDistributionSumAggregateOutputType = {
    probability: number | null
  }

  export type EducationDistributionMinAggregateOutputType = {
    ageRange: string | null
    educationLevel: string | null
    probability: number | null
  }

  export type EducationDistributionMaxAggregateOutputType = {
    ageRange: string | null
    educationLevel: string | null
    probability: number | null
  }

  export type EducationDistributionCountAggregateOutputType = {
    ageRange: number
    educationLevel: number
    probability: number
    _all: number
  }


  export type EducationDistributionAvgAggregateInputType = {
    probability?: true
  }

  export type EducationDistributionSumAggregateInputType = {
    probability?: true
  }

  export type EducationDistributionMinAggregateInputType = {
    ageRange?: true
    educationLevel?: true
    probability?: true
  }

  export type EducationDistributionMaxAggregateInputType = {
    ageRange?: true
    educationLevel?: true
    probability?: true
  }

  export type EducationDistributionCountAggregateInputType = {
    ageRange?: true
    educationLevel?: true
    probability?: true
    _all?: true
  }

  export type EducationDistributionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EducationDistribution to aggregate.
     */
    where?: EducationDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EducationDistributions to fetch.
     */
    orderBy?: EducationDistributionOrderByWithRelationInput | EducationDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EducationDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EducationDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EducationDistributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EducationDistributions
    **/
    _count?: true | EducationDistributionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EducationDistributionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EducationDistributionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EducationDistributionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EducationDistributionMaxAggregateInputType
  }

  export type GetEducationDistributionAggregateType<T extends EducationDistributionAggregateArgs> = {
        [P in keyof T & keyof AggregateEducationDistribution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducationDistribution[P]>
      : GetScalarType<T[P], AggregateEducationDistribution[P]>
  }




  export type EducationDistributionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EducationDistributionWhereInput
    orderBy?: EducationDistributionOrderByWithAggregationInput | EducationDistributionOrderByWithAggregationInput[]
    by: EducationDistributionScalarFieldEnum[] | EducationDistributionScalarFieldEnum
    having?: EducationDistributionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EducationDistributionCountAggregateInputType | true
    _avg?: EducationDistributionAvgAggregateInputType
    _sum?: EducationDistributionSumAggregateInputType
    _min?: EducationDistributionMinAggregateInputType
    _max?: EducationDistributionMaxAggregateInputType
  }

  export type EducationDistributionGroupByOutputType = {
    ageRange: string
    educationLevel: string
    probability: number
    _count: EducationDistributionCountAggregateOutputType | null
    _avg: EducationDistributionAvgAggregateOutputType | null
    _sum: EducationDistributionSumAggregateOutputType | null
    _min: EducationDistributionMinAggregateOutputType | null
    _max: EducationDistributionMaxAggregateOutputType | null
  }

  type GetEducationDistributionGroupByPayload<T extends EducationDistributionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EducationDistributionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EducationDistributionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducationDistributionGroupByOutputType[P]>
            : GetScalarType<T[P], EducationDistributionGroupByOutputType[P]>
        }
      >
    >


  export type EducationDistributionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageRange?: boolean
    educationLevel?: boolean
    probability?: boolean
  }, ExtArgs["result"]["educationDistribution"]>

  export type EducationDistributionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageRange?: boolean
    educationLevel?: boolean
    probability?: boolean
  }, ExtArgs["result"]["educationDistribution"]>

  export type EducationDistributionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageRange?: boolean
    educationLevel?: boolean
    probability?: boolean
  }, ExtArgs["result"]["educationDistribution"]>

  export type EducationDistributionSelectScalar = {
    ageRange?: boolean
    educationLevel?: boolean
    probability?: boolean
  }

  export type EducationDistributionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ageRange" | "educationLevel" | "probability", ExtArgs["result"]["educationDistribution"]>

  export type $EducationDistributionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EducationDistribution"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      ageRange: string
      educationLevel: string
      probability: number
    }, ExtArgs["result"]["educationDistribution"]>
    composites: {}
  }

  type EducationDistributionGetPayload<S extends boolean | null | undefined | EducationDistributionDefaultArgs> = $Result.GetResult<Prisma.$EducationDistributionPayload, S>

  type EducationDistributionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EducationDistributionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EducationDistributionCountAggregateInputType | true
    }

  export interface EducationDistributionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EducationDistribution'], meta: { name: 'EducationDistribution' } }
    /**
     * Find zero or one EducationDistribution that matches the filter.
     * @param {EducationDistributionFindUniqueArgs} args - Arguments to find a EducationDistribution
     * @example
     * // Get one EducationDistribution
     * const educationDistribution = await prisma.educationDistribution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EducationDistributionFindUniqueArgs>(args: SelectSubset<T, EducationDistributionFindUniqueArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EducationDistribution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EducationDistributionFindUniqueOrThrowArgs} args - Arguments to find a EducationDistribution
     * @example
     * // Get one EducationDistribution
     * const educationDistribution = await prisma.educationDistribution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EducationDistributionFindUniqueOrThrowArgs>(args: SelectSubset<T, EducationDistributionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EducationDistribution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationDistributionFindFirstArgs} args - Arguments to find a EducationDistribution
     * @example
     * // Get one EducationDistribution
     * const educationDistribution = await prisma.educationDistribution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EducationDistributionFindFirstArgs>(args?: SelectSubset<T, EducationDistributionFindFirstArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EducationDistribution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationDistributionFindFirstOrThrowArgs} args - Arguments to find a EducationDistribution
     * @example
     * // Get one EducationDistribution
     * const educationDistribution = await prisma.educationDistribution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EducationDistributionFindFirstOrThrowArgs>(args?: SelectSubset<T, EducationDistributionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EducationDistributions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationDistributionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EducationDistributions
     * const educationDistributions = await prisma.educationDistribution.findMany()
     * 
     * // Get first 10 EducationDistributions
     * const educationDistributions = await prisma.educationDistribution.findMany({ take: 10 })
     * 
     * // Only select the `ageRange`
     * const educationDistributionWithAgeRangeOnly = await prisma.educationDistribution.findMany({ select: { ageRange: true } })
     * 
     */
    findMany<T extends EducationDistributionFindManyArgs>(args?: SelectSubset<T, EducationDistributionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EducationDistribution.
     * @param {EducationDistributionCreateArgs} args - Arguments to create a EducationDistribution.
     * @example
     * // Create one EducationDistribution
     * const EducationDistribution = await prisma.educationDistribution.create({
     *   data: {
     *     // ... data to create a EducationDistribution
     *   }
     * })
     * 
     */
    create<T extends EducationDistributionCreateArgs>(args: SelectSubset<T, EducationDistributionCreateArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EducationDistributions.
     * @param {EducationDistributionCreateManyArgs} args - Arguments to create many EducationDistributions.
     * @example
     * // Create many EducationDistributions
     * const educationDistribution = await prisma.educationDistribution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EducationDistributionCreateManyArgs>(args?: SelectSubset<T, EducationDistributionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EducationDistributions and returns the data saved in the database.
     * @param {EducationDistributionCreateManyAndReturnArgs} args - Arguments to create many EducationDistributions.
     * @example
     * // Create many EducationDistributions
     * const educationDistribution = await prisma.educationDistribution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EducationDistributions and only return the `ageRange`
     * const educationDistributionWithAgeRangeOnly = await prisma.educationDistribution.createManyAndReturn({
     *   select: { ageRange: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EducationDistributionCreateManyAndReturnArgs>(args?: SelectSubset<T, EducationDistributionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EducationDistribution.
     * @param {EducationDistributionDeleteArgs} args - Arguments to delete one EducationDistribution.
     * @example
     * // Delete one EducationDistribution
     * const EducationDistribution = await prisma.educationDistribution.delete({
     *   where: {
     *     // ... filter to delete one EducationDistribution
     *   }
     * })
     * 
     */
    delete<T extends EducationDistributionDeleteArgs>(args: SelectSubset<T, EducationDistributionDeleteArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EducationDistribution.
     * @param {EducationDistributionUpdateArgs} args - Arguments to update one EducationDistribution.
     * @example
     * // Update one EducationDistribution
     * const educationDistribution = await prisma.educationDistribution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EducationDistributionUpdateArgs>(args: SelectSubset<T, EducationDistributionUpdateArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EducationDistributions.
     * @param {EducationDistributionDeleteManyArgs} args - Arguments to filter EducationDistributions to delete.
     * @example
     * // Delete a few EducationDistributions
     * const { count } = await prisma.educationDistribution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EducationDistributionDeleteManyArgs>(args?: SelectSubset<T, EducationDistributionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EducationDistributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationDistributionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EducationDistributions
     * const educationDistribution = await prisma.educationDistribution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EducationDistributionUpdateManyArgs>(args: SelectSubset<T, EducationDistributionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EducationDistributions and returns the data updated in the database.
     * @param {EducationDistributionUpdateManyAndReturnArgs} args - Arguments to update many EducationDistributions.
     * @example
     * // Update many EducationDistributions
     * const educationDistribution = await prisma.educationDistribution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EducationDistributions and only return the `ageRange`
     * const educationDistributionWithAgeRangeOnly = await prisma.educationDistribution.updateManyAndReturn({
     *   select: { ageRange: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EducationDistributionUpdateManyAndReturnArgs>(args: SelectSubset<T, EducationDistributionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EducationDistribution.
     * @param {EducationDistributionUpsertArgs} args - Arguments to update or create a EducationDistribution.
     * @example
     * // Update or create a EducationDistribution
     * const educationDistribution = await prisma.educationDistribution.upsert({
     *   create: {
     *     // ... data to create a EducationDistribution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EducationDistribution we want to update
     *   }
     * })
     */
    upsert<T extends EducationDistributionUpsertArgs>(args: SelectSubset<T, EducationDistributionUpsertArgs<ExtArgs>>): Prisma__EducationDistributionClient<$Result.GetResult<Prisma.$EducationDistributionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EducationDistributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationDistributionCountArgs} args - Arguments to filter EducationDistributions to count.
     * @example
     * // Count the number of EducationDistributions
     * const count = await prisma.educationDistribution.count({
     *   where: {
     *     // ... the filter for the EducationDistributions we want to count
     *   }
     * })
    **/
    count<T extends EducationDistributionCountArgs>(
      args?: Subset<T, EducationDistributionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EducationDistributionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EducationDistribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationDistributionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EducationDistributionAggregateArgs>(args: Subset<T, EducationDistributionAggregateArgs>): Prisma.PrismaPromise<GetEducationDistributionAggregateType<T>>

    /**
     * Group by EducationDistribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationDistributionGroupByArgs} args - Group by arguments.
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
      T extends EducationDistributionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EducationDistributionGroupByArgs['orderBy'] }
        : { orderBy?: EducationDistributionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EducationDistributionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducationDistributionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EducationDistribution model
   */
  readonly fields: EducationDistributionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EducationDistribution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EducationDistributionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the EducationDistribution model
   */
  interface EducationDistributionFieldRefs {
    readonly ageRange: FieldRef<"EducationDistribution", 'String'>
    readonly educationLevel: FieldRef<"EducationDistribution", 'String'>
    readonly probability: FieldRef<"EducationDistribution", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * EducationDistribution findUnique
   */
  export type EducationDistributionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * Filter, which EducationDistribution to fetch.
     */
    where: EducationDistributionWhereUniqueInput
  }

  /**
   * EducationDistribution findUniqueOrThrow
   */
  export type EducationDistributionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * Filter, which EducationDistribution to fetch.
     */
    where: EducationDistributionWhereUniqueInput
  }

  /**
   * EducationDistribution findFirst
   */
  export type EducationDistributionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * Filter, which EducationDistribution to fetch.
     */
    where?: EducationDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EducationDistributions to fetch.
     */
    orderBy?: EducationDistributionOrderByWithRelationInput | EducationDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EducationDistributions.
     */
    cursor?: EducationDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EducationDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EducationDistributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EducationDistributions.
     */
    distinct?: EducationDistributionScalarFieldEnum | EducationDistributionScalarFieldEnum[]
  }

  /**
   * EducationDistribution findFirstOrThrow
   */
  export type EducationDistributionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * Filter, which EducationDistribution to fetch.
     */
    where?: EducationDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EducationDistributions to fetch.
     */
    orderBy?: EducationDistributionOrderByWithRelationInput | EducationDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EducationDistributions.
     */
    cursor?: EducationDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EducationDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EducationDistributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EducationDistributions.
     */
    distinct?: EducationDistributionScalarFieldEnum | EducationDistributionScalarFieldEnum[]
  }

  /**
   * EducationDistribution findMany
   */
  export type EducationDistributionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * Filter, which EducationDistributions to fetch.
     */
    where?: EducationDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EducationDistributions to fetch.
     */
    orderBy?: EducationDistributionOrderByWithRelationInput | EducationDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EducationDistributions.
     */
    cursor?: EducationDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EducationDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EducationDistributions.
     */
    skip?: number
    distinct?: EducationDistributionScalarFieldEnum | EducationDistributionScalarFieldEnum[]
  }

  /**
   * EducationDistribution create
   */
  export type EducationDistributionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * The data needed to create a EducationDistribution.
     */
    data: XOR<EducationDistributionCreateInput, EducationDistributionUncheckedCreateInput>
  }

  /**
   * EducationDistribution createMany
   */
  export type EducationDistributionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EducationDistributions.
     */
    data: EducationDistributionCreateManyInput | EducationDistributionCreateManyInput[]
  }

  /**
   * EducationDistribution createManyAndReturn
   */
  export type EducationDistributionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * The data used to create many EducationDistributions.
     */
    data: EducationDistributionCreateManyInput | EducationDistributionCreateManyInput[]
  }

  /**
   * EducationDistribution update
   */
  export type EducationDistributionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * The data needed to update a EducationDistribution.
     */
    data: XOR<EducationDistributionUpdateInput, EducationDistributionUncheckedUpdateInput>
    /**
     * Choose, which EducationDistribution to update.
     */
    where: EducationDistributionWhereUniqueInput
  }

  /**
   * EducationDistribution updateMany
   */
  export type EducationDistributionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EducationDistributions.
     */
    data: XOR<EducationDistributionUpdateManyMutationInput, EducationDistributionUncheckedUpdateManyInput>
    /**
     * Filter which EducationDistributions to update
     */
    where?: EducationDistributionWhereInput
    /**
     * Limit how many EducationDistributions to update.
     */
    limit?: number
  }

  /**
   * EducationDistribution updateManyAndReturn
   */
  export type EducationDistributionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * The data used to update EducationDistributions.
     */
    data: XOR<EducationDistributionUpdateManyMutationInput, EducationDistributionUncheckedUpdateManyInput>
    /**
     * Filter which EducationDistributions to update
     */
    where?: EducationDistributionWhereInput
    /**
     * Limit how many EducationDistributions to update.
     */
    limit?: number
  }

  /**
   * EducationDistribution upsert
   */
  export type EducationDistributionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * The filter to search for the EducationDistribution to update in case it exists.
     */
    where: EducationDistributionWhereUniqueInput
    /**
     * In case the EducationDistribution found by the `where` argument doesn't exist, create a new EducationDistribution with this data.
     */
    create: XOR<EducationDistributionCreateInput, EducationDistributionUncheckedCreateInput>
    /**
     * In case the EducationDistribution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EducationDistributionUpdateInput, EducationDistributionUncheckedUpdateInput>
  }

  /**
   * EducationDistribution delete
   */
  export type EducationDistributionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
    /**
     * Filter which EducationDistribution to delete.
     */
    where: EducationDistributionWhereUniqueInput
  }

  /**
   * EducationDistribution deleteMany
   */
  export type EducationDistributionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EducationDistributions to delete
     */
    where?: EducationDistributionWhereInput
    /**
     * Limit how many EducationDistributions to delete.
     */
    limit?: number
  }

  /**
   * EducationDistribution without action
   */
  export type EducationDistributionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationDistribution
     */
    select?: EducationDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EducationDistribution
     */
    omit?: EducationDistributionOmit<ExtArgs> | null
  }


  /**
   * Model IncomeDistribution
   */

  export type AggregateIncomeDistribution = {
    _count: IncomeDistributionCountAggregateOutputType | null
    _avg: IncomeDistributionAvgAggregateOutputType | null
    _sum: IncomeDistributionSumAggregateOutputType | null
    _min: IncomeDistributionMinAggregateOutputType | null
    _max: IncomeDistributionMaxAggregateOutputType | null
  }

  export type IncomeDistributionAvgAggregateOutputType = {
    baseIncome: number | null
    multiplier: number | null
  }

  export type IncomeDistributionSumAggregateOutputType = {
    baseIncome: number | null
    multiplier: number | null
  }

  export type IncomeDistributionMinAggregateOutputType = {
    ageRange: string | null
    educationLevel: string | null
    baseIncome: number | null
    multiplier: number | null
  }

  export type IncomeDistributionMaxAggregateOutputType = {
    ageRange: string | null
    educationLevel: string | null
    baseIncome: number | null
    multiplier: number | null
  }

  export type IncomeDistributionCountAggregateOutputType = {
    ageRange: number
    educationLevel: number
    baseIncome: number
    multiplier: number
    _all: number
  }


  export type IncomeDistributionAvgAggregateInputType = {
    baseIncome?: true
    multiplier?: true
  }

  export type IncomeDistributionSumAggregateInputType = {
    baseIncome?: true
    multiplier?: true
  }

  export type IncomeDistributionMinAggregateInputType = {
    ageRange?: true
    educationLevel?: true
    baseIncome?: true
    multiplier?: true
  }

  export type IncomeDistributionMaxAggregateInputType = {
    ageRange?: true
    educationLevel?: true
    baseIncome?: true
    multiplier?: true
  }

  export type IncomeDistributionCountAggregateInputType = {
    ageRange?: true
    educationLevel?: true
    baseIncome?: true
    multiplier?: true
    _all?: true
  }

  export type IncomeDistributionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IncomeDistribution to aggregate.
     */
    where?: IncomeDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeDistributions to fetch.
     */
    orderBy?: IncomeDistributionOrderByWithRelationInput | IncomeDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IncomeDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeDistributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IncomeDistributions
    **/
    _count?: true | IncomeDistributionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IncomeDistributionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IncomeDistributionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomeDistributionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomeDistributionMaxAggregateInputType
  }

  export type GetIncomeDistributionAggregateType<T extends IncomeDistributionAggregateArgs> = {
        [P in keyof T & keyof AggregateIncomeDistribution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncomeDistribution[P]>
      : GetScalarType<T[P], AggregateIncomeDistribution[P]>
  }




  export type IncomeDistributionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IncomeDistributionWhereInput
    orderBy?: IncomeDistributionOrderByWithAggregationInput | IncomeDistributionOrderByWithAggregationInput[]
    by: IncomeDistributionScalarFieldEnum[] | IncomeDistributionScalarFieldEnum
    having?: IncomeDistributionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomeDistributionCountAggregateInputType | true
    _avg?: IncomeDistributionAvgAggregateInputType
    _sum?: IncomeDistributionSumAggregateInputType
    _min?: IncomeDistributionMinAggregateInputType
    _max?: IncomeDistributionMaxAggregateInputType
  }

  export type IncomeDistributionGroupByOutputType = {
    ageRange: string
    educationLevel: string
    baseIncome: number
    multiplier: number
    _count: IncomeDistributionCountAggregateOutputType | null
    _avg: IncomeDistributionAvgAggregateOutputType | null
    _sum: IncomeDistributionSumAggregateOutputType | null
    _min: IncomeDistributionMinAggregateOutputType | null
    _max: IncomeDistributionMaxAggregateOutputType | null
  }

  type GetIncomeDistributionGroupByPayload<T extends IncomeDistributionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IncomeDistributionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IncomeDistributionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IncomeDistributionGroupByOutputType[P]>
            : GetScalarType<T[P], IncomeDistributionGroupByOutputType[P]>
        }
      >
    >


  export type IncomeDistributionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageRange?: boolean
    educationLevel?: boolean
    baseIncome?: boolean
    multiplier?: boolean
  }, ExtArgs["result"]["incomeDistribution"]>

  export type IncomeDistributionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageRange?: boolean
    educationLevel?: boolean
    baseIncome?: boolean
    multiplier?: boolean
  }, ExtArgs["result"]["incomeDistribution"]>

  export type IncomeDistributionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ageRange?: boolean
    educationLevel?: boolean
    baseIncome?: boolean
    multiplier?: boolean
  }, ExtArgs["result"]["incomeDistribution"]>

  export type IncomeDistributionSelectScalar = {
    ageRange?: boolean
    educationLevel?: boolean
    baseIncome?: boolean
    multiplier?: boolean
  }

  export type IncomeDistributionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ageRange" | "educationLevel" | "baseIncome" | "multiplier", ExtArgs["result"]["incomeDistribution"]>

  export type $IncomeDistributionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IncomeDistribution"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      ageRange: string
      educationLevel: string
      baseIncome: number
      multiplier: number
    }, ExtArgs["result"]["incomeDistribution"]>
    composites: {}
  }

  type IncomeDistributionGetPayload<S extends boolean | null | undefined | IncomeDistributionDefaultArgs> = $Result.GetResult<Prisma.$IncomeDistributionPayload, S>

  type IncomeDistributionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IncomeDistributionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IncomeDistributionCountAggregateInputType | true
    }

  export interface IncomeDistributionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IncomeDistribution'], meta: { name: 'IncomeDistribution' } }
    /**
     * Find zero or one IncomeDistribution that matches the filter.
     * @param {IncomeDistributionFindUniqueArgs} args - Arguments to find a IncomeDistribution
     * @example
     * // Get one IncomeDistribution
     * const incomeDistribution = await prisma.incomeDistribution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IncomeDistributionFindUniqueArgs>(args: SelectSubset<T, IncomeDistributionFindUniqueArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IncomeDistribution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IncomeDistributionFindUniqueOrThrowArgs} args - Arguments to find a IncomeDistribution
     * @example
     * // Get one IncomeDistribution
     * const incomeDistribution = await prisma.incomeDistribution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IncomeDistributionFindUniqueOrThrowArgs>(args: SelectSubset<T, IncomeDistributionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IncomeDistribution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDistributionFindFirstArgs} args - Arguments to find a IncomeDistribution
     * @example
     * // Get one IncomeDistribution
     * const incomeDistribution = await prisma.incomeDistribution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IncomeDistributionFindFirstArgs>(args?: SelectSubset<T, IncomeDistributionFindFirstArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IncomeDistribution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDistributionFindFirstOrThrowArgs} args - Arguments to find a IncomeDistribution
     * @example
     * // Get one IncomeDistribution
     * const incomeDistribution = await prisma.incomeDistribution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IncomeDistributionFindFirstOrThrowArgs>(args?: SelectSubset<T, IncomeDistributionFindFirstOrThrowArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IncomeDistributions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDistributionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IncomeDistributions
     * const incomeDistributions = await prisma.incomeDistribution.findMany()
     * 
     * // Get first 10 IncomeDistributions
     * const incomeDistributions = await prisma.incomeDistribution.findMany({ take: 10 })
     * 
     * // Only select the `ageRange`
     * const incomeDistributionWithAgeRangeOnly = await prisma.incomeDistribution.findMany({ select: { ageRange: true } })
     * 
     */
    findMany<T extends IncomeDistributionFindManyArgs>(args?: SelectSubset<T, IncomeDistributionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IncomeDistribution.
     * @param {IncomeDistributionCreateArgs} args - Arguments to create a IncomeDistribution.
     * @example
     * // Create one IncomeDistribution
     * const IncomeDistribution = await prisma.incomeDistribution.create({
     *   data: {
     *     // ... data to create a IncomeDistribution
     *   }
     * })
     * 
     */
    create<T extends IncomeDistributionCreateArgs>(args: SelectSubset<T, IncomeDistributionCreateArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IncomeDistributions.
     * @param {IncomeDistributionCreateManyArgs} args - Arguments to create many IncomeDistributions.
     * @example
     * // Create many IncomeDistributions
     * const incomeDistribution = await prisma.incomeDistribution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IncomeDistributionCreateManyArgs>(args?: SelectSubset<T, IncomeDistributionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IncomeDistributions and returns the data saved in the database.
     * @param {IncomeDistributionCreateManyAndReturnArgs} args - Arguments to create many IncomeDistributions.
     * @example
     * // Create many IncomeDistributions
     * const incomeDistribution = await prisma.incomeDistribution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IncomeDistributions and only return the `ageRange`
     * const incomeDistributionWithAgeRangeOnly = await prisma.incomeDistribution.createManyAndReturn({
     *   select: { ageRange: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IncomeDistributionCreateManyAndReturnArgs>(args?: SelectSubset<T, IncomeDistributionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IncomeDistribution.
     * @param {IncomeDistributionDeleteArgs} args - Arguments to delete one IncomeDistribution.
     * @example
     * // Delete one IncomeDistribution
     * const IncomeDistribution = await prisma.incomeDistribution.delete({
     *   where: {
     *     // ... filter to delete one IncomeDistribution
     *   }
     * })
     * 
     */
    delete<T extends IncomeDistributionDeleteArgs>(args: SelectSubset<T, IncomeDistributionDeleteArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IncomeDistribution.
     * @param {IncomeDistributionUpdateArgs} args - Arguments to update one IncomeDistribution.
     * @example
     * // Update one IncomeDistribution
     * const incomeDistribution = await prisma.incomeDistribution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IncomeDistributionUpdateArgs>(args: SelectSubset<T, IncomeDistributionUpdateArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IncomeDistributions.
     * @param {IncomeDistributionDeleteManyArgs} args - Arguments to filter IncomeDistributions to delete.
     * @example
     * // Delete a few IncomeDistributions
     * const { count } = await prisma.incomeDistribution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IncomeDistributionDeleteManyArgs>(args?: SelectSubset<T, IncomeDistributionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeDistributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDistributionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IncomeDistributions
     * const incomeDistribution = await prisma.incomeDistribution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IncomeDistributionUpdateManyArgs>(args: SelectSubset<T, IncomeDistributionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeDistributions and returns the data updated in the database.
     * @param {IncomeDistributionUpdateManyAndReturnArgs} args - Arguments to update many IncomeDistributions.
     * @example
     * // Update many IncomeDistributions
     * const incomeDistribution = await prisma.incomeDistribution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IncomeDistributions and only return the `ageRange`
     * const incomeDistributionWithAgeRangeOnly = await prisma.incomeDistribution.updateManyAndReturn({
     *   select: { ageRange: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IncomeDistributionUpdateManyAndReturnArgs>(args: SelectSubset<T, IncomeDistributionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IncomeDistribution.
     * @param {IncomeDistributionUpsertArgs} args - Arguments to update or create a IncomeDistribution.
     * @example
     * // Update or create a IncomeDistribution
     * const incomeDistribution = await prisma.incomeDistribution.upsert({
     *   create: {
     *     // ... data to create a IncomeDistribution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IncomeDistribution we want to update
     *   }
     * })
     */
    upsert<T extends IncomeDistributionUpsertArgs>(args: SelectSubset<T, IncomeDistributionUpsertArgs<ExtArgs>>): Prisma__IncomeDistributionClient<$Result.GetResult<Prisma.$IncomeDistributionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IncomeDistributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDistributionCountArgs} args - Arguments to filter IncomeDistributions to count.
     * @example
     * // Count the number of IncomeDistributions
     * const count = await prisma.incomeDistribution.count({
     *   where: {
     *     // ... the filter for the IncomeDistributions we want to count
     *   }
     * })
    **/
    count<T extends IncomeDistributionCountArgs>(
      args?: Subset<T, IncomeDistributionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncomeDistributionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IncomeDistribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDistributionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncomeDistributionAggregateArgs>(args: Subset<T, IncomeDistributionAggregateArgs>): Prisma.PrismaPromise<GetIncomeDistributionAggregateType<T>>

    /**
     * Group by IncomeDistribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDistributionGroupByArgs} args - Group by arguments.
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
      T extends IncomeDistributionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IncomeDistributionGroupByArgs['orderBy'] }
        : { orderBy?: IncomeDistributionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IncomeDistributionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeDistributionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IncomeDistribution model
   */
  readonly fields: IncomeDistributionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IncomeDistribution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IncomeDistributionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the IncomeDistribution model
   */
  interface IncomeDistributionFieldRefs {
    readonly ageRange: FieldRef<"IncomeDistribution", 'String'>
    readonly educationLevel: FieldRef<"IncomeDistribution", 'String'>
    readonly baseIncome: FieldRef<"IncomeDistribution", 'Int'>
    readonly multiplier: FieldRef<"IncomeDistribution", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * IncomeDistribution findUnique
   */
  export type IncomeDistributionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * Filter, which IncomeDistribution to fetch.
     */
    where: IncomeDistributionWhereUniqueInput
  }

  /**
   * IncomeDistribution findUniqueOrThrow
   */
  export type IncomeDistributionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * Filter, which IncomeDistribution to fetch.
     */
    where: IncomeDistributionWhereUniqueInput
  }

  /**
   * IncomeDistribution findFirst
   */
  export type IncomeDistributionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * Filter, which IncomeDistribution to fetch.
     */
    where?: IncomeDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeDistributions to fetch.
     */
    orderBy?: IncomeDistributionOrderByWithRelationInput | IncomeDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeDistributions.
     */
    cursor?: IncomeDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeDistributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeDistributions.
     */
    distinct?: IncomeDistributionScalarFieldEnum | IncomeDistributionScalarFieldEnum[]
  }

  /**
   * IncomeDistribution findFirstOrThrow
   */
  export type IncomeDistributionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * Filter, which IncomeDistribution to fetch.
     */
    where?: IncomeDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeDistributions to fetch.
     */
    orderBy?: IncomeDistributionOrderByWithRelationInput | IncomeDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeDistributions.
     */
    cursor?: IncomeDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeDistributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeDistributions.
     */
    distinct?: IncomeDistributionScalarFieldEnum | IncomeDistributionScalarFieldEnum[]
  }

  /**
   * IncomeDistribution findMany
   */
  export type IncomeDistributionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * Filter, which IncomeDistributions to fetch.
     */
    where?: IncomeDistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeDistributions to fetch.
     */
    orderBy?: IncomeDistributionOrderByWithRelationInput | IncomeDistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IncomeDistributions.
     */
    cursor?: IncomeDistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeDistributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeDistributions.
     */
    skip?: number
    distinct?: IncomeDistributionScalarFieldEnum | IncomeDistributionScalarFieldEnum[]
  }

  /**
   * IncomeDistribution create
   */
  export type IncomeDistributionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * The data needed to create a IncomeDistribution.
     */
    data: XOR<IncomeDistributionCreateInput, IncomeDistributionUncheckedCreateInput>
  }

  /**
   * IncomeDistribution createMany
   */
  export type IncomeDistributionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IncomeDistributions.
     */
    data: IncomeDistributionCreateManyInput | IncomeDistributionCreateManyInput[]
  }

  /**
   * IncomeDistribution createManyAndReturn
   */
  export type IncomeDistributionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * The data used to create many IncomeDistributions.
     */
    data: IncomeDistributionCreateManyInput | IncomeDistributionCreateManyInput[]
  }

  /**
   * IncomeDistribution update
   */
  export type IncomeDistributionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * The data needed to update a IncomeDistribution.
     */
    data: XOR<IncomeDistributionUpdateInput, IncomeDistributionUncheckedUpdateInput>
    /**
     * Choose, which IncomeDistribution to update.
     */
    where: IncomeDistributionWhereUniqueInput
  }

  /**
   * IncomeDistribution updateMany
   */
  export type IncomeDistributionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IncomeDistributions.
     */
    data: XOR<IncomeDistributionUpdateManyMutationInput, IncomeDistributionUncheckedUpdateManyInput>
    /**
     * Filter which IncomeDistributions to update
     */
    where?: IncomeDistributionWhereInput
    /**
     * Limit how many IncomeDistributions to update.
     */
    limit?: number
  }

  /**
   * IncomeDistribution updateManyAndReturn
   */
  export type IncomeDistributionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * The data used to update IncomeDistributions.
     */
    data: XOR<IncomeDistributionUpdateManyMutationInput, IncomeDistributionUncheckedUpdateManyInput>
    /**
     * Filter which IncomeDistributions to update
     */
    where?: IncomeDistributionWhereInput
    /**
     * Limit how many IncomeDistributions to update.
     */
    limit?: number
  }

  /**
   * IncomeDistribution upsert
   */
  export type IncomeDistributionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * The filter to search for the IncomeDistribution to update in case it exists.
     */
    where: IncomeDistributionWhereUniqueInput
    /**
     * In case the IncomeDistribution found by the `where` argument doesn't exist, create a new IncomeDistribution with this data.
     */
    create: XOR<IncomeDistributionCreateInput, IncomeDistributionUncheckedCreateInput>
    /**
     * In case the IncomeDistribution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IncomeDistributionUpdateInput, IncomeDistributionUncheckedUpdateInput>
  }

  /**
   * IncomeDistribution delete
   */
  export type IncomeDistributionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
    /**
     * Filter which IncomeDistribution to delete.
     */
    where: IncomeDistributionWhereUniqueInput
  }

  /**
   * IncomeDistribution deleteMany
   */
  export type IncomeDistributionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IncomeDistributions to delete
     */
    where?: IncomeDistributionWhereInput
    /**
     * Limit how many IncomeDistributions to delete.
     */
    limit?: number
  }

  /**
   * IncomeDistribution without action
   */
  export type IncomeDistributionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeDistribution
     */
    select?: IncomeDistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeDistribution
     */
    omit?: IncomeDistributionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgeGroupSavingsScalarFieldEnum: {
    ageGroup: 'ageGroup',
    savings: 'savings'
  };

  export type AgeGroupSavingsScalarFieldEnum = (typeof AgeGroupSavingsScalarFieldEnum)[keyof typeof AgeGroupSavingsScalarFieldEnum]


  export const EducationDistributionScalarFieldEnum: {
    ageRange: 'ageRange',
    educationLevel: 'educationLevel',
    probability: 'probability'
  };

  export type EducationDistributionScalarFieldEnum = (typeof EducationDistributionScalarFieldEnum)[keyof typeof EducationDistributionScalarFieldEnum]


  export const IncomeDistributionScalarFieldEnum: {
    ageRange: 'ageRange',
    educationLevel: 'educationLevel',
    baseIncome: 'baseIncome',
    multiplier: 'multiplier'
  };

  export type IncomeDistributionScalarFieldEnum = (typeof IncomeDistributionScalarFieldEnum)[keyof typeof IncomeDistributionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AgeGroupSavingsWhereInput = {
    AND?: AgeGroupSavingsWhereInput | AgeGroupSavingsWhereInput[]
    OR?: AgeGroupSavingsWhereInput[]
    NOT?: AgeGroupSavingsWhereInput | AgeGroupSavingsWhereInput[]
    ageGroup?: StringFilter<"AgeGroupSavings"> | string
    savings?: IntFilter<"AgeGroupSavings"> | number
  }

  export type AgeGroupSavingsOrderByWithRelationInput = {
    ageGroup?: SortOrder
    savings?: SortOrder
  }

  export type AgeGroupSavingsWhereUniqueInput = Prisma.AtLeast<{
    ageGroup?: string
    AND?: AgeGroupSavingsWhereInput | AgeGroupSavingsWhereInput[]
    OR?: AgeGroupSavingsWhereInput[]
    NOT?: AgeGroupSavingsWhereInput | AgeGroupSavingsWhereInput[]
    savings?: IntFilter<"AgeGroupSavings"> | number
  }, "ageGroup">

  export type AgeGroupSavingsOrderByWithAggregationInput = {
    ageGroup?: SortOrder
    savings?: SortOrder
    _count?: AgeGroupSavingsCountOrderByAggregateInput
    _avg?: AgeGroupSavingsAvgOrderByAggregateInput
    _max?: AgeGroupSavingsMaxOrderByAggregateInput
    _min?: AgeGroupSavingsMinOrderByAggregateInput
    _sum?: AgeGroupSavingsSumOrderByAggregateInput
  }

  export type AgeGroupSavingsScalarWhereWithAggregatesInput = {
    AND?: AgeGroupSavingsScalarWhereWithAggregatesInput | AgeGroupSavingsScalarWhereWithAggregatesInput[]
    OR?: AgeGroupSavingsScalarWhereWithAggregatesInput[]
    NOT?: AgeGroupSavingsScalarWhereWithAggregatesInput | AgeGroupSavingsScalarWhereWithAggregatesInput[]
    ageGroup?: StringWithAggregatesFilter<"AgeGroupSavings"> | string
    savings?: IntWithAggregatesFilter<"AgeGroupSavings"> | number
  }

  export type EducationDistributionWhereInput = {
    AND?: EducationDistributionWhereInput | EducationDistributionWhereInput[]
    OR?: EducationDistributionWhereInput[]
    NOT?: EducationDistributionWhereInput | EducationDistributionWhereInput[]
    ageRange?: StringFilter<"EducationDistribution"> | string
    educationLevel?: StringFilter<"EducationDistribution"> | string
    probability?: FloatFilter<"EducationDistribution"> | number
  }

  export type EducationDistributionOrderByWithRelationInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    probability?: SortOrder
  }

  export type EducationDistributionWhereUniqueInput = Prisma.AtLeast<{
    ageRange_educationLevel?: EducationDistributionAgeRangeEducationLevelCompoundUniqueInput
    AND?: EducationDistributionWhereInput | EducationDistributionWhereInput[]
    OR?: EducationDistributionWhereInput[]
    NOT?: EducationDistributionWhereInput | EducationDistributionWhereInput[]
    ageRange?: StringFilter<"EducationDistribution"> | string
    educationLevel?: StringFilter<"EducationDistribution"> | string
    probability?: FloatFilter<"EducationDistribution"> | number
  }, "ageRange_educationLevel">

  export type EducationDistributionOrderByWithAggregationInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    probability?: SortOrder
    _count?: EducationDistributionCountOrderByAggregateInput
    _avg?: EducationDistributionAvgOrderByAggregateInput
    _max?: EducationDistributionMaxOrderByAggregateInput
    _min?: EducationDistributionMinOrderByAggregateInput
    _sum?: EducationDistributionSumOrderByAggregateInput
  }

  export type EducationDistributionScalarWhereWithAggregatesInput = {
    AND?: EducationDistributionScalarWhereWithAggregatesInput | EducationDistributionScalarWhereWithAggregatesInput[]
    OR?: EducationDistributionScalarWhereWithAggregatesInput[]
    NOT?: EducationDistributionScalarWhereWithAggregatesInput | EducationDistributionScalarWhereWithAggregatesInput[]
    ageRange?: StringWithAggregatesFilter<"EducationDistribution"> | string
    educationLevel?: StringWithAggregatesFilter<"EducationDistribution"> | string
    probability?: FloatWithAggregatesFilter<"EducationDistribution"> | number
  }

  export type IncomeDistributionWhereInput = {
    AND?: IncomeDistributionWhereInput | IncomeDistributionWhereInput[]
    OR?: IncomeDistributionWhereInput[]
    NOT?: IncomeDistributionWhereInput | IncomeDistributionWhereInput[]
    ageRange?: StringFilter<"IncomeDistribution"> | string
    educationLevel?: StringFilter<"IncomeDistribution"> | string
    baseIncome?: IntFilter<"IncomeDistribution"> | number
    multiplier?: FloatFilter<"IncomeDistribution"> | number
  }

  export type IncomeDistributionOrderByWithRelationInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    baseIncome?: SortOrder
    multiplier?: SortOrder
  }

  export type IncomeDistributionWhereUniqueInput = Prisma.AtLeast<{
    ageRange_educationLevel?: IncomeDistributionAgeRangeEducationLevelCompoundUniqueInput
    AND?: IncomeDistributionWhereInput | IncomeDistributionWhereInput[]
    OR?: IncomeDistributionWhereInput[]
    NOT?: IncomeDistributionWhereInput | IncomeDistributionWhereInput[]
    ageRange?: StringFilter<"IncomeDistribution"> | string
    educationLevel?: StringFilter<"IncomeDistribution"> | string
    baseIncome?: IntFilter<"IncomeDistribution"> | number
    multiplier?: FloatFilter<"IncomeDistribution"> | number
  }, "ageRange_educationLevel">

  export type IncomeDistributionOrderByWithAggregationInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    baseIncome?: SortOrder
    multiplier?: SortOrder
    _count?: IncomeDistributionCountOrderByAggregateInput
    _avg?: IncomeDistributionAvgOrderByAggregateInput
    _max?: IncomeDistributionMaxOrderByAggregateInput
    _min?: IncomeDistributionMinOrderByAggregateInput
    _sum?: IncomeDistributionSumOrderByAggregateInput
  }

  export type IncomeDistributionScalarWhereWithAggregatesInput = {
    AND?: IncomeDistributionScalarWhereWithAggregatesInput | IncomeDistributionScalarWhereWithAggregatesInput[]
    OR?: IncomeDistributionScalarWhereWithAggregatesInput[]
    NOT?: IncomeDistributionScalarWhereWithAggregatesInput | IncomeDistributionScalarWhereWithAggregatesInput[]
    ageRange?: StringWithAggregatesFilter<"IncomeDistribution"> | string
    educationLevel?: StringWithAggregatesFilter<"IncomeDistribution"> | string
    baseIncome?: IntWithAggregatesFilter<"IncomeDistribution"> | number
    multiplier?: FloatWithAggregatesFilter<"IncomeDistribution"> | number
  }

  export type AgeGroupSavingsCreateInput = {
    ageGroup: string
    savings: number
  }

  export type AgeGroupSavingsUncheckedCreateInput = {
    ageGroup: string
    savings: number
  }

  export type AgeGroupSavingsUpdateInput = {
    ageGroup?: StringFieldUpdateOperationsInput | string
    savings?: IntFieldUpdateOperationsInput | number
  }

  export type AgeGroupSavingsUncheckedUpdateInput = {
    ageGroup?: StringFieldUpdateOperationsInput | string
    savings?: IntFieldUpdateOperationsInput | number
  }

  export type AgeGroupSavingsCreateManyInput = {
    ageGroup: string
    savings: number
  }

  export type AgeGroupSavingsUpdateManyMutationInput = {
    ageGroup?: StringFieldUpdateOperationsInput | string
    savings?: IntFieldUpdateOperationsInput | number
  }

  export type AgeGroupSavingsUncheckedUpdateManyInput = {
    ageGroup?: StringFieldUpdateOperationsInput | string
    savings?: IntFieldUpdateOperationsInput | number
  }

  export type EducationDistributionCreateInput = {
    ageRange: string
    educationLevel: string
    probability: number
  }

  export type EducationDistributionUncheckedCreateInput = {
    ageRange: string
    educationLevel: string
    probability: number
  }

  export type EducationDistributionUpdateInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
  }

  export type EducationDistributionUncheckedUpdateInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
  }

  export type EducationDistributionCreateManyInput = {
    ageRange: string
    educationLevel: string
    probability: number
  }

  export type EducationDistributionUpdateManyMutationInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
  }

  export type EducationDistributionUncheckedUpdateManyInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    probability?: FloatFieldUpdateOperationsInput | number
  }

  export type IncomeDistributionCreateInput = {
    ageRange: string
    educationLevel: string
    baseIncome: number
    multiplier: number
  }

  export type IncomeDistributionUncheckedCreateInput = {
    ageRange: string
    educationLevel: string
    baseIncome: number
    multiplier: number
  }

  export type IncomeDistributionUpdateInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    baseIncome?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
  }

  export type IncomeDistributionUncheckedUpdateInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    baseIncome?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
  }

  export type IncomeDistributionCreateManyInput = {
    ageRange: string
    educationLevel: string
    baseIncome: number
    multiplier: number
  }

  export type IncomeDistributionUpdateManyMutationInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    baseIncome?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
  }

  export type IncomeDistributionUncheckedUpdateManyInput = {
    ageRange?: StringFieldUpdateOperationsInput | string
    educationLevel?: StringFieldUpdateOperationsInput | string
    baseIncome?: IntFieldUpdateOperationsInput | number
    multiplier?: FloatFieldUpdateOperationsInput | number
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
    not?: NestedStringFilter<$PrismaModel> | string
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

  export type AgeGroupSavingsCountOrderByAggregateInput = {
    ageGroup?: SortOrder
    savings?: SortOrder
  }

  export type AgeGroupSavingsAvgOrderByAggregateInput = {
    savings?: SortOrder
  }

  export type AgeGroupSavingsMaxOrderByAggregateInput = {
    ageGroup?: SortOrder
    savings?: SortOrder
  }

  export type AgeGroupSavingsMinOrderByAggregateInput = {
    ageGroup?: SortOrder
    savings?: SortOrder
  }

  export type AgeGroupSavingsSumOrderByAggregateInput = {
    savings?: SortOrder
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
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EducationDistributionAgeRangeEducationLevelCompoundUniqueInput = {
    ageRange: string
    educationLevel: string
  }

  export type EducationDistributionCountOrderByAggregateInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    probability?: SortOrder
  }

  export type EducationDistributionAvgOrderByAggregateInput = {
    probability?: SortOrder
  }

  export type EducationDistributionMaxOrderByAggregateInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    probability?: SortOrder
  }

  export type EducationDistributionMinOrderByAggregateInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    probability?: SortOrder
  }

  export type EducationDistributionSumOrderByAggregateInput = {
    probability?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IncomeDistributionAgeRangeEducationLevelCompoundUniqueInput = {
    ageRange: string
    educationLevel: string
  }

  export type IncomeDistributionCountOrderByAggregateInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    baseIncome?: SortOrder
    multiplier?: SortOrder
  }

  export type IncomeDistributionAvgOrderByAggregateInput = {
    baseIncome?: SortOrder
    multiplier?: SortOrder
  }

  export type IncomeDistributionMaxOrderByAggregateInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    baseIncome?: SortOrder
    multiplier?: SortOrder
  }

  export type IncomeDistributionMinOrderByAggregateInput = {
    ageRange?: SortOrder
    educationLevel?: SortOrder
    baseIncome?: SortOrder
    multiplier?: SortOrder
  }

  export type IncomeDistributionSumOrderByAggregateInput = {
    baseIncome?: SortOrder
    multiplier?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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
    not?: NestedStringFilter<$PrismaModel> | string
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
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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