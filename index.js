'use strict';

const { exec } = require('pkg')
const plist = require('plist')
var path = require('path'),
    fs = require('fs-extra'),
    meow,
    name;

function main(cli) {
    meow = cli;

    var flags = cli.flags,
        folder = flags.t || flags.target,
        icon = flags.i || flags.icon;
    name = flags.n || flags.name || 'Demo';

    if (isEmpty(flags)) {
        console.log(cli.help);
        return;
    }

    createApp();
    updateExecutable(folder);

    if(icon) {
        addIcon(icon);
    }
    addPlist();
}

//makeshift is object empty function
function isEmpty(flags) {
    for (var key in flags) {
        if (flags.hasOwnProperty(key) && flags[key] !== false) {
            return false;
        }
    }
    return true;
}

function createApp() {
    var outDir = __dirname + `/${name}.app`;

    fs.emptyDirSync(outDir);
    fs.mkdirSync(outDir + '/Contents');
    fs.mkdirSync(outDir + '/Contents/MacOS');
    fs.mkdirSync(outDir + '/Contents/Resources');
}

async function updateExecutable (configPath) {
    console.log('creating unix executable file');
    // write main.js

    const content1 = 'const openfinLauncher = require(\'openfin-launcher\');\n';
    const content2 = `openfinLauncher.launchOpenFin({configPath: \'${configPath}\' });`;
    fs.writeFile('main.js', content1+content2, { flag: 'w' }, (err) => {console.log(err)});

    const result = await exec(['main.js', '--target', 'macos', '--output', 'OpenFin']);

    var exeDir = __dirname + `/${name}.app/Contents/MacOS`;
    fs.rename(path.join(__dirname, 'OpenFin'), path.join(exeDir, name), function (err) {
      if (err) throw err
      console.log('Successfully produce executable file!')
    })
}

function addPlist() {
    var fileName = __dirname + `/${name}.app/Contents/Info.plist`;
    var json =
      {
        "bundle-identifier": "com.openfin.app",
        "bundle-version": "0.1.1",
        "kind": "software",
        "title": name,
        "CFBundleDisplayName": name,
        "CFBundleIconFile": `${name}.icns`
      }
    ;
    fs.writeFile(fileName, plist.build(json), (err) => {
        if (err) throw err;
        console.log('plist file produced!');
    });
}

function addIcon (iconName) {
    var exeDir = __dirname + `/${name}.app/Contents/Resources`;
    fs.copyFile(iconName, path.join(exeDir, `${name}.icns`), function (err) {
      if (err) throw err
      console.log('Successfully copy icon file!')
    })
}

module.exports = main;