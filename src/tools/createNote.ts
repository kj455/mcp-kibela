import { createNote } from '../graphql/queries/createNote'
import { uuid } from '../utils'
import { ToolDefinition } from './types'

export type CreateNoteArgs = {
  title: string
  content: string
  groupIds: string[]
  coediting: boolean
  folders?: string[]
  authorId?: string
  draft?: boolean
}

export const createNoteTool: ToolDefinition<CreateNoteArgs> = {
  tool: {
    name: 'kibela_create_note',
    description: 'Create a new note in Kibela.',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'required: Title of the note',
        },
        content: {
          type: 'string',
          description: 'required: Content of the note in markdown format',
        },
        groupIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'required: IDs of the groups to create the note in.',
        },
        folders: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'IDs of the folders to add the note to.',
        },
        authorId: {
          type: 'string',
          description:
            'ID of the author of the note. If not specified, the note will be created by the authenticated user.',
        },
        coediting: {
          type: 'boolean',
          description: 'required: Whether to enable co-editing for the note',
        },
        draft: {
          type: 'boolean',
          description: 'Whether to create the note as a draft',
        },
      },
      required: ['title', 'content'],
    },
  },
  handler: async ({ title, content, groupIds, folders, authorId, coediting, draft }) => {
    if (!title || !content || !groupIds || !coediting) {
      throw new Error('Title, content, groupIds, and coediting are required')
    }

    const response = await createNote({
      input: {
        clientMutationId: uuid(),
        title,
        content,
        groupIds,
        folders,
        authorId,
        coediting,
        draft,
      },
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response.createNote, null, 2),
        },
      ],
    }
  },
}
