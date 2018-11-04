module.exports = {
  evidences: {
    api_url: '/api/v1/fires',
    // how many msec we wait until make request
    // repeated requests just ignored
    debounceDelay: 500
  },

  asyncQueue: {
    simultaneousJobs: 4
  }
}
