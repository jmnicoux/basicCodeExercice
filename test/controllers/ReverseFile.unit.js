/*global require,suite,test*/
var chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  fs = require('fs'),
  ReverseFile = require('../../lib/controllers/ReverseFile.js');

chai.use(sinonChai);
suite('../lib/ReversFile.js - Reverse file', function () {
  'use strict';
  test('getInstance() - instance should create', function () {
    var reverseFile = ReverseFile.getInstance();

    expect(reverseFile).to.be.an.instanceOf(Object);
  });
  suite('processArguments() - when i process arguments', function () {
    test('it should return false for unspecified source file', function () {
      var reverseFile = ReverseFile.getInstance();

      expect(reverseFile.processArguments('', './test/myreversetextfile.txt')).to.equal(false);
    });
    test('it should test source file exists.', function () {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');

      expect(fs.existsSync.calledWith('./test/mytextfile.txt')).to.be.equal(true);
      stubexistsync.restore();
    });
    test('it should return false for unspecified destination file', function () {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      expect(reverseFile.processArguments('./test/mytextfile.txt', '')).to.equal(false);
      stubexistsync.restore();
    });
    test('sourceFileName getter should return same as processed argument after valid check', function () {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');

      expect(reverseFile.getSourceFileName()).to.equal('./test/mytextfile.txt');
      stubexistsync.restore();
    });
    test('destFileName getter should return same as processed argument after valid check', function () {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');

      expect(reverseFile.getDestFileName()).to.equal('./test/myreversetextfile.txt');
      stubexistsync.restore();
    });
  });
  suite('readSourceFile() - when i read source file', function () {
    test('it should call the filesystem readFileSync once', function () {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');
      reverseFile.readSourceFile();

      expect(fs.readFileSync.calledOnce).to.be.equal(true);
      stubexistsync.restore();
      stubreadfilesync.restore();
    });
    test('read file failed goes throw error', function (done) {
      var stubexistsync, stubreadfilesync,
        reverseFile = ReverseFile.getInstance();
      try {
        stubexistsync = sinon.stub(fs, 'existsSync');
        stubreadfilesync = sinon.stub(fs, 'readFileSync', function () {
            throw new Error('i generate an error throw the readFileSync');
          });
        stubexistsync.returns(true);
        reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');

        expect(reverseFile.readSourceFile()).to.Throw(Error);

        stubexistsync.restore();
        stubreadfilesync.restore();
      } catch (e) {
        stubexistsync.restore();
        stubreadfilesync.restore();
        done();
      }
    });
    test('getData() - it should set the data content to the read file content', function () {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');
      reverseFile.readSourceFile();
      expect(reverseFile.getData()).to.equal('abcdef12345');
      stubexistsync.restore();
      stubreadfilesync.restore();
    });
  });
  suite('reverseSourceData() - when i reverse the data', function () {
    test('it should return data with reversed source content', function () {
      var stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');
      reverseFile.readSourceFile();
      reverseFile.reverseSourceData();

      expect(reverseFile.getData()).to.equal('54321fedcba');
      stubexistsync.restore();
      stubreadfilesync.restore();
    });
  });
  suite('writeReverseContent() - when i save the data', function () {
    test('it should call the writeFileSync to write the data to the filesystem', function () {
      var savedata = {},
        stubexistsync = sinon.stub(fs, 'existsSync'),
        stubreadfilesync = sinon.stub(fs, 'readFileSync'),
        stubwritefilesync = sinon.stub(fs, 'writeFileSync', function (path, buffer) {
          savedata.path = path;
          savedata.buffer = buffer;
        }),
        reverseFile = ReverseFile.getInstance();
      stubexistsync.returns(true);
      stubreadfilesync.returns('abcdef12345');

      reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');
      reverseFile.readSourceFile();
      reverseFile.reverseSourceData();
      reverseFile.writeReverseContent();
      expect(fs.writeFileSync.calledOnce).to.be.equal(true);
      expect(savedata.path).to.be.equal('./test/myreversetextfile.txt');
      expect(savedata.buffer).to.be.equal('54321fedcba');
      stubexistsync.restore();
      stubreadfilesync.restore();
      stubwritefilesync.restore();
    });
    test('write file failed goes throw error', function (done) {
      var stubexistsync, stubreadfilesync, stubwritefilesync,
        reverseFile = ReverseFile.getInstance();
      try {
        stubexistsync = sinon.stub(fs, 'existsSync');
        stubreadfilesync = sinon.stub(fs, 'readFileSync');
        stubwritefilesync = sinon.stub(fs, 'writeFileSync', function () {
          throw new Error('i generate an error throw the writeFileSync');
        });
        stubexistsync.returns(true);
        stubreadfilesync.returns('abcdef12345');

        reverseFile.processArguments('./test/mytextfile.txt', './test/myreversetextfile.txt');
        reverseFile.readSourceFile();
        reverseFile.reverseSourceData();
        reverseFile.writeReverseContent();
        expect(fs.writeFileSync()).to.Throw(Error);
        stubexistsync.restore();
        stubreadfilesync.restore();
        stubwritefilesync.restore();
      } catch (e) {
        stubexistsync.restore();
        stubreadfilesync.restore();
        stubwritefilesync.restore();
        done();
      }
    });
  });
});