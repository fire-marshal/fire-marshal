export const namespace = "@@gaf/ws/QUEUE";

export const actionTypes = {
  ADD: `${namespace}/ADD`,
  REMOVE: `${namespace}/REMOVE`
};

export const add = (payload) => ({
  type: actionTypes.ADD,
  payload
})

export const remove = (payload) => ({
  type: actionTypes.REMOVE,
  payload
})
