# backand-ionic-social
Create mobile application with [ionic](http://www.ionicframework.com) and [backand](http://www.backand.com).

1 - To run starter, download zip and run ionic start:

    ionic start myApp https://github.com/backand/backand-ionic-social
    cd myApp

2 - Install Backand

    bower install backand-angular1-sdk
    bower install socket.io-client

3 - Install [InAppBrowser](https://cordova.apache.org/docs/en/3.0.0/cordova/inappbrowser/inappbrowser.html) cordova plugin.
    
    cordova plugin add cordova-plugin-inappbrowser
    
    ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git

4 - Run with ionic serve function

    ionic serve
    
In order to run the app on another platform (Android/iOS):

    cordova platform add <platform>
    ionic run <platform>
    
    
## Main Functioality

* Sign up to application and add new users with Signup tab.

* Sign up with all leads social app, Facebook, Google+ and Gitub.

Enjoy your mobile application, with backand at server side and full CRUD commands to server.

## Setting up your own realtime Backand application

1 - Want to customize data model or change authorization?
create a free personal application at [backand.com](https://www.backand.com/apps/#/sign_up)

2 - Use following model (or just keep the default Model):

    [
      {
        "name": "items",
        "fields": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "text"
          },
          "user": {
            "object": "users"
          }
        }
      },
      {
        "name": "users",
        "fields": {
          "email": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "items": {
            "collection": "items",
            "via": "user" 
          }
        }
      }
    ]
3 - Change the app's parameters (/js/app.js) in the Config section with your new app parameters:

      BackandProvider.setAppName('Your-App-Name');
      
      BackandProvider.setSignUpToken('Your-SignUp-Token');
      
      BackandProvider.setAnonymousToken('Your-Anonymous-Token');
