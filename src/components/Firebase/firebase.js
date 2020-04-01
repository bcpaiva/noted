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
   * Retrieve class data from firebase.
   * @param {function} callback Callback function that takes the retrieved data (classData) as a parameter
   */
  fetchClassData = callback => {
    let object = null;
    this.db.ref("classes").on("value", snapshot => {
      object = snapshot.val();
      callback(snapshot.val());
    });
    return object;
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

  /**
   * Add user to class and vice versa
   * @param {string} userId uid of user to add to class
   * @param {string} classId unique class id of class to add (**NOT class_id**) ex: "UzIQ76RKyw4fSoann1Wg"
   */
  addUserToClass = (userId, classId) => {
    ////////////////////////////////////////////
    // Add class to user in database ///////////
    ////////////////////////////////////////////
    let currentClasses = [];
    this.db.ref("users/" + userId).on("value", snapshot => {
      // If user's classes is not empty, set it to currentClasses
      if (snapshot.val().classes) {
        currentClasses = snapshot.val().classes;
      }
    });
    currentClasses.push(classId);

    // Add class to user classes
    this.db.ref("users/" + userId + "/classes").set(currentClasses);
    //-------------------------------------------

    /////////////////////////////////////////////
    // Add user (student) to class in database///
    /////////////////////////////////////////////
    let currentStudents = [];
    this.db.ref("classes/" + classId).on("value", snapshot => {
      // If class's students is not empty, set it to currentStudents
      if (snapshot.val().students) {
        currentStudents = snapshot.val().students;
      }
    });
    currentStudents.push(userId);

    this.db.ref("classes/" + classId + "/students").set(currentStudents);
    //-------------------------------------------
  };


  addNoteToClass = (noteId, classId) => {
    let currentNotes = [];
    this.db.ref("classes/" + classId).on("value", snapshot => {
      // If class's students is not empty, set it to currentStudents
      if (snapshot.val().notes) {
        currentNotes = snapshot.val().notes;
      }
    });
    currentNotes.push(noteId);

    this.db.ref("classes/" + classId + "/data" + "/notes").set(currentNotes);
    //-------------------------------------------
  };
 
};

    /////////////////////////////////////////////
    // Add image id to class information in database ///
    /////////////////////////////////////////////


export default Firebase;
