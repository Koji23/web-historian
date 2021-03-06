var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),  
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  // read from sites.txt
  fs.readFile(exports.paths.list, (err, data) => {
    cb(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(str, cb) {
  // checks against sites.txt
  exports.readListOfUrls((dataArray) => {
    if (dataArray.indexOf(str) !== -1) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

exports.addUrlToList = function(str, cb) {
  // writes to sites.txt
  exports.isUrlInList(str, (exists) => {
    if (!exists) {
      fs.appendFile(exports.paths.list, str + '\n', (err) => {
        if (err) {
          throw err;
        } else {
          if (typeof cb === 'function') { /// <= can we get rid of if check?
            cb();
          }
        } 
      });
    }
  });
};


exports.isUrlArchived = function(str, cb) {
  // checks against sites folder
  fs.readdir(exports.paths.archivedSites, (err, filesArray) => {
    if (err) {
      throw err;
    } else {
      var contains = false;
      if (filesArray.indexOf(str) !== -1) {
        contains = true;
      }
      cb(contains);
    }
  });
};

exports.downloadUrls = function(urlsArray) {
  // writes to sites folder
  urlsArray.forEach((url) => {
    exports.isUrlArchived(url, (exists) => {
      if (!exists) {
        var file = fs.openSync('archives/sites/' + url, 'wx');   
        fs.closeSync(file);
      }
    });
  });
};









