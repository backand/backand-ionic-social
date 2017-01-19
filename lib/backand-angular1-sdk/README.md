angular1-sdk
===
[![npm version](https://img.shields.io/npm/v/@backand/angular1-sdk.svg?style=flat-square)](https://www.npmjs.org/package/@backand/angular1-sdk)
[![npm downloads](https://img.shields.io/npm/dt/@backand/angular1-sdk.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@backand/angular1-sdk)

>  Backand SDK for [Angularjs1](https://angularjs.org/).
This SDK enables you to communicate comfortably and quickly with your Backand app.
It wraps the [vanilla-sdk](https://github.com/backand/vanilla-sdk) to allow easier work on projects involving Angularjs1.


## Installation
- npm:
```bash
$ npm i -S @backand/angular1-sdk
```
- yarn:
```bash
$ yarn add @backand/angular1-sdk
```
- download/clone:
```bash
$ git clone https://github.com/backand/angular1-sdk.git
```


## Import
-  index.html:
``` html
<script src="node_modules/@backand/angular1-sdk/backand.provider.min.js"></script>
<script src="backand.provider.min.js"></script>
```


## Quick start
```javascript
angular
  .module('myApp', ['backand'])
  .config(function (BackandProvider) {
    BackandProvider.init({
      appName: 'APP_NAME',
      anonymousToken: 'ANONYMOUS_TOKEN'
    });
  })
  .controller('myAppCtrl', ['$scope', '$http', 'Backand', function myAppCtrl() {

  }]);
```


## Examples
***To view the demo web page, just run npm start - [example page](https://github.com/backand/angular1-sdk/blob/master/example/).***


## License

  [MIT](LICENSE)
