var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');  //\
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var statusCode; 
  
  if (req.method === 'GET') {
    statusCode = 200;
  } else if (req.method === 'POST') {
    statusCode = 201;
  } else if (req.method === 'OPTIONS') {
    statusCode = 200;
  }

  res.writeHead(statusCode, httpHelpers.headers);

  res.end(archive.paths.list);
};
