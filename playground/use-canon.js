'use strict'
 
const autocannon = require('autocannon')
 
autocannon({
  url: 'https://www.facebook.com',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, console.log)