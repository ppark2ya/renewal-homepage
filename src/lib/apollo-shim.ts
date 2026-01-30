// Re-export everything from @apollo/client
export * from '@apollo/client';

// Shim missing types in v4 with any to avoid compatibility issues
export type MutationFunction<TData, TVariables> = any;
export type BaseMutationOptions<TData, TVariables> = any;
export type MutationResult<TData> = any;
export type QueryResult<TData, TVariables> = any;
