# @wrikka/cli

A command-line interface for the Wrikka platform with interactive prompts.

## Features

- Interactive prompts using clack
- Easy to extend with new commands
- TypeScript support

## Installation

```bash
bun install
```

## Usage

Build the project:
```bash
bun run build
```

Run in development mode (watch mode):
```bash
bun run dev
```

Run the CLI after building:
```bash
bunx wrikka-cli
```

### Example Usage

```bash
$ bunx wrikka-cli

 wrikka cli 

✔ What is your name? … user
✔ Do you want to continue? … yes
✔ Select type › Type A
Done, user!
```

## Development

Run tests:
```bash
bun run test
```

Lint the code:
```bash
bun run lint
```

Type checking:
```bash
bun run typecheck
```
