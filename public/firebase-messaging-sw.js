importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');



const firebaseConfig = {
    apiKey: "AIzaSyBJqG4ROG2FsQlXAWvbtgOibo5PxAqGDUQ",
    authDomain: "my-project-7307f.firebaseapp.com",
    databaseURL: "https://my-project-7307f.firebaseio.com",
    projectId: "my-project-7307f",
    storageBucket: "my-project-7307f.appspot.com",
    messagingSenderId: "712367246617",
    appId: "1:712367246617:web:02e1571f7b95835f608988"
  };
  
  // Initialize Firebase
  var fire = firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging()

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js').then(res => {
      console.log("Register Success");
      messaging.useServiceWorker(res);
    }).catch(e => {
      console.log(e);
    });
  }