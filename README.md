# openfin-packager
package openfin project into mac_os application.

Strat from a Node.js file that [Launchs Openfin](https://github.com/openfin/node-openfin-launcher) with target json, and use [pkg](https://github.com/zeit/pkg) to package this js file into an executable unix file. Then warp it to a standard mac application file with customized name, icon, etc.

## Dependencies

##### Mac

* [Node.js](https://nodejs.org/) v10.X

## Usage
```sh
$ node cli.js -t projectAppJson
```
projectAppJson can be a url link like: https://cdn.openfin.co/demos/hello/app.json
Or a local json file with full path.