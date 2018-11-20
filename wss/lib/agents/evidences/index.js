const clientActions = require('../../../../static/src/reducers/evidences-actions')

const Agent = require('./agent')

module.exports = {
  evidencesAgent: ({ db }) => ({
    onConnect: ctx => {
      ctx.evidencesAgent = new Agent(ctx, db)
    },

    onDisconnect: ctx => {
      ctx.evidencesAgent.stop()
      ctx.evidencesAgent = null
    },

    onMessage: (ctx) => {
      const { action } = ctx
      switch (action.type) {
        case clientActions.SUBSCRIBE_EVIDENCES:
          ctx.evidencesAgent.start(action.payload)
          break

        case clientActions.UNSUBSCRIBE_EVIDENCES:
          ctx.evidencesAgent.stop()
          break
      }
    }
  })
}
