"use strict";

var proxyquire = require('proxyquire');
var should = require('should');
var fs = require('fs');

var parse = require('../lib/parser');

describe('git-tree', function() {
  it('should parse the output', function(done) {
    parse(fs.readFileSync(__dirname + '/fixture.txt', 'utf8')).should.eql(require(__dirname + '/output.json'));
    done();
  });

  it('should create the command correctly', function(done) {
    var repoPath = '/home/node.git';
    var rev = 'master';

    var gitAuthors = proxyquire('../', {
      'child_process': {
        exec: function(cmd, cb) {
          var args = ['git', '--git-dir=' + repoPath, 'shortlog', '-sne', rev, '<', '/dev/tty', '||'];
          args.push('git', '--git-dir=' + repoPath, 'shortlog', '-sne', rev);

          cmd.should.eql(args.join(' '));

          cb(null, 'sample');
        }
      },
      './lib/parser': function(content) {
        return 'parsed ' + content;
      }
    });

    gitAuthors(repoPath, rev, function(err, result) {
      result.should.eql('parsed sample');

      done();
    });
  });
});
