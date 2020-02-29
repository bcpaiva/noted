import firebase from "firebase";

// Config settings for firebase
const config = {
  apiKey: "AIzaSyA3UGnZkHIiUm4Hasvqq4aRbEKpB83BVIA",
  authDomain: "noted-24e52.firebaseapp.com",
  databaseURL: "https://noted-24e52.firebaseio.com",
  projectId: "noted-24e52",
  storageBucket: "noted-24e52.appspot.com",
  messagingSenderId: "85650534633",
  appId: "1:85650534633:web:e545957dd77ea2949c4078",
  measurementId: "G-TFF9KXG0LL"
};

// If app isn't already initialized, initialize
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

/**
 * Retrieve class data from firebase.
 * @param {function} callback Callback function that takes the retrieved data (classData) as a parameter
 */
let getClasses = callback => {
  let classData = {};
  db.collection("classes")
    .get()
    .then(classes => {
      classes.forEach(cls => {
        classData[cls.id] = cls.data();
      });
    })
    .then(() => {
      callback(classData);
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
};

export { getClasses };
