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

Choose one of the following installation methods:

### Using Smithery

```bash
npx -y @smithery/cli install @kj455/mcp-kibela --client claude
```

### Using npm Package

```bash
npm install -g @kj455/mcp-kibela
```

### Building from Source

```bash
git clone https://github.com/kj455/mcp-kibela.git
cd mcp-kibela
npm install
npm run build
```

## Configuration ⚙️

### Claude Desktop

If you use Smithery, you don't need to add this.

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "kibela": {
      "command": "mcp-kibela",
      "env": {
        "KIBELA_TEAM": "your-team-name",
        "KIBELA_TOKEN": "your-token"
      }
    }
  }
}
```

#### If you use asdf

You will need this special configuration:

```json
{
  "mcpServers": {
    "kibela": {
      "command": "/bin/bash",
      "args": ["-c", "npx -y @kj455/mcp-kibela@latest"],
      "env": {
        "KIBELA_TEAM": "your-team-name",
        "KIBELA_TOKEN": "your-token",
        "PATH": "/path/to/.asdf/shims:/usr/bin:/bin",
        "ASDF_DIR": "/opt/homebrew/opt/asdf/libexec",
        "ASDF_DATA_DIR": "/path/to/.asdf",
        "ASDF_NODEJS_VERSION": "your-nodejs-version"
      }
    }
  }
}
```

#### If you built from source

You will need to modify the command and args like this:

```json
{
  "mcpServers": {
    "kibela": {
      "command": "/bin/bash",
      "args": ["-c", "node dist/index.js"]
      // ... other env configurations remain the same
    }
  }
}
```

### Cursor

Currently, ONLY [build from source](https://github.com/kj455/mcp-kibela#building-from-source) is supported.

After building from source, you need to modify Cursor Settings.

Cursor Settings -> Features -> MCP Servers -> Add new MCP server

- Name: `kibela` (or whatever you want)
- Type: `command`
- Command: `env KIBELA_TEAM=your_team_name KIBELA_TOKEN=your_token node /path/to/mcp-kibela/dist/index.js`

## Environment Variables

The following environment variables are required:

- `KIBELA_TEAM`: Your Kibela team name (required)
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
