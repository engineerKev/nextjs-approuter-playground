
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  generates: {
    "app/api/graphql/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"]
    }
  }
};

export default config;
