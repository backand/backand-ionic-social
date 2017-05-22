# backand-ionic-social
Use this starter to create a mobile applicaiton with [ionic](http://www.ionicframework.com) and [backand](http://www.backand.com) built-in.
**NOTE: Compatible with Ionic 3.1.2**

Due to recent changes of Ionic CLI it does no support creating an app from a GitHub repo. Hence, you will need to clone or download these starter and copy from the starter.

# Getting Started
To run the starter app, follow these easy steps:

1 - Download the archive and run ionic start

    ionic start myApp tabs --type ionic1
    cd myApp

2 - Replace these folders from the starter: `js`, `css`, and `templates` 

4 - Replace `index.html` from the starter

4 - Install the Backand SDK and Socket.io

    bower install backand-angular1-sdk
    bower install socket.io-client

5 - Install the [InAppBrowser](https://cordova.apache.org/docs/en/3.0.0/cordova/inappbrowser/inappbrowser.html) cordova plugin
    
    ionic cordova plugin add cordova-plugin-inappbrowser
    
    ionic cordova plugin add https://github.com/apache/cordova-plugin-whitelist.git

6 - Run with ionic serve function

    ionic serve
    
The app should now be available in your browser. To run the app on another platform (Android/iOS), use the following commands:

    ioic cordova platform add <platform>
    ionic run <platform>
    
    
## Main Functionality

The application comes with a full server-side app in Backand, ready to go. Here's a brief overview of the functionality provided in this starter:

* **Backand User Management** - You can register new users in the Signup tab. Authenticate these users in the "Login" tab
* **Social Media Authentication** - You can use leading social media applications (such as Facebook, Google, and GitHub) to register and authenticate your users. Social media accounts don't need to have a separate Signup page - that process is handled by each respective provider
* **Object CRUD functionality** - The starter app includes a data service that implements full CRUD functionality for your app's objects. Simply work with the UI on the main tab to see the SDK in action
* **Real-time communications** - We've connected to Backand's real-time communications architecture in this demo. All changes to item entries in the app result in a socket event that outputs the changes to the console - open the developer console, make a change to an item, and you'll see the real-time events in action!


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

# In App Social Login 

In App social login is intended to use the native social SDK of Faceboook or Google. For Google this is due to recent restrictions in Google that prevent using the Signup with Google through web views. 

In the `login` screen we label this functionality as **In App Social**. See our code.

Install `ionic-native`:

    bower install ionic-native --save

## Google 

Install [Cordova Google Sign-In plugin](https://github.com/EddyVerbruggen/cordova-plugin-googleplus)

## Facebook

Install [Facebook Connect plugin](http://ngcordova.com/docs/plugins/facebook/)

# Ionic Web App for Facebook Sharing

When an Ionic web app is shared in Facebook feed, the usual Backand social signup with Facebook will not work. 

1. Install [angular-facebook](https://github.com/Ciul/angular-facebook) with:
    
    bower install angular-facebook --save

2. Detect this case in your code with:

    function isFacebookApp() {
       var ua = navigator.userAgent || navigator.vendor || window.opera;
       return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
    }

3. Use the code labeled **Social Web** in `login` screen.

