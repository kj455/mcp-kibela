import { getNote } from '../graphql'
import { ToolDefinition } from './types'

export type GetNoteContentArgs = {
  id: string
}

export const getNoteContentTool: ToolDefinition<GetNoteContentArgs> = {
  tool: {
    name: 'kibela_get_note_content',
    description: 'Get note content by note ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Note ID',
        },
      },
      required: ['id'],
    },
  },
  handler: async (args) => {
    if (!args.id) {
      throw new Error('Note ID is required')
    }

    const response = await getNote({ id: args.id })

    if (!response.note) {
      throw new Error('Note not found')
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response.note, null, 2),
        },
      ],
    }
  },
}
