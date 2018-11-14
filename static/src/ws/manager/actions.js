export const namespace = "@gaf/ws";

// TODO:
export const actionTypes = {
  CONNECT: `${namespace}/CONNECT`,
  CONNECT_ERROR: `${namespace}/CONNECT_ERROR`,
  CONNECT_TIMEOUT: `${namespace}/CONNECT_TIMEOUT`,
  CONNECT_SUCCESS: `${namespace}/CONNECT_SUCCESS`,
  RECEIVE_MESSAGE: `${namespace}/RECEIVE_MSG`,
  RECONNECT: `${namespace}/RECONNECT`,
  RECONNECTING: `${namespace}/RECONNECTING`,
  RECONNECT_ERROR: `${namespace}/RECONNECT_ERROR`,
  RECONNECT_FAILED: `${namespace}/RECONNECT_FAILED`,
  RECONNECT_SUCCESS: `${namespace}/RECONNECT_SUCCESS`
};
