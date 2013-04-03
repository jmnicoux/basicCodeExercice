/*global require,module,fs*/
var fs = require('fs');
(function(module, fs) {
  'use strict';
  var instance,
    ReverseFile = function (){
    var data = null,
      sourceFileName = null,
      destFileName = null;
    return {
      processArguments: function (psourceFileName, pdestFileName) {
        if (!psourceFileName || !fs.existsSync(psourceFileName)) {
          return false;
        }
        if (!pdestFileName || pdestFileName === "") {
          return false;
        }
        sourceFileName = psourceFileName;
        destFileName = pdestFileName;
        return true;
      },
      getSourceFileName: function() {
        return sourceFileName;
      },
      getDestFileName: function() {
        return destFileName;
      },
      readSourceFile: function () {
        try {
          data = fs.readFileSync(this.getSourceFileName(), "utf8");
        } catch (e) {
          throw e;
        }
      },
      getData: function() {
        return data;
      },
      reverseSourceData: function () {
        data = data.split("").reverse().join("");
      },
      writeReverseContent: function () {
        try {
          fs.writeFileSync(destFileName, this.getData());
          return true;
        }catch(e) {
          throw e;
        }
      }
    };
  };

  module.exports.getInstance = function() {
    if(!instance) {
      instance = new ReverseFile();
    }
    return instance;
  };
}(module, fs));
