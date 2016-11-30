'use strict';

const util = require('util');
const winston = require('winston');
const Twitter = require('twitter');

const twitterLogger = exports.Twitter = function twitterLogger(options) {
  this.client = new Twitter(options || {});
};

util.inherits(twitterLogger, winston.Transport);
winston.transports.Twitter = twitterLogger;

twitterLogger.prototype.log = function log(level, msg, meta, callback) {
  const self = this; // eslint-disable-line
  const start = 0;
  const truncate = 140;

  msg = msg.substring(start, truncate);
  this.client.post(
    'statuses/update',
    { status: msg },
    (error) => {
      if(error) {
        self.emit('error', error);
      }
      this.emit('logged');

      callback(null, true);
    }
  );
};
