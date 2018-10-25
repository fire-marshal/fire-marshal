module.exports = () => {
  return async (ctx, next) => {
    // TODO: fetch actual fires
    ctx.body = ['fire1', 'fire2']
  }
}
