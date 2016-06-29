var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');  //\
var fs = require('fs');

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
    //check txt file for url
      //if found reddirect to archived url
      //else write url to txt file
      //...let worker do its thing?
      //redirect to loading.html
    archive.addUrlToList(req.url, res); 
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, httpHelpers.headers);
    res.end(); 
  } else {
    res.writeHead(404, httpHelpers.headers);
    res.end(); 
  }

  // res.writeHead(statusCode, httpHelpers.headers);

  // res.end(archive.paths.list);
};

// fs.writeFile('message.txt', 'Hello Node.js', (err) => {
//   if (err) throw err;
//   console.log('It\'s saved!');
// });