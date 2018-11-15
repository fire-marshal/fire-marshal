export const namespace = "@@gaf/ws/CONNECTION";

export const actionTypes = {
  CONNECT: `${namespace}/CONNECT`,
  CONNECT_ERROR: `${namespace}/CONNECT_ERROR`,
  CONNECT_TIMEOUT: `${namespace}/CONNECT_TIMEOUT`,
  CONNECT_SUCCESS: `${namespace}/CONNECT_SUCCESS`,
  DISCONNECT: `${namespace}/DISCONNECT`,
  ERROR: `${namespace}/ERROR`,
  MESSAGE: `${namespace}/MESSAGE`,
  RECEIVE_MESSAGE: `${namespace}/RECEIVE_MSG`,
  RECONNECT: `${namespace}/RECONNECT`,
  RECONNECTING: `${namespace}/RECONNECTING`,
  RECONNECT_ERROR: `${namespace}/RECONNECT_ERROR`,
  RECONNECT_FAILED: `${namespace}/RECONNECT_FAILED`,
  RECONNECT_SUCCESS: `${namespace}/RECONNECT_SUCCESS`
};

export const connect = () => ({
  type: actionTypes.CONNECT
})

export const disconnect = (payload) => ({
  type: actionTypes.DISCONNECT,
  payload
})

export const error = (payload) => ({
  type: actionTypes.ERROR,
  payload
})

export const message = (payload) => ({
  type: actionTypes.MESSAGE,
  payload
})
