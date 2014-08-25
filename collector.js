#!/usr/bin/env node
var http = require('http'),
    path = require('path'),
    fs = require('fs');

/**
 * Selects the argv value based on a key
 * @example
 *
 *       // The -o argv variable
 *       var outDir = collector.getARGV(['node',
 *           'collector.js',
 *           '-o',
 *           './docs/'], "o")
 *
 * @for Collector
 * @method getARGV
 * @param argv {Array} The process.argv array
 * @param key {String} A string representing the name of the variable to select
 * @returns {String} The argv value
 */
function getARGV(argv, key) {
    var i = argv.indexOf('-' + key) + 1;
    return (i) ? argv[i] : false;
}

/**
 * The Source directory or url
 * @for Collector
 * @property source
 * @default 'http://www.moonhighway.com/'
 * @type {String}
 */
var source = getARGV(process.argv, 's');

/**
 * The destination directory
 * @for Collector
 * @property destination
 * @default './out'
 * @type {String}
 */
var destination = getARGV(process.argv, 'd');

/**
 * Makes a web request and sends the results to a callback function
 * @example
 *
 *       collector.makeRequest('http://www.moonhighway.com', function (html) {
 *             html;       // The HTML form http://www.moonhighway.com
 *       });
 *
 * @for Collector
 * @method makeRequest
 * @param url {String} The url for the request
 * @param cb {function} The callback function for when the request is complete
 */
function makeRequest(url, cb) {

    url = url.replace('http://', '').replace('https//', '');

    var opts = {
        hostname: url,
        port: 80,
        path: '',
        method: 'GET'
    };

    http.get(opts, function (res) {

        var html = '';
        console.log('Making Request for ' + url);

        res.on('data', function (chunk) {
            html += chunk;
        });

        res.on('end', function () {
            cb(html);
        });

    }).on("error", function (e) {

        console.log("There was an error making the request");
        console.log(e);

    });
}

/**
 * Collects files from a source and moves them to a destination directory. Downloads web pages from
 * a url and saves them in the target directory
 * @example
 *
 *      var collector = require('collector');
 *
 *      // Move files from ./sampleSource to ./out
 *      collector.Collector('./sampleSource', './out');
 *
 *      // Download html from http://www.moonhighway.com and save it to the ./out directory
 *      collector.Collector('http://www.moonhighway.com', './out');
 *
 * @class Collector
 * @param source
 * @param target
 * @param cb
 * @constructor
 */
function collector(source, target, cb) {

    if (!fs.existsSync(__dirname + target.replace('.', ''))) {
        fs.mkdirSync(target);
    }

    if (source.indexOf('http://') !== -1) {

        makeRequest(source, function (html) {

            var u = source.replace('http://', '').replace('https//', ''),
                dest = path.normalize(target + '/' + u + '.html');

            fs.appendFileSync(dest, html.trim());

        });

    } else {
        var p = path.normalize(__dirname + '/' + source),
            files = fs.readdirSync(p);

        files.forEach(function (file, i) {

            fs.readFile(path.normalize(p + '/' + file), 'UTF-8', function (err, data) {
                if (err) {
                    throw err;
                }

                fs.writeFileSync(path.normalize(__dirname + '/' + target + '/' + file), data);

                if (i === files.length - 1) {
                    cb();
                }

            });

        });
    }
}


/**
 * A node js module that collects files from folders and urls
 * @module Collector
 */
module.exports.getARGV = getARGV;
module.exports.makeRequest = makeRequest;
module.exports.collector = collector;

if (!module.parent) {
    if (!source || !destination) {
        console.log("Both source (-s) and destination are required (-d)");
    } else {
        collector(source, destination, function () {
            console.log("Finished Collecting and Dumping");
        });
    }
}


