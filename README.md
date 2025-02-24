# mcp-kibela 🗒️

A Model Context Protocol (MCP) server implementation that enables AI assistants to search and reference Kibela content. This setup allows AI models like Claude to securely access information stored in Kibela.

## Server Features 🚀

The mcp-kibela server provides the following features:

* 🔍 **Note Search**: Search Kibela notes by keywords
* 📝 **My Notes**: Fetch your latest notes
* 📖 **Note Content**: Get note content and comments by ID
* 🔗 **Note by Path**: Get note content by path

## Prerequisites 📋

Before you begin, ensure you have:

* Node.js (v18 or higher)
* MCP Client (Claude Desktop, Cursor, etc.)
* Kibela Access Token
* Git (if building from source)


## Installation 🛠️

Choose one of the following installation methods:

### Using Smithery
🚧 Under Development 🚧
```bash
npx -y @smithery/cli install @kj455/mcp-kibela --client claude
```

### Using mcp-get
🚧 Under Development 🚧
```bash
npx @michaellatman/mcp-get@latest install @kj455/mcp-kibela
```

### Using npm Package
```bash
npm install -g @kj455/mcp-kibela
```

### Building from Source
```bash
git clone https://github.com/kj455/mcp-kibela.git
cd mcp-kibela
pnpm install
pnpm codegen
pnpm build
```

## Configuration ⚙️

### Claude Desktop

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

#### If you're using asdf for Node.js version management
If you're using asdf for Node.js version management, you'll need this special configuration:

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
If you built from source, modify the command and args like this:

```json
{
  "mcpServers": {
    "kibela": {
      "command": "/bin/bash",
      "args": ["-c", "node dist/index.js"],
      // ... other env configurations remain the same
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
