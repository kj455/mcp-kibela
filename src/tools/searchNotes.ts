import { searchNotes } from '../graphql'
import { ToolDefinition } from './types'

export type SearchNotesArgs = {
  query: string
}

export const searchNotesTool: ToolDefinition<SearchNotesArgs> = {
  tool: {
    name: 'kibela_search_notes',
    description: 'Search Kibela notes by query',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query',
        },
      },
      required: ['query'],
    },
  },
  handler: async (args) => {
    if (!args.query) {
      throw new Error('Query is required')
    }

    const response = await searchNotes({ query: args.query })

    const edges = response.search?.edges ?? []
    const notes = edges
      .filter((edge): edge is NonNullable<(typeof edges)[number]> => edge != null)
      .filter((edge) => edge.node?.document != null)
      .map((edge) => edge.node?.document)

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(notes, null, 2),
        },
      ],
    }
  },
}
