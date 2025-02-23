import { Tool } from '@modelcontextprotocol/sdk/types.js'
import { Queries, gqlRequest, SearchNotesQuery, GetMyNotesQuery, GetNoteQuery, GetNoteFromPathQuery } from './graphql'

type ToolResponse = {
  content: {
    type: 'text'
    text: string
  }[]
  isError?: boolean
  _meta?: { [x: string]: unknown }
}

type ToolHandler<T> = (args: T) => Promise<ToolResponse>

type ToolDefinition<T> = {
  tool: Tool
  handler: ToolHandler<T>
}

type SearchNotesArgs = {
  query: string
}
const searchNotesTool: ToolDefinition<SearchNotesArgs> = {
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

    const response = await gqlRequest<SearchNotesQuery>(Queries.searchNotes, {
      query: args.query,
    })

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

type GetMyNotesArgs = {
  limit?: number
}
const getMyNotesTool: ToolDefinition<GetMyNotesArgs> = {
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

    const response = await gqlRequest<GetMyNotesQuery>(Queries.getMyNotes, {
      limit,
    })

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

type GetNoteContentArgs = {
  id: string
}
const getNoteContentTool: ToolDefinition<GetNoteContentArgs> = {
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

    const response = await gqlRequest<GetNoteQuery>(Queries.getNote, {
      id: args.id,
    })

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

type GetNoteFromPathArgs = {
  path: string
}
const getNoteFromPathTool: ToolDefinition<GetNoteFromPathArgs> = {
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

    const response = await gqlRequest<GetNoteFromPathQuery>(Queries.getNoteFromPath, {
      path: args.path,
    })

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

const toolDefinitions = {
  kibela_search_notes: searchNotesTool,
  kibela_get_my_notes: getMyNotesTool,
  kibela_get_note_content: getNoteContentTool,
  kibela_get_note_from_path: getNoteFromPathTool,
} as const

export type ToolName = keyof typeof toolDefinitions

export const TOOLS = Object.values(toolDefinitions).map((def) => def.tool)

export async function handleToolRequest(name: string, args: Record<string, unknown>): Promise<ToolResponse> {
  try {
    const toolName = name as ToolName
    const toolDefinition = toolDefinitions[toolName]

    if (!toolDefinition) {
      throw new Error(`Unknown tool: ${name}`)
    }

    return await toolDefinition.handler(args as any)
  } catch (error) {
    console.error('Error:', error)
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    }
  }
}
