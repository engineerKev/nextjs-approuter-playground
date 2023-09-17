import type { GetUsersQuery } from './api/graphql/generated/generated';

export type User = GetUsersQuery["users"][0];

