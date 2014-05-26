"use strict";

var gitAuthors = require('./');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || (__dirname + '/.git'));

gitAuthors(repoPath, function(err, list) {
  if (err) { throw err; }

  console.log(list);
});
