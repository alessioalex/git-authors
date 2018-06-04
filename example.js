"use strict";

var gitAuthors = require('./');
var path = require('path');
// append '/.git' if missing from REPO path
var repoPath = path.resolve(process.env.REPO.replace(/\/(\.git\/?)?$/,"") + '/.git' || (__dirname + '/.git'));

gitAuthors(repoPath, function(err, list) {
  if (err) { throw err; }

  console.log(list);
});
