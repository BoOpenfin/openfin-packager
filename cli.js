#!/usr/bin/env node

'use strict';
var meow = require('meow'),
    openfinPackager = require('./');
const options = {
    flags: {
        target: { alias: 't', type: 'string' }
    }
};

var cli = meow({
    help: [
        'OpenFin packager is capable to pakage a Node.js Openfin Project into a single application file',
        'Options:',

        '-t --target openfin project\'s app json',
        '-i --icon icon file for application',
        '-n --name output application\'s name',

        'Example',
        'openfin -t AppJson -i AppIcon.icns -n AppName'
    ].join('\n')
});

openfinPackager(cli);