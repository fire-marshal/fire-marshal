/**
 * Queue of lazy jobs
 * Job should return Promise and solves it once job is done.
 *
 */

import config from '../../config'

// queue of open jobs
const queueOpen = []

// queue of in-progress jobs
const queueInProgress = []

function checkAvailability () {
  while (queueInProgress.length < config.asyncQueue.simultaneousJobs && queueOpen.length > 0) {
    const task = queueOpen.pop()
    queueInProgress.push(task)

    task.job()
      .then(task.resolve, task.reject)
      .then(() => {
        const i = queueInProgress.indexOf(task)
        queueInProgress.splice(i, 1)
      })
      .then(checkAvailability)
  }
}

/**
 * Add lazy job function in a queue.
 * Function should return Promise and solve it once job is done.
 *
 * @param job
 * @returns {Promise}
 */
export function addToQueue (job) {
  return new Promise((resolve, reject) => {
    queueOpen.push({
      job,
      resolve,
      reject
    })

    checkAvailability()
  })
}
