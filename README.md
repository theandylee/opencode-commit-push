# C&P

A GUI-only OpenCode plugin that adds **C&P** to the session header, before the
context indicator. Clicking it sends exactly `commit & push` to that session's
agent, leaving the composer draft untouched. It does not run Git directly.

Enabled globally through `~/.config/opencode/opencode.jsonc`:

```json
{ "plugins": ["D:/Dev/opencode-commit-push"] }
```

The plugin is a ready-to-load CommonJS file; no build or dependencies to install.
