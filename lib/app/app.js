/*global require, process*/
(function () {
  'use strict';
  var reverseFile = require('controllers/ReverseFile.js').getInstance();
  if (reverseFile.processArguments(process.argv[2], process.argv[3])) {
    reverseFile.readSourceFile();
    reverseFile.reverseSourceData();
    reverseFile.writeReverseContent();
  }

}());
