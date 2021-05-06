# Blog App

### How to initialize?

Run `npm i` to install all dependencies

### Firebase

1. Register web app
2. Copy firebase configuration to `firebase.js` file in src directory
2. Enable Google authentification
3. Create firestore
4. Done

A small memory leak appears after post creation.

###### Post scheme
    - comments
    - date
    - descr
    - photo
    - title

###### Comment scheme
    - date
    - displayName
    - photoURL
    - text
