import app from "firebase";
import "firebase/auth";

/**
 * **** If you need to interact with firebase, add functions to do so below at the bottom of the class *****
 */

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

class Firebase {
  constructor() {
    // Initialize firebase
    app.initializeApp(config);

    // Firebase auth object
    this.auth = app.auth();

    // Firebase realtime database object
    this.db = app.database();
  }

  // *** Built-in Firebase Auth API Functions ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // ****************

  /**
   * Return current user if there is one
   */
  getCurrentUser = () => {
    this.auth.onAuthStateChanged(function(user) {
      if (user) {
        return user;
      }
      return false;
    });
  };

  /**
   * Retrieve class data from firebase.
   * @param {function} callback Callback function that takes the retrieved data (classData) as a parameter
   */
  fetchClassData = callback => {
    this.db.ref("classes").on("value", snapshot => {
      callback(snapshot.val());
    });
  };

  /**
   * Add user data to firebase realtime database at given ID
   * @param {string} id Unique user ID where data is to be stored
   * @param {object} data User data
   */
  addUserData = (id, data) => {
    this.db.ref("users/" + id).set(data);
  };

  /**
   * Retrieve user data from firebase
   * @param {function} callback Callback function to be invoked after data is fetched
   */
  fetchUserData = callback => {
    this.db.ref("users").on("value", snapshot => {
      callback(snapshot.val());
    });
  };
}
export default Firebase;
