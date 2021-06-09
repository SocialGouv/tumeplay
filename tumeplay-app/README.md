# TuMePlay - App

TuMePlay - App is a sexual education application aimed at youth. The wole app is a ReactNative application designed to be a "write once, run everywhere" system : write code in ReactNative, generate PWA / iOS App / Android App.

## Install & Build

In order to install dependencies, just run 

```
npm install
```

To build PWA / static ( output in /build ) : 

```
npm run build
```

To start Android / iOS emulator : 

```
react-native run-android
or 
react-native run-ios
```

To start Web dev mode ( open automatically a browser and enable live lint / live reload ) : 

```
npm run webStart
or 
react-app-rewired start
```

## PostInstall 

Because we are using a special system to link everything, some Node modules may not be compatible / too old for web ( see react-native-device-info ).

We use a postinstall "sed" to inline replace old export to new export format ( may won't work on Mac system ).

## Linter side-effect

Linter may overreact to some code, and automatically add watched variables on useEffect, which may cause infinite loop on theses two files : 
- ContentScreen; remove "eventListener" on useEffect hook
- HeaderRight; remove "eventListener" on useEffect hook