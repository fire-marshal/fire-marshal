const googleTrends = require('google-trends-api')

// googleTrends.interestByRegion({
//   keyword: 'fire',
//   // startTime: new Date(2018, 9, 1),
//   endTime: new Date(Date.now()),
//   geo: 'Ukraine',
//   resolution: 'DMA',
// })
//   .then(function (results) {
//     console.log('These results are awesome', results);
//   })
//   .catch(function (err) {
//     console.error('Oh no there was an error', err);
//   });

googleTrends.interestByRegion({
  keyword: 'огонь',
  geo: 'UA',
  // startTime: new Date('2017-02-01'),
  endTime: new Date(Date.now()),
  resolution: 'CITY'
})
  .then((res) => {
    console.log(typeof res)
    console.log(JSON.stringify(JSON.parse(res), null, 2))
  })
  .catch((err) => {
    console.log(err)
  })
