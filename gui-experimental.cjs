const { Plugin, Slot } = require("@opencode/plugin/gui")
const { createComponent, createSignal } = require("solid-js")

module.exports = Plugin.define({
  setup(ctx) {
    ctx.add(Slot, {
      at: "session.header",
      order: -100,
      render(input) {
        const [sending, setSending] = createSignal(false)

        const send = async () => {
          const session = input.session
          if (!input.active || session.pending || sending()) return

          setSending(true)
          try {
            await session.server.client.session.prompt({
              sessionID: session.id,
              text: "commit & push",
            })
          } catch (error) {
            ctx.toast.show({
              variant: "error",
              title: "Could not send commit & push",
              description: error instanceof Error ? error.message : String(error),
            })
          } finally {
            setSending(false)
          }
        }

        return createComponent(ctx.ui.Tooltip, {
          value: "Commit and push",
          get children() {
            return createComponent(ctx.ui.Button, {
              children: "C&P",
              type: "button",
              variant: "neutral",
              size: "small",
              get disabled() {
                return !input.active || input.session.pending || sending()
              },
              get busy() {
                return sending()
              },
              onClick: () => void send(),
            })
          },
        })
      },
    })
  },
})
