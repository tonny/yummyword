# yummyword
Mobile app to help people to improve their English vocabulary through small games that is generated from words saved by user.

## Description
This project was implemented with the following technologies:

1. [ionic](http://ionicframework.com/)
2. [firebase](https://www.firebase.com/)
3. [threejs](http://threejs.org/)

## Author
  - Antonio Mamani - antonio.mq@gmail.com

### Dependency
Before to run the project, ensure that you have installed the following programs in your local machine.

1. [android sdk](https://developer.android.com/sdk/index.html)
2. [nodejs](https://nodejs.org/)
3. cordova
   - sudo npm install -g cordova
4. ionic
   - sudo npm install -g ionic

### Run project
You needs to do the following instructions to run the mobile app  in your android phone or iPhone.

#### Run android project
Execute the following commands in your terminal o console.

1. ionic platform add android
2. ionic state reset
3. ionic build android
4. ionic run android

#### Run iPhone project
Execute the following commands in your terminal o console.

1. ionic platform add ios
2. ionic state reset

After executed these commands, you needs to open the following file
platfoms/ios/yummyword.xcodeproj in your xcode, then run the project through xcode.

#### Run in browser
With the following command you can execute the project without installing in android or iphone device.

1. ionic serve --lab

