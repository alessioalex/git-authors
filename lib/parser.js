"use strict";

module.exports = function(content) {
  var authors = [];

  content.split('\n').forEach(function(line) {
    if (!line) { return; }

    var tmp = line.match(/(\d+)\s(.*) <([^>]+)>/);
    authors.push({
      commits: tmp[1],
      name: tmp[2],
      email: tmp[3]
    });
  })

  return authors;
};
