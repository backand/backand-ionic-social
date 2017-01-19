// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'backand', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

    /*   .run(function (, Backand) {

     })
     */
    .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        // change here to your appName
        BackandProvider.setAppName('ionicstarter');

        BackandProvider.setSignUpToken('a5fe6d23-711e-49e6-bcc6-0771b7228c5e');

        // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access
        BackandProvider.setAnonymousToken('136b0299-5dbe-44a0-8ef7-448231f9cedb');

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tabs',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.dashboard', {
                url: '/dashboard',
                views: {
                    'tab-dashboard': {
                        templateUrl: 'templates/tab-dashboard.html',
                        controller: 'DashboardCtrl as vm'
                    }
                }
            })
            .state('tab.login', {
                url: '/login',
                views: {
                    'tab-login': {
                        templateUrl: 'templates/tab-login.html',
                        controller: 'LoginCtrl as login'
                    }
                }
            })
            .state('tab.signup', {
                url: '/signup',
                views: {
                    'tab-signup': {
                        templateUrl: 'templates/tab-signup.html',
                        controller: 'SignUpCtrl as vm'
                    }
                }
            }
        );

        $urlRouterProvider.otherwise('/tabs/dashboard');
        $httpProvider.interceptors.push('APIInterceptor');
    })

    .run(function ($ionicPlatform, $rootScope, $state, LoginService, Backand) {

        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }


            var isMobile = !(ionic.Platform.platforms[0] == "browser");
            Backand.setIsMobile(isMobile);
            Backand.setRunSignupAfterErrorInSigninSocial(true);
        });

        function unauthorized() {
            console.log("user is unauthorized, sending to login");
            $state.go('tab.login');
        }

        function signout() {
            LoginService.signout();
        }

        $rootScope.$on('unauthorized', function () {
            unauthorized();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            if (toState.name == 'tab.login') {
                signout();
            }
            else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
                unauthorized();
            }
        });

    })
