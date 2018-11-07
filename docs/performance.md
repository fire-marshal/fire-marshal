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
Document Length:        13242 bytes

Concurrency Level:      1
Time taken for tests:   9.990 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      6715500 bytes
HTML transferred:       6621000 bytes
Requests per second:    50.05 [#/sec] (mean)
Time per request:       19.980 [ms] (mean)
Time per request:       19.980 [ms] (mean, across all concurrent requests)
Transfer rate:          656.48 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    6   3.5      5      38
Processing:     9   14  11.4     12     248
Waiting:        4    8   4.1      8      59
Total:         13   20  11.8     18     251

Percentage of the requests served within a certain time (ms)
  50%     18
  66%     20
  75%     21
  80%     22
  90%     25
  95%     29
  98%     42
  99%     48
 100%    251 (longest request)
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
Document Length:        13569 bytes

Concurrency Level:      1
Time taken for tests:   10.061 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      6879000 bytes
HTML transferred:       6784500 bytes
Requests per second:    49.70 [#/sec] (mean)
Time per request:       20.122 [ms] (mean)
Time per request:       20.122 [ms] (mean, across all concurrent requests)
Transfer rate:          667.69 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    6   4.2      5      39
Processing:     9   14   9.2     12     198
Waiting:        4    8   9.2      7     193
Total:         13   20  10.2     18     203

Percentage of the requests served within a certain time (ms)
  50%     18
  66%     19
  75%     21
  80%     22
  90%     26
  95%     31
  98%     42
  99%     50
 100%    203 (longest request)
```
