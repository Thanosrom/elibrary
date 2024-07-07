# e-library (University final Project)

The App is an e-library mobile software whe re the user can buy or rent
books for multiple environments platforms like Android iOS with
React Native.

You gonna need to install the following dependencies : 

**Frontend**

1)

env file with your current URL .Also you need to config your babel.config.js file.

```
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env"
      },
    ],
  ],
  };
};
```

2) 

You need to install the following the packages below : 

    "@react-navigation/native": "^6.1.1",
    "@react-navigation/native-stack": "^6.9.7",
    "@stripe/stripe-react-native": "^0.22.1",
    "axios": "^1.2.1",
    "expo": "~47.0.9",
    "expo-image-picker": "^14.0.2",
    "expo-status-bar": "~1.4.2",
    "react": "18.1.0",
    "react-native": "0.70.5",
    "react-native-safe-area-context": "4.4.1",
    "react-native-screens": "~3.18.0",
    "react-native-webview": "^11.26.0"
    "react-native-dotenv": "^3.4.6"



**Backend**
 
1) 
```
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongodb": "^4.11.0",
    "mongoose": "^6.7.0",
    "mysql": "^2.18.1",
    "nodemailer": "^6.8.0",
    "request-ip": "^3.3.0",
    "stripe": "^11.1.0"
```
