# hieuvh3011/word-puzzle-app

## Introduction
Hi guys, as you already known, this application is made for the technical assessment of Singtel. So I will try to make this document as short as possible. The main purpose of this document is to show you how to build and test the application in both Android and iOS

## **Important Notes**
Because the limited of time, I am not able to make the application with complete functionality. So I have 2 notes here:
1. **There will be no real authentication flow**. In first screen, you will see a list of option "Login as *some character in Harry Potter or the name of my friend*", please press into one button and it will take you to the next screen
2. **The app data will be stored in Firebase Console**. If you want to have the access to Firebase Console to see it, please let me know and I will invite you through email

Alright, thanks for reading the notes, let's go for the application

## Use-case 1: I don't want to build, just install applications
If you don't want to build the app, that's fine. Let's check 2 app that I already deployed here. I cannot push the app into App Store and Google Store because I do not have enough of time. The review app process will take a lot of time. So I will deploy both of them into Diawi

- Android app: https://i.diawi.com/7wKaZT
- iOS app: https://i.diawi.com/8pgo1s (only Safari will allow you to download and install file from Diawi)

## Use-case 2: I don't want to install 2 applications above, it could be viruses
Well, that make sense. In that case, please check 2 video that I record about the app after install and use:
- Link Google Drive: https://drive.google.com/drive/folders/15SdL6f6WTuQsTFuPI42lFxqpmG-0gHEP?usp=sharing

## Use-case 3: I want to build app myself and check the source code
In that case, please follow these steps


Step 1: clone project from git

```bash
$ git clone https://github.com/hieuvh3011/word_puzzle_game.git
```

Step 2: install all dependencies:

```bash
$ yarn install
```

or

```bash
$ npm install
```

Step 3: run on Android or iOS device

```bash
$ npm run android
```

or

```bash
$ npm run ios
```

Step 4: build an APK or AAB file

```bash
$ npm run android:package:release
```

to build APK file, or

```bash
$ npm run android:bundle:release
```

to build AAB file

Step 5: build .ipa file


For this step, please read [this article](https://bianca-dragomir.medium.com/archiving-ios-react-native-app-in-an-nrwl-monorepo-debugging-guide-8f207c69d777)

## Folder structure
This part will describe the folder structure

- `src`: This folder is the main container of all the code inside of the application
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Components folder contains all your application components.
    - `commons`: Folder to store any common component that you use through your app (such as a generic button, text fields, etc).
    - `components`: Each component should be stored inside it's own folder.
      - `some_components.ts`: is a file code for main UI on screen.
      - `component`: is a folder that contain all small components in `some_components` screen. I split it so it make `some_components.js` shorter, easy to read, and we can reuse the components later.
  - `entities`: contain entities of the application
  - `helper`: helper will help you to handle business logic inside of app
  - `i18n`: Folder that contain localization texts
  - `redux`: contain the logic of redux. I used the redux toolkit, so the redux files will not too much
  - `repository`: Folder to handle logic of data, including fetching data from network and store data in local (if data has been stored in AsyncStorage or another kind of storage)
  - `route`: folder that contain all of navigation in your application.
  - `util`: ultility, will contain some common util, such as color, theme, validation, etc.
- `App.tsx`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.
