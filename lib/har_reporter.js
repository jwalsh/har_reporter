/*
 * har_reporter
 * https://github.com/jwalsh/har_reporter
 *
 * Copyright (c) 2013 Jason Walsh
 * Licensed under the MIT license.
 */

var fs = require('fs');

exports.load = function(file, cb) {
  return JSON.parse(
    fs.readFileSync('data/techcrunch.com.har'));
};

exports.report = function() {

  var log = exports.load();
  var entries = log.log.entries;
  var report = [];

  entries
    .filter(function(e, i, a) {
      return e.response.status === 200;
    })
    .forEach(
      function(e, i, a) {
        var match = '';
        var entry = {};

        // Provide a simple URL for the display
        var url = e.request.url
              .split('?')[0]
              .split(';')[0];

        var response = e.response;

        if (response.content.text) {
          match = response.headers.filter(
            function(e, i, a) {
              return e.name === 'Cache-Control';
            });
          // Pull back an array of all cache expectations
          match = match && match.length ?
            match.shift().value :
            '';
        }

        entry.url = url;
        entry.cache = match
          .split(',')
          .map(
            function(e, i, a) {
              return e.trim();
            });
        report.push(entry);
      });

  // var timeTime = entries.reduce(function(p, c, i, a) {
  //   return p.timings.wait ? p.timings.wait : 0 +
  //     c.timings.wait ? c.timings.wait : 0;
  // });
  //  console.log(timeTime);

  return report;
};
