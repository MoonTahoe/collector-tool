Collector
=========
This application moves files form a source directory to a destination directory. It will also download a web page from a source
url and save it in the destination directory

Topics
-------
* fs files
* fs directories
* process.argv

Installing and Running Solution
-------------------------------
1. Open terminal and enter the following commands

```
    $ npm install
    $ npm collector.js -s ./sampleSource -d ./out
    $ npm collector.js -s http://www.moonhighway.com -d ./out

```

2. Take a look in the ./out folder, your files should be there along with the moonhighway home page
