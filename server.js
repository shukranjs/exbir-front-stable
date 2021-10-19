//Install express server
const express = require('express');
const path = require('path');
const forceSsl = require('force-ssl-heroku');
const app = express();
app.use(forceSsl);
app.use(express.static(__dirname + '/dist/exbir-spa'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/exbir-spa/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
