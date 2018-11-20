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

        '-t --target openfin project target folder',
        '-i --icon icon file for application',

        'Example',
        'openfin -t AppFolder -i AoppIcon.icns'
    ].join('\n')
});

openfinPackager(cli);