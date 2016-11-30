/* eslint no-console: 0 */
'use strict';

const winston = require('winston');
const winstonTwitter = require('../lib/winston-twitter').Twitter;
const nock = require('nock');
// nock.recorder.rec();

describe('winston-twitter', () => {

  before(() => {
    winston.remove(winston.transports.Console);
    winston.add(winstonTwitter, {
      consumer_key: 'consumerKey',
      consumer_secret: 'consumerSecret',
      access_token_key: 'accessToken',
      access_token_secret: 'accessTokenSecret',
    });
  });

  it('.info()', (done) => {
    const httpCall = nock(
      'https://api.twitter.com:443',
      { encodedQueryParams: true }
    );

    httpCall
      .post(
        '/1.1/statuses/update.json',
        'status=Hello%20twitter'
      )
      .reply(200, {
        user: {
          id: 1234,
          id_str: '1234',
          name: 'Yolo',
          screen_name: 'Yolo',
          location: '',
          description: '',
          url: null,
          entities: {
            description: { urls: [] },
          },
          protected: false,
          followers_count: 5,
          friends_count: 23,
          listed_count: 0,
          created_at: 'Mon Jun 10 10:10:10 +0000 2010',
          favourites_count: 3,
          utc_offset: null,
          time_zone: null,
          geo_enabled: false,
          verified: false,
          statuses_count: 5,
          lang: 'fr',
          contributors_enabled: false,
          is_translator: false,
          is_translation_enabled: false,
          profile_background_color: 'C0DEED',
          profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_tile: false,
          profile_image_url:
            'http://abs.twimg.com/sticky/default_profile_images/default_profile_0_normal.png',
          profile_image_url_https:
            'https://abs.twimg.com/sticky/default_profile_images/default_profile_0_normal.png',
          profile_link_color: '1DA1F2',
          profile_sidebar_border_color: 'C0DEED',
          profile_sidebar_fill_color: 'DDEEF6',
          profile_text_color: '333333',
          profile_use_background_image: true,
          has_extended_profile: false,
          default_profile: true,
          default_profile_image: true,
          following: false,
          follow_request_sent: false,
          notifications: false,
          translator_type: 'none',
        },
        geo: null,
        coordinates: null,
        place: null,
        contributors: null,
        is_quote_status: false,
        retweet_count: 0,
        favorite_count: 0,
        favorited: false,
        retweeted: false,
        lang: 'no',
      }, [
        'cache-control',
        'no-cache, no-store, must-revalidate, pre-check=0, post-check=0',
        'connection',
        'close',
        'content-disposition',
        'attachment; filename=json.json',
        'content-length',
        '1979',
        'content-type',
        'application/json;charset=utf-8',
        'date',
        'Sun, 27 Nov 2016 17:06:59 GMT',
        'expires',
        'Tue, 31 Mar 1981 05:00:00 GMT',
        'last-modified',
        'Sun, 27 Nov 2016 17:06:59 GMT',
        'pragma',
        'no-cache',
        'server',
        'tsa_f',
        'set-cookie',
        'lang=fr; Path=/',
        'set-cookie',
        'guest_id=v1%3A148026641946900000; Domain=.twitter.com; Path=/; ' +
          'Expires=Tue, 27-Nov-2018 17:06:59 UTC',
        'status',
        '200 OK',
        'strict-transport-security',
        'max-age=631138519',
        'x-access-level',
        'read-write',
        'x-connection-hash',
        '3d68e8832b5fda3de458b0bf1b000000',
        'x-content-type-options',
        'nosniff',
        'x-frame-options',
        'SAMEORIGIN',
        'x-response-time',
        '258',
        'x-transaction',
        '00d2de4700000000',
        'x-tsa-request-body-time',
        '0',
        'x-twitter-response-tags',
        'BouncerCompliant',
        'x-xss-protection',
        '1; mode=block',
      ])
    ;

    winston.info('Hello twitter', (err) => {
      if(err) {
        console.log('error', err);
      }
      httpCall.done();
      done();
    });

  });
});

