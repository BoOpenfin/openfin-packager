#!/usr/bin/env node

'use strict';
var meow = require('meow'),
    openfinPackager = require('./');
const options = {
    flags: {
        name: { alias: 'i', type: 'string' },
        url: { alias: 'u', type: 'string' },
        config: { alias: 'c', type: 'string' },
        launch: { alias: 'l', type: 'boolean' }
    }
};

var cli = meow({
    help: [
        'OpenFin packager is capable to pakage a Node.js Openfin Project into a single application file',
        'Options:',

        '-i --icon icon file for application',
        
        'Example',
        'openfin ../AppFolder APP_NAME --icon=../icon.icons'
    ].join('\n')
});

openfinPackager(cli);