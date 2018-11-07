# API Performance
## GET /api/v1/fires
```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 192.168.100.13 (be patient)


Server Software:        nginx/1.15.5
Server Hostname:        192.168.100.13
Server Port:            8000

Document Path:          /api/v1/fires
Document Length:        12518 bytes

Concurrency Level:      1
Time taken for tests:   18.763 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      6353500 bytes
HTML transferred:       6259000 bytes
Requests per second:    26.65 [#/sec] (mean)
Time per request:       37.525 [ms] (mean)
Time per request:       37.525 [ms] (mean, across all concurrent requests)
Transfer rate:          330.69 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2   15  29.7      7     279
Processing:     9   22  28.9     14     291
Waiting:        4   15  21.3      9     199
Total:         13   37  48.4     22     418

Percentage of the requests served within a certain time (ms)
  50%     22
  66%     26
  75%     31
  80%     35
  90%     70
  95%    149
  98%    221
  99%    289
 100%    418 (longest request)
```
