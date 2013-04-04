/*global require,module*/
var fs = require('fs');

(function () {
  'use strict';
  var methods = {
    walk: function (dir, validation_function, cb) {
      if (arguments.length === 2) {
        cb = validation_function;
        validation_function = null;
      }

      var results = [];
      fs.readdir(dir, function (err, list) {
        if (err) {
          return cb(err);
        }

        var pending = list.length;

        if (!pending) {
          return cb(null, results);
        }

        list.forEach(function (file) {
          file = dir + '/' + file;
          fs.stat(file, function (err, stat) {
            if (stat && stat.isDirectory()) {
              methods.walk(file, validation_function, function (err, res) {
                results = results.concat(res);
                if (!(pending -= 1)) {
                  cb(null, results);
                }
              });
            } else {
              if (typeof validation_function === 'function') {
                if (validation_function(file)) {
                  results.push(file);
                }
              } else {
                results.push(file);
              }

              if (!(pending -= 1)) {
                cb(null, results);
              }
            }
          });
        });
      });
    }
  };
  module.exports = methods;
}());
