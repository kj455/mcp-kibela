import { getNoteFromPath } from '../graphql'
import { ToolDefinition } from './types'

export type GetNoteFromPathArgs = {
  path: string
}

export const getNoteFromPathTool: ToolDefinition<GetNoteFromPathArgs> = {
  tool: {
    name: 'kibela_get_note_from_path',
    description: 'Get note content by note path',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Note path (e.g. /notes/123)',
        },
      },
      required: ['path'],
    },
  },
  handler: async (args) => {
    if (!args.path) {
      throw new Error('Note path is required')
    }

    const response = await getNoteFromPath({ path: args.path })

    if (!response.noteFromPath) {
      throw new Error('Note not found')
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response.noteFromPath, null, 2),
        },
      ],
    }
  },
}
