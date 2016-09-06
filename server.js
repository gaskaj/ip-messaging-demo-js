

var express = require('express');

var config = require('./config');
var TokenProvider = require('./lib/tokenprovider');


var app = new express();
var tokenProvider = new TokenProvider(config);

if (config.bot.twilio.ipmessaging.ipm_service_sid) {
  console.warn('ERROR: Configuration not correct!  Please see documentation convertes');
}

app.get('/getToken', function(req, res) {
  var identity = req.query && req.query.identity;
  var endpointId = req.query && req.query.endpointId;

  if (!identity || !endpointId) {
    res.status(400).send('getToken requires both an Identity and an Endpoint ID');
  }

  var token = tokenProvider.getToken(identity, endpointId);
  res.send(token);
});

app.use(express.static(__dirname + '/public'));

app.listen(8080);
