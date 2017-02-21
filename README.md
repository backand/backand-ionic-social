# backand-ionic-social
Use this starter to create a mobile applicaiton with [ionic](http://www.ionicframework.com) and [backand](http://www.backand.com) built-in.

# Getting Started
To run the starter app, follow these easy steps:

1 - Download the archive and run ionic start

    ionic start myApp https://github.com/backand/backand-ionic-social
    cd myApp

2 - Install the Backand SDK and Socket.io

    bower install backand-angular1-sdk
    bower install socket.io-client

3 - Install the [InAppBrowser](https://cordova.apache.org/docs/en/3.0.0/cordova/inappbrowser/inappbrowser.html) cordova plugin
    
    cordova plugin add cordova-plugin-inappbrowser
    
    ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git

4 - Run with ionic serve function

    ionic serve
    
The app should now be available in your browser. To run the app on another platform (Android/iOS), use the following commands:

    cordova platform add <platform>
    ionic run <platform>
    
    
## Main Functionality

The application comes with a full server-side app in Backand, ready to go. It also provides full CRUD functionality via a RESTful API for each object. It also demonstrates the two primary authentication methods that we offer:

* Backand User Management - You can register and authenticate new users in the Signup tab
* Social Media Authentication - You can use leading social media applications (such as Facebook, Google, and GitHub) to register and authenticate your users


## Setting up your own realtime Backand application

While the basic app is useful for demonstration purposes, your app will most likely need a custom and more complex data model. Follow these easy steps to create a new Backand application and connect it to your app code:

1 - Sign up for a free account at [backand.com](https://www.backand.com/apps/#/sign_up) and create a new application in the dashboard

2 - Navigate to the Model tab, and access the JSON Schema Editor (Objects -> Model -> Model JSON). Paste the following JSON into the provided dialog (or leave it as-is - the starter app is built using the default data model):

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
3 - Change the app's parameters (/js/app.js) in the Config section with your new app's parameters:

      // Your app's name in Backand
      BackandProvider.setAppName('Your-App-Name');
      
      // Find this in Security & Auth -> Social & Keys
      BackandProvider.setSignUpToken('Your-SignUp-Token');
      
      // Find this in Security & Auth -> Configuration
      BackandProvider.setAnonymousToken('Your-Anonymous-Token');
      
And with that, your Ionic app is now wired up to your own Backand app!
