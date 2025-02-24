#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createServer } from './server'
import './env'

const run = async () => {
  const { server } = createServer()
  const transport = new StdioServerTransport()

  const shutdown = async () => {
    console.error('Shutting down...')
    await server.close()
  }

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
  signals.forEach((signal) => {
    process.on(signal, () => shutdown().then(() => process.exit(0)))
  })

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error)
    shutdown().finally(() => process.exit(1))
  })

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled rejection:', reason)
    shutdown().finally(() => process.exit(1))
  })

  try {
    await server.connect(transport)
    console.error('Kibela MCP Server running on stdio')
  } catch (error) {
    console.error('Failed to start server:', error)
    await shutdown()
    process.exit(1)
  }
}

run().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
