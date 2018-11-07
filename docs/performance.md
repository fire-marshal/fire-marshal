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
Time taken for tests:   10.864 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      6353501 bytes
HTML transferred:       6259000 bytes
Requests per second:    46.02 [#/sec] (mean)
Time per request:       21.728 [ms] (mean)
Time per request:       21.728 [ms] (mean, across all concurrent requests)
Transfer rate:          571.11 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    7  17.7      5     279
Processing:     9   14   7.3     13     127
Waiting:        4    9   6.6      8     125
Total:         13   22  19.4     19     292

Percentage of the requests served within a certain time (ms)
  50%     19
  66%     20
  75%     22
  80%     22
  90%     26
  95%     30
  98%     41
  99%     77
 100%    292 (longest request)
```
