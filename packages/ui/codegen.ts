import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://127.0.0.1:8000/graphql",
  documents: ["src/**/*.tsx", "src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/lib/gql/": {
      preset: "client",
    },
  },
};

export default config;
