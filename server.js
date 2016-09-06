
var express = require('express');
var app = new express();

var config = require('./config');
if (!config.bot.twilio.ipmessaging.ipm_service_sid) {
  console.warn('ERROR: Configuration not correct!');
}


var TokenProvider = require('./lib/tokenprovider');
var tokenProvider = new TokenProvider(config);

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

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'));
