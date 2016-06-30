// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var http = require('http');
var fs = require('fs');
var path = require('path');


var options = {
  host: 'www.bing.com',
};

http.get(options, function(res) {
  console.log('Got response: ' + res.statusCode);
  var body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    //create new file
    var filePath = path.join(archive.paths.archivedSites, options.host + '.html');
    var file = fs.openSync(filePath, 'w+');
    fs.closeSync(file);
    //write to file
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        throw err;
      }
      console.log('It\'s saved!');
    }); 
  });
}).on('error', function(e) {
  console.log('Got error: ' + e.message);
});