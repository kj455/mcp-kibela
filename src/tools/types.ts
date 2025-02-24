import { Tool } from '@modelcontextprotocol/sdk/types.js'

export type ToolResponse = {
  content: {
    type: 'text'
    text: string
  }[]
  isError?: boolean
  _meta?: { [x: string]: unknown }
}

export type ToolHandler<T> = (args: T) => Promise<ToolResponse>

export type ToolDefinition<T> = {
  tool: Tool
  handler: ToolHandler<T>
}
