/**
 *  @author danielmoffat
 *
 *  @description Basic Express app that proxies fake requests
 *  from our Angular app to the real API. The main goals being improved API usability
 *  and additional functionality (some endpoints don't return JSON for example and instead have full page
 *  HTML responses, this makes it difficult to consume).
 *
 *  It's only meant to be used locally to drive the Angular app in /src/client/scripts/angular/shop-app
 *
 *  Currently implemented:
 *  - Get basket contents
 *  - Add item to basket
 *  - Remove item from basket
 *  - Get a list of all available cards that can be added to basket
 *
 *  These simple things alone enable us to write different front-ends that consume this API
 *
 */
var express = require('express');
var request = require('request');
var merge = require('merge');
var cors = require('cors');
var config = require('./config');
var utils = require('./utils');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

// In-memory cache to store API query results.
var cache = {};

// todo: add logging in and grabbing cookie to use throughout
app.get('/auth', function(req, res) {});

/**
 *  Add the specified card to your basket.
 */
app.post('/api/add', function(req, res) {

  var options = utils.buildOptionsObject({
    url: config.ENDPOINTS.addItem,
    // todo use the actual card object from a client
    form: utils.createFormObjectFromCardObject(config.DUMMY_CARD_OBJECT)
  });

  request(options, function(err, resp) {

    if(err || resp.statusCode !== 200) {
      return res.json(config.JSON_RESPONSES.UNKNOWN_ERROR);
    }

    return res.json({
      success: true
    });
  });
});

/**
 *  Remove the specified card from your basket.
 */
app.post('/api/remove', function(req, res) {
  if(!req.body.orderLineId) {
    return res.json(config.JSON_RESPONSES.UNKNOWN_ERROR);
  }

  var options = utils.buildOptionsObject({
    url: config.ENDPOINTS.deleteItem,
    form: {
      line: req.body.orderLineId
    }
  });

  // I found the API inconsistent with return values when deleting items (for example,
    // returning 'success: false' when an item was actually deleted successfully..)
  request(options, function(err) {
    return res.json({
      success: true
    });
  });
});

/**
 *  Get the basket details for the currently logged in user, this is a combination
 *  of both the `gc` cookie and the `everyclick` OR `prospect` cookie.
 *
 *  'gc' cookie looks something like '42 ad685f7f134e' where 42 is the orderRef.
 *
 */
app.get('/api/basket', function(req, res) {
  var options = utils.buildOptionsObject({
    url: config.ENDPOINTS.basket
  });

  request(options, function(err, resp, body) {
    if(err || resp.statusCode !== 200) {
      console.log(err)
      return res.json(config.JSON_RESPONSES.UNKNOWN_ERROR);
    }

    return res.json(JSON.parse(resp.body));
  });
});

/**
 *  Query for cards with specified attributes
 */
app.get('/api/query', function(req, res) {

  // Build our request config object
  var options = utils.buildOptionsObject({
    url: config.ENDPOINTS.query,
    form: merge(config.DEFAULT_FILTERS, req.query)
  });

  // Use a string respresentation of the options as the cache key
  var cacheKey = JSON.stringify(options);

  console.log('Using options..', options);

  // Retrieve from cache if it's there
  if(cache[cacheKey]) {
    console.log('Found in cache!');
    return res.json(JSON.parse(cache[cacheKey]));
  }

  console.log('Not found in cache, retrieving..');
  // Not in cache, add a key
  cache[JSON.stringify(options)] = true;

  // Make the request and add the value to the cache
  request(options, function(err, resp, body) {
    if(err || resp.statusCode !== 200) {
      return res.json(config.JSON_RESPONSES.UNKNOWN_ERROR);
    }
    cache[cacheKey] = resp.body;
    return res.json(JSON.parse(resp.body));
  });
});

app.listen(3333, function() {
  console.log('Listening on port 3333.');
});
