(function() {
  'use strict';

  angular
      .module('backand', [])
      .provider('Backand', BackandProvider);

  function BackandProvider() {
    this.init = backand.init;
    var config = { };
    this.setAppName = function (appName) {
      config.appName = appName;
      return this;
    };
    this.setAnonymousToken = function (anonymousToken) {
      config.anonymousToken = anonymousToken;
      return this;
    };
    this.setSignUpToken = function (signUpToken) {
      config.signUpToken = signUpToken;
      return this;
    };
    this.setApiUrl = function (newApiUrl) {
      config.apiUrl = newApiUrl;
      return this;
    };
    this.manageRefreshToken = function (manageRefreshToken) {
      config.manageRefreshToken = manageRefreshToken;
      return this;
    };
    this.runSigninAfterSignup = function (runSigninAfterSignup) {
      config.runSigninAfterSignup = runSigninAfterSignup;
      return this;
    };
    this.runSocket = function (runSocket) {
      config.runSocket = runSocket;
      return this;
    };
    this.setSocketUrl = function (newSocketUrl) {
      config.socketUrl = newSocketUrl;
      return this;
    };
    this.setIsMobile = function(isMobile){
      config.isMobile = isMobile;
      return this;
    };

    this.$get = ['$timeout', function BackandFactory($timeout) {
      backand.init && backand.init(config);
      var BKNDANGULAR = (function wrap (obj) {
        var temp = obj.constructor();
        Object.keys(obj).forEach(function (key) {
          if (typeof obj[key] === 'function') {
            temp[key] = function () {
              var args = Array.prototype.slice.call(arguments);
              return $timeout.apply(undefined, [obj[key], 0, true].concat(args));
            }
          }
          else if(typeof obj[key] !== 'object' || key === 'utils' || key === 'defaults') {
            temp[key] = obj[key];
          }
          else {
            temp[key] = wrap(obj[key]);
          }
        });
        return temp;
      })(backand);

      BKNDANGULAR.setIsMobile = function(isMobile){
        backand.defaults.isMobile = isMobile;
      };
      BKNDANGULAR.getApiUrl = function(){
        return backand.defaults.apiUrl;
      };

      return BKNDANGULAR;
    }];
  }
})();
