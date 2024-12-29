import * as newrelic from 'newrelic';

// import TransportStream from 'winston-transport';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const winston = require('winston');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const TransportStream = require('winston-transport');
// const Transport = require('winston-transport');

class NewRelicTransport extends TransportStream {
  constructor(opts) {
    super(opts);
    // this.name = `new-relic-winston-${process.env.HOST}`;
  }

  log(info, callback) {
    // Custom logging logic
    setImmediate(() => {
      this.emit('logged', info);
    });
    console.log('log');

    newrelic.recordCustomEvent('Log', info);
    newrelic.recordCustomEvent('Log', info);
    newrelic.recordCustomEvent('Log', info);

    callback();
  }
}

module.exports = NewRelicTransport;
