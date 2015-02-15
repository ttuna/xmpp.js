'use strict';

/*
 * Cluster example
 * You will need an xmpp server with component load balancing support
 * ejabberd or prosody with https://code.google.com/p/prosody-modules/wiki/mod_component_roundrobin
 * edit config then run npm server.js
 */

var Component = require('../..')
   ,config = require('./config')

var component = new Component(config)

component.on('stanza', function(stanza) {
    console.log('worker', process.pid, 'component stanza IN', stanza.toString())
})

component.on('online', function() {
    console.log('worker', process.pid, 'component online')
})

component.on('offline', function () {
    console.log('worker', process.pid, 'component offline')
})

component.on('connect', function () {
    console.log('worker', process.pid, 'component connected')
})

component.on('reconnect', function () {
    console.log('worker', process.pid, 'component reconnecting')
})

component.on('disconnect', function (e) {
    console.log('worker', process.pid, 'component disconnected', e)
})

component.on('error', function(e) {
    console.error('worker', process.pid, 'component error', e)
    process.exit(1)
})

process.on('exit', function () {
    component.end()
})
