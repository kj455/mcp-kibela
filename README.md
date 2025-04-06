# mcp-kibela 🗒️

[![smithery badge](https://smithery.ai/badge/@kj455/mcp-kibela)](https://smithery.ai/server/@kj455/mcp-kibela)
[![npm version](https://badge.fury.io/js/@kj455%2Fmcp-kibela.svg)](https://www.npmjs.com/package/@kj455/mcp-kibela)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server implementation that enables AI assistants to search and reference Kibela content. This setup allows AI models like Claude to securely access information stored in Kibela.

## Features 🚀

The mcp-kibela server provides the following features:

- **Note Search**: Search Kibela notes by keywords
- **My Notes**: Fetch your latest notes
- **Note Content**: Get note content and comments by ID
- **Note by Path**: Get note content by path
- **Create Note**: Create a new note
- **Update Note Content**: Update note content by note id

---

## Prerequisites 📋

Before you begin, ensure you have:

- Node.js (v18 or higher)
- MCP Client (Claude Desktop, Cursor, etc.)
- Kibela Access Token ([How to get a token](https://support.kibe.la/hc/ja/articles/360036089931-API%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%AE%E5%8F%96%E5%BE%97%E6%96%B9%E6%B3%95%E3%82%92%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84))
- Git (if building from source)

## Installation 🛠️

### Usage with Cursor

```json
{
  "kibela": {
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "KIBELA_TEAM",
      "-e",
      "KIBELA_TOKEN",
      "ghcr.io/kj455/mcp-kibela:latest"
    ],
    "env": {
      "KIBELA_TEAM": "your-team-name from https://[team-name].kibe.la",
      "KIBELA_TOKEN": "your-token"
    }
  }
}
```

### Usage with VSCode

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "kibela_team",
        "description": "Kibela team name",
        "password": false
      },
      {
        "type": "promptString",
        "id": "kibela_token",
        "description": "Kibela token",
        "password": true
      },
    ],
    "servers": {
      "kibela": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "KIBELA_TEAM",
          "-e",
          "KIBELA_TOKEN",
          "ghcr.io/kj455/mcp-kibela:latest"
        ],
        "env": {
          "KIBELA_TEAM": "${input:kibela_team}",
          "KIBELA_TOKEN": "${input:kibela_token}"
        }
      }
    }
  }
}
```


### Usage with Claude Desktop

```json
{
  "mcpServers": {
    "mcp-kibela": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "KIBELA_TEAM",
        "-e",
        "KIBELA_TOKEN",
        "ghcr.io/kj455/mcp-kibela:latest"
      ],
      "env": {
        "KIBELA_TEAM": "your-team-name from https://[team-name].kibe.la",
        "KIBELA_TOKEN": "your-token"
      }
    }
  }
}
```

### Using Smithery

```bash
npx -y @smithery/cli install @kj455/mcp-kibela --client claude
```

## Environment Variables

The following environment variables are required:

- `KIBELA_TEAM`: Your Kibela team name (required). You can find it from the URL of your Kibela team page. e.g. https://[team-name].kibe.la
- `KIBELA_TOKEN`: Your Kibela API token (required)

## Contributing

Any contributions are welcome!

## Development

1. Use `npm run build:watch` to build the project in watch mode.

```bash
npm run build:watch
```

2. Use `npx @modelcontextprotocol/inspector` to inspect the MCP server.

```bash
npx @modelcontextprotocol/inspector node /path/to/mcp-kibela/dist/index.js
```


## License 📄

MIT
