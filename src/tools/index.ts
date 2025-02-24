import { searchNotesTool } from './searchNotes'
import { getMyNotesTool } from './getMyNotes'
import { getNoteContentTool } from './getNoteContent'
import { getNoteFromPathTool } from './getNoteFromPath'
import { ToolResponse } from './types'

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
