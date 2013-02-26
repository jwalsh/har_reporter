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
    fs.readFileSync('data/example.com.har'));
};

exports.report = function() {

  var log = exports.load();
  var entries = log.log.entries;
  var report = [];

  for (var i = 0; i < entries.length; i++) {

    var url = entries[i].request.url.substr(0, 45);
    var status = entries[i].response.status;
    if (entries[i].response.content.text) {
      var match = entries[i].response.content.text.match(/[a-zA-Z0-9+/]{16}/);
      if (match) {
        report.push(match[0]);
      }
    } else {
      report.push(url + ' ' + status);
    }
  }

  return report;
};
