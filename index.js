"use strict";

var debug = require('debug')('git-authors');
var exec = require('child_process').exec;
var parse = require('./lib/parser');

function listAuthors(repoPath, rev, callback) {
  if (typeof rev === 'function') {
    callback = rev;
    rev = 'master';
  } else if (!rev) {
    rev = 'master';
  }

  // if process is forked (is a child) then there's a problem with /dev/tty
  var args = ['git', '--git-dir=' + repoPath, 'shortlog', '-sne', rev, '<', '/dev/tty', '||'];
  args.push('git', '--git-dir=' + repoPath, 'shortlog', '-sne', rev);
  var cmd = args.join(' ');

  debug('cmd', cmd);

  exec(cmd, function(err, stdout, stderr) {
    if (err && stderr) { return callback(err); }

    callback(null, parse(stdout.trim()));
  });
}

module.exports = listAuthors;
