import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { TOOLS, handleToolRequest } from './tools/index'

export const createServer = () => {
  const server = new Server(
    {
      name: 'kibela-mcp-server',
      version: '0.1.8',
    },
    {
      capabilities: {
        tools: {},
      },
    },
  )

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS,
  }))

  server.setRequestHandler(CallToolRequestSchema, async ({ params }) => {
    return handleToolRequest(params.name, params.arguments ?? {})
  })

  return { server }
}
