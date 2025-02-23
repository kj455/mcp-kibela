import { CodegenConfig, generate } from '@graphql-codegen/cli'
import { config } from 'dotenv'

config()

const { KIBELA_TEAM, KIBELA_TOKEN } = process.env

if (!KIBELA_TEAM || !KIBELA_TOKEN) {
  throw new Error('Required environment variables KIBELA_TEAM and KIBELA_TOKEN are not set')
}

const codegenConfig: CodegenConfig = {
  schema: [
    {
      [`https://${KIBELA_TEAM}.kibe.la/api/v1`]: {
        headers: {
          Authorization: `Bearer ${KIBELA_TOKEN}`,
        },
      },
    },
  ],
  documents: ['src/**/*.gql'],
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
    },
  },
  ignoreNoDocuments: true,
}

generate(codegenConfig).catch((error) => {
  console.error('Error generating types:', error)
  process.exit(1)
})
