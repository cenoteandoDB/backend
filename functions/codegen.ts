import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "./src/graphql/modules/**/schema/*.graphql",
    generates: {
        "./src/graphql/modules/": {
            preset: 'graphql-modules',
            presetConfig: {
                baseTypesPath: '../generated-types/graphql.ts',
                filename: 'generated-types/module-types.ts'
            },
            plugins: [
                {
                    add: {
                        content: '/* eslint-disable */'
                    }
                },
                'typescript',
                'typescript-resolvers'
            ],
        }
    }
};

export default config;
