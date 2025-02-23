import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  esbuildPlugins: [
    {
      name: 'gql',
      setup(build) {
        build.onLoad({ filter: /\.gql$/ }, async (args) => {
          const fs = await import('fs')
          const gql = (await import('graphql-tag')).default
          const text = await fs.promises.readFile(args.path, 'utf8')
          const ast = gql(text)
          const contents = `
            const doc = ${JSON.stringify(ast)};
            doc.loc = { source: { body: ${JSON.stringify(text)} } };
            export default doc;
          `
          return { contents, loader: 'js' }
        })
      },
    },
  ],
})
