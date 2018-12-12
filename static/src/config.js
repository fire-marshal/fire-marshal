module.exports = {
  evidences: {
    apiURL: '/api/v1/fires',
    apiURLWithStartDate: '/api/v1/fires?{{ops}}',
    // how many msec we wait until make request
    // repeated requests just ignored
    debounceDelay: 1000
  },

  asyncQueue: {
    simultaneousJobs: 4
  }
}
