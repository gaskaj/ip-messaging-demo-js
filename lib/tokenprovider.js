'use strict';

var twilio = require('twilio');

function TokenProvider(config) {
  Object.defineProperties(this, {
    accountSid: {
      enumerable: true,
      value: config.bot.twilio.account_sid
    },
    signingKeySid: {
      enumerable: true,
      value: config.bot.twilio.api_key
    },
    signingKeySecret: {
      enumerable: true,
      value: config.bot.twilio.api_secret
    },
    serviceSid: {
      enumerable: true,
      value: config.bot.twilio.ipmessaging.ipm_service_sid
    }
  });
}

TokenProvider.prototype.getToken = function(identity, endpointId) {
  var token = new twilio.AccessToken(this.accountSid, this.signingKeySid, this.signingKeySecret, {
    identity: identity,
    ttl: 3600
  });

  var grant = new twilio.AccessToken.IpMessagingGrant();

  grant.serviceSid = this.serviceSid;
  grant.endpointId = this.serviceSid + identity + endpointId;
  token.addGrant(grant);

  return token.toJwt();
};

module.exports = TokenProvider;

