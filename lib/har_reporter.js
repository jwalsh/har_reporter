/*
 * har_reporter
 * https://github.com/jwalsh/har_reporter
 *
 * Copyright (c) 2013 Jason Walsh
 * Licensed under the MIT license.
 */

exports.report = function() {

  for (var i = 0; i < entries.length; i++) {
    if (entries[i].request.url.indexOf('decode_cookies') !== -1) {
      var url = entries[i].request.url.substr(0, 45);
      var status = entries[i].response.status;
      if (entries[i].response.content.text) {
        var bkid = entries[i].response.content.text.match(/[a-zA-Z0-9+/]{16}/);
        if (bkid) {
          console.log(bkid[0]);
        } else {
          console.log(url, status, entries[i].response.content.text);
        }
      }
    }
  }
  return 'awesome';
};
