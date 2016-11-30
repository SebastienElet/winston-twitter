# Winston twitter
> Output your logs on twitter

## Usage

```js
const winston = require('winston');
const winstonTwitter = require('winston-twitter').Twitter;

winston.add(winstonTwitter, {
  consumer_key: 'TwitterConsumerKey',
  consumer_secret: 'TwitterconsumerSecret',
  access_token_key: 'TwitterAccessToken',
  access_token_secret: 'TwitterAccessTokenSecret',
})
```
