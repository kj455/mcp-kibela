# mcp-kibela

[![smithery badge](https://smithery.ai/badge/@kj455/mcp-kibela)](https://smithery.ai/server/@kj455/mcp-kibela)

MCP server implementation that integrates with Kibela API, enabling LLMs to interact with Kibela content.

## Features ⚙️

* 🔍 Tool: kibela-search-notes
  * Search Kibela notes by keywords
* 📝 Tool: kibela-get-my-notes
  * Fetch your latest notes
* 📖 Tool: kibela-get-note-content
  * Get note content and comments by ID
* 🔗 Tool: kibela-get-note-from-path
  * Get note content by path

## Installation

Choose one of the following installation methods:

| Method | Claude Setup | Prerequisites |
|--------|-------------|---------------|
| [Smithery](#using-smithery) | Automatic | Node.js |
| [mcp-get](#using-mcp-get) | Automatic | Node.js |
| [NPM Package](#using-npm-package) | Manual | Node.js |
| [Source](#building-from-source) | Manual | Node.js, pnpm |

### Using Smithery

Automatically install for Claude Desktop:

```bash
npx -y @smithery/cli install @kj455/mcp-kibela --client claude
```

### Using mcp-get

🚧 Not implemented yet 🚧

Automatically install using mcp-get:

```bash
npx @michaellatman/mcp-get@latest install @kj455/mcp-kibela
```

### Using NPM Package

🚧 Not implemented yet 🚧

If you have Node.js installed:

```bash
npm install -g @kj455/mcp-kibela
```

After installation, add the following to your `claude_desktop_config.json`:

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

### Building from Source

```bash
git clone https://github.com/kj455/mcp-kibela.git
cd mcp-kibela
pnpm install
pnpm codegen
pnpm build
```

Then add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "kibela": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "KIBELA_TEAM": "your-team-name",
        "KIBELA_TOKEN": "your-token"
      }
    }
  }
}
```

## Using with Cursor

For Cursor integration, add the following to your `~/.cursor/config.json`:

```json
{
  "mcp": {
    "servers": {
      "kibela": {
        "command": "mcp-kibela",
        "env": {
          "KIBELA_TEAM": "your-team-name",
          "KIBELA_TOKEN": "your-token"
        }
      }
    }
  }
}
```

## Environment Variables

The following environment variables are required:

* `KIBELA_TEAM`: Your Kibela team name (required)
* `KIBELA_TOKEN`: Your Kibela API token (required)

## Contributing

For development guidelines, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
