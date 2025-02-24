import { getMyNotes } from '../graphql'
import { ToolDefinition } from './types'

export type GetMyNotesArgs = {
  limit?: number
}

export const getMyNotesTool: ToolDefinition<GetMyNotesArgs> = {
  tool: {
    name: 'kibela_get_my_notes',
    description: 'Get my latest notes from Kibela',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of notes to fetch',
          default: 10,
        },
      },
    },
  },
  handler: async (args) => {
    const limit = args.limit ?? 10

    const response = await getMyNotes({ limit })

    const edges = response.currentUser?.latestNotes?.edges ?? []
    const notes = edges
      .filter((edge): edge is NonNullable<(typeof edges)[number]> => edge != null)
      .filter((edge) => edge.node != null)
      .map((edge) => edge.node)

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
