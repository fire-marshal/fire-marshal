module.exports = {
  evidences: {
    api_url: '/api/v1/fires',
    api_url_with_start_date: '/api/v1/fires?start_date={{startDate}}',
    // how many msec we wait until make request
    // repeated requests just ignored
    debounceDelay: 1000
  },

  asyncQueue: {
    simultaneousJobs: 4
  }
}
