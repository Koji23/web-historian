var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

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

exports.isUrlInList = function() {
  // checks against sites.txt
};

exports.addUrlToList = function(url, res) {
  // writes to sites.txt
  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      throw err;
    } else {
      fs.readFile('./web/public/loading.html', (err, data) => {
        if (err) {
          throw err;
        } else {
          // httpHelpers.headers['Content-Type'] = 'application/json';
          res.writeHead(200, httpHelpers.headers);
          res.write(data);
          res.end();  
        }
      });
    } 
  });
};

exports.isUrlArchived = function() {
  // checks against sites folder
};

exports.downloadUrls = function() {
  // writes to sites folder
};
