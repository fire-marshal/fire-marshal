/**
 * We have sources of data in a way of web sockets
 * And we want to consume this data to Redux state
 * so our main web app could take new data and reflect it in a right way.
 *
 * But here comes some questions about pipeline and lifecycle:
 *
 * - what is the best way to start and stop web socket module?
 *
 * For example when we not using chat we don't need flow of incoming messages
 * but we could need this flow in few components. So it could make sense to
 * trigger on/off module depends on visible components. the Stateful components
 * because stateless component doesn't care much about this state.
 *
 * So each stateful component could have `PubSubModule.start()` and
 * `PubSubModule.stop()`.
 *
 * Another alternative - unbind PubSub Modules from component but bind on state update
 * it could be current visible page, login/logout user and etc.
 *
 * So PubSub Module subscribe on state update, and check whether it should start/stop
 *
 *
 * - Update request to server
 * For example our app gets updates depends on our location and user's actions,
 * and sure when user walks her location could change so we should update query
 * of subscribed data.
 *
 * There are few alternatives:
 * 1) call `PubSubModule.update(new_params)` directly from component
 *
 * 2) subscribe on Redux state change and update when we need it.
 * But we should remember previous request and send "diff" only --
 * in case of new data.
 *
 *
 *
 * # Challenges
 *
 * - optimize Redux state subscription. We still can have problem because
 * we can't subscribe for specific option. But should react on ant tiny piece update.
 *
 * Partly Solution: use libs like `reselect`
 * which store intermediate state tree result so we won't need to go deep
 * and extract everything
 *
 * we have few alternatives here, to how could we get state for requests:
 *
 *
 * # Architecture
 *
 * - should it be middleware?
 * - is it another form of UI component?
 *
 * # Websocket as Middleware
 *
 * it seems middleware is the best way to integrate websockets
 *
 */

export function start () {

}

export function update () {

}

export function stop () {

}
