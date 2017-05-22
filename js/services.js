angular.module('SimpleRESTIonic.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
      var service = this;

      service.responseError = function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('unauthorized');
        }
        return $q.reject(response);
      };
    })

    .service('ItemsModel', function ($rootScope, Backand) {
      var service = this,
          objectName = 'items';

      service.all = function () {
        return Backand.object.getList(objectName);
      };

      service.fetch = function (id) {
        return Backand.object.getOne(objectName,id);
      };

      service.create = function (object) {
        return Backand.object.create(objectName,object);
      };

      service.update = function (id, object) {
        return Backand.object.update(objectName, id, object);
      };

      service.delete = function (id) {
        return Backand.object.remove(objectName, id);
      };

      Backand.on('items_updated', function (data) {
        //Get the 'items' object that have changed
        console.log(data);
        $rootScope.$broadcast('items_updated')
      });

    })

    .service('LoginService', function (Backand) {
      var service = this;

      service.signin = function (email, password) {
        //call Backand for sign in
        return Backand.signin(email, password);
      };

      service.anonymousLogin= function(){
        // don't have to do anything here,
        // because we set app token att app.js
      };

      service.socialSignin = function (provider) {
        return Backand.socialSignin(provider);
      };

      service.socialSignup = function (provider) {
        return Backand.socialSignup(provider);
      };

      service.signout = function () {
        return Backand.signout();
      };

      service.signup = function(firstName, lastName, email, password, confirmPassword){
        return Backand.signup(firstName, lastName, email, password, confirmPassword);
      };

      service.getUsername = function(){
        return Backand.user.getUsername();
      };

      service.socialSigninWithToken= function(provider, accessToken){
        return Backand.signinWithToken(provider, accessToken);
      }

    });