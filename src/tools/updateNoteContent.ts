import { getNote } from '../graphql'
import { updateNoteContent } from '../graphql/queries/updateNoteContent'
import { uuid } from '../utils'
import { ToolDefinition } from './types'

export type UpdateNoteContentArgs = {
  id: string
  content: string
}

export const updateNoteContentTool: ToolDefinition<UpdateNoteContentArgs> = {
  tool: {
    name: 'kibela_update_note_content',
    description:
      'Update note content by note id. This tool allows you to modify the content of an existing Kibela note. Before updating, it fetches the current content of the note to ensure proper version control. Note that you need the note ID (not the note path) to use this tool.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description:
            'Note id - not note path (e.g. /notes/123). If you want to update note content by note path, please use kibela_get_note_from_path tool first and get note id from the response',
        },
        content: {
          type: 'string',
          description:
            'New content of the note in markdown format. The content will completely replace the existing note content. Make sure to include all necessary formatting, headers, and sections you want to preserve.',
        },
      },
      required: ['id', 'content'],
    },
  },
  handler: async ({ id, content }) => {
    if (!id || !content) {
      throw new Error('Note id and content are required')
    }

    const noteRes = await getNote({ id })
    if (!noteRes.note) {
      throw new Error('Note not found')
    }

    const response = await updateNoteContent({
      input: {
        clientMutationId: uuid(),
        id,
        newContent: content,
        baseContent: noteRes.note.content,
      },
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response.updateNoteContent, null, 2),
        },
      ],
    }
  },
}
