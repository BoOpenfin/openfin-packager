
'use strict';
var path = require('path'),
    fs = require('fs-extra'),
    meow;
const { exec } = require('pkg')
const plist = require('plist')

function main(cli) {
    meow = cli;
    //console.log(cli);
    console.log(cli.input[0]);
    console.log(cli.input[1]);
    createApp();
    updateExecutable(cli.input[0]);
    addIcon(cli.input[1]);
    addPlist();
}

function createApp () {
    var outDir = __dirname + '/Demo.app';

    fs.emptyDirSync(outDir);
    fs.mkdirSync(outDir + '/Contents');
    fs.mkdirSync(outDir + '/Contents/MacOS');
    fs.mkdirSync(outDir + '/Contents/Resources');
}

async function updateExecutable (dirname) {
    console.log('creating unix executable file');
    const result = await exec([ path.join(dirname, 'main.js'), '--target', 'macos', '--output', 'OpenFin' ]);

    var exeDir = __dirname + '/Demo.app/Contents/MacOS';
    fs.rename(path.join(__dirname, 'OpenFin'), path.join(exeDir, 'Demo'), function (err) {
      if (err) throw err
      console.log('Successfully produce executable file!')
    })
}

function addPlist () {
    var fileName = __dirname + '/Demo.app/Contents/Info.plist';
    var json =
      {
        "bundle-identifier": "com.openfin.app",
        "bundle-version": "0.1.1",
        "kind": "software",
        "title": "Demo",
        "CFBundleDisplayName": "Demo",
        "CFBundleIconFile": "Demo.icns"
      }
    ;
    fs.writeFile(fileName, plist.build(json), (err) => {
        if (err) throw err;
        console.log('plist file produced!');
    });
}

function addIcon (iconName) {
    var exeDir = __dirname + '/Demo.app/Contents/Resources';
    fs.copyFile(iconName, path.join(exeDir, 'Demo.icns'), function (err) {
      if (err) throw err
      console.log('Successfully copy icon file!')
    })
}

module.exports = main;