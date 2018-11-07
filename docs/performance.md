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
Document Length:        13270 bytes

Concurrency Level:      1
Time taken for tests:   51.814 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      6730000 bytes
HTML transferred:       6635000 bytes
Requests per second:    9.65 [#/sec] (mean)
Time per request:       103.628 [ms] (mean)
Time per request:       103.628 [ms] (mean, across all concurrent requests)
Transfer rate:          126.84 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    8  17.4      6     278
Processing:    90   96   4.1     95     115
Waiting:       86   91   3.7     90     113
Total:         95  104  18.1    101     380

Percentage of the requests served within a certain time (ms)
  50%    101
  66%    103
  75%    104
  80%    105
  90%    110
  95%    115
  98%    121
  99%    139
 100%    380 (longest request)
```
## GET /api/v1/fires?start_date=2010
```
This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 192.168.100.13 (be patient)


Server Software:        nginx/1.15.5
Server Hostname:        192.168.100.13
Server Port:            8000

Document Path:          /api/v1/fires?start_date=2010
Document Length:        13277 bytes

Concurrency Level:      1
Time taken for tests:   47.850 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      6733500 bytes
HTML transferred:       6638500 bytes
Requests per second:    10.45 [#/sec] (mean)
Time per request:       95.699 [ms] (mean)
Time per request:       95.699 [ms] (mean, across all concurrent requests)
Transfer rate:          137.42 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    8  17.9      6     280
Processing:    81   87   5.4     86     125
Waiting:       78   83   5.0     82     121
Total:         85   96  18.6     93     366

Percentage of the requests served within a certain time (ms)
  50%     93
  66%     95
  75%     97
  80%     98
  90%    102
  95%    109
  98%    122
  99%    141
 100%    366 (longest request)
```
