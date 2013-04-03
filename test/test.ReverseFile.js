/*global require,suite,test,console*/
var chai = require('chai'), expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  fs = require('fs'),
  ReverseFile = require('../lib/ReverseFile.js');
  chai.use(sinonChai);
suite('Reverse file', function() {
  'use strict';
  test('should exist', function() {
    var reverseFile = ReverseFile.getInstance();

    expect(reverseFile).to.be.ok;
  });
  suite('when i process arguments', function(){
    test('it should return false for unspecified source file', function(){
      var reverseFile = ReverseFile.getInstance();

      expect(reverseFile.processArguments('','./test/myreversetextfile.txt')).to.equal(false);
    });
    test('it should test source file exists.', function() {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      reverseFile.processArguments('./test/mytextfile.txt','./test/myreversetextfile.txt');

      expect(fs.existsSync.calledWith('./test/mytextfile.txt')).to.be.ok;
      stubexistsync.restore();
    });
    test('it should return false for unspecified destination file', function() {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      expect(reverseFile.processArguments('./test/mytextfile.txt', '')).to.equal(false);
      stubexistsync.restore();
    });
    test('sourceFileName getter should return same as processed argument after valid check', function() {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');

      expect(reverseFile.getSourceFileName()).to.equal('./test/mytextfile.txt');
      stubexistsync.restore();
    });
    test('destFileName getter should return same as processed argument after valid check', function() {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');

      expect(reverseFile.getDestFileName()).to.equal('./test/myreversetextfile.txt');
      stubexistsync.restore();
    });
  });
  suite('when i read source file', function() {
    test('it should call the filesystem readFileSync once', function() {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt','./test/myreversetextfile.txt');
      reverseFile.readSourceFile();

      expect(fs.readFileSync).to.be.calledOnce;
      stubexistsync.restore();
      stubreadfilesync.restore();
    });
    test('it should set the data content to the read file content', function() {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt','./test/myreversetextfile.txt');
      reverseFile.readSourceFile();
      expect(reverseFile.getData()).to.equal('abcdef12345');
      stubexistsync.restore();
      stubreadfilesync.restore();
    });
  });
  suite('when i reverse the data', function() {
    test('it should return data with reversed source content', function() {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt','./test/myreversetextfile.txt');
      reverseFile.readSourceFile();
      reverseFile.reverseSourceData();

      expect(reverseFile.getData()).to.equal('54321fedcba');
      stubexistsync.restore();
      stubreadfilesync.restore();
    });
  });
  suite('when i save the data', function() {
    test('it should call the writeFileSync to write the data to the filesystem', function() {
      var savedata= {},
        stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        stubwritefilesync = sinon.stub(fs, 'writeFileSync', function(path, buffer) {
          savedata.path = path;
          savedata.buffer = buffer;
        }),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt','./test/myreversetextfile.txt');
      reverseFile.readSourceFile();
      reverseFile.reverseSourceData();
      reverseFile.writeReverseContent();
      expect(fs.writeFileSync).to.be.calledOnce;
      expect(savedata.path).to.be.equal('./test/myreversetextfile.txt');
      expect(savedata.buffer).to.be.equal('54321fedcba');
      stubexistsync.restore();
      stubreadfilesync.restore();
      stubwritefilesync.restore();
    });
  });
});