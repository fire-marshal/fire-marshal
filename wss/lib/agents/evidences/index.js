const clientActions = require('../../../../static/src/reducers/evidences-subscriber')

const Agent = require('./agent')

module.exports = {
  evidencesAgent: ({ db }) => ({
    onConnect: ctx => {
      ctx.evidencesAgent = new Agent(ctx, db)
    },

    onDisconnect: ctx => {
      console.log('onDisconnect!')
      ctx.evidencesAgent.stop()
      ctx.evidencesAgent = null
    },

    onMessage: (ctx) => {
      const { action } = ctx
      switch (action.type) {
        case clientActions.actionTypes.SUBSCRIBE_EVIDENCES:
          ctx.evidencesAgent.start(action.payload)
          break

        case clientActions.actionTypes.UNSUBSCRIBE_EVIDENCES:
          ctx.evidencesAgent.stop()
          break
      }
    }
  })
}
