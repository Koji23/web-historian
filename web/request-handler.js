var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');  //\
var fs = require('fs');
var urlParser = require('url');
var http = require('follow-redirects').http;
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    fs.readFile('./web/public/index.html', (err, data) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(200, httpHelpers.headers);
        res.write(data);
        res.end();  
      }
    });
  } else if (req.method === 'POST') {
    var urlToArchive;
    req.on('data', (chunk) => {
      urlToArchive += chunk;
    });
    req.on('end', () => {
      urlToArchive = unescape(urlToArchive.toString()).split('=')[1];
      archive.addUrlToList(urlToArchive, () => {
        archive.isUrlArchived(urlToArchive, (exists) => {
          if (exists) {
            // redirect to archived html site
          } else {
            //redirect to loading
            fs.readFile('./web/public/loading.html', (err, data) => {
              if (err) {
                throw err;
              } else {
                res.writeHead(200, httpHelpers.headers);
                res.write(data);
                res.end();  
              }
            });
          }
        });     
      });
    });
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, httpHelpers.headers);
    res.end(); 
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end(); 
  }

};
