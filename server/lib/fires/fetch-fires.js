module.exports = () => {
  return async (ctx, next) => {
    // TODO: fetch actual fires
    await next()
    ctx.type = 'json'
    ctx.body = ['fire1', 'fire2']
  }
}
