const actions = require('./actions')

module.exports = {
  reduxMiddleware: () => ({
    onConnect: ctx => {
      console.log('redux middleware connect')
      ctx.action = actions.connect()
      ctx.dispatch = (action) => {
        action = { ...action, meta: { ...action.meta, createdAt: Date.now() } }
        ctx.send(JSON.stringify(action))
      }
    },

    onMessage: async (ctx, next) => {
      console.log('redux middleware process')
      let action
      try {
        action = JSON.parse(ctx.message)
      } catch (err) {
        console.log('it is not object', ctx.message)
        return
      }

      console.log('store action to ctx')

      ctx.action = action
      await next()
    }
  })
}
