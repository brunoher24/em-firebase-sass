const provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().useDeviceLanguage();

firebase_.fbSignin = () => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('=====> FB SIGNIN SUCCESS', token, user);
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log('=====> FB SIGNIN FAILURE', error);
         // "This domain (127.0.0.1) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab."
    });
};

firebase_.signinWithEmailAndPassword = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('SIGNIN_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
      }).then(success => {
          if (success) {
            console.log('SIGNIN_WITH_EMAIL_AND_PASSWORD SUCCESS ==>', success);
          }
      });
}
firebase_.signupWithEmailAndPassword = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
    }).then(function(success) {
        if (success) {
            console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD SUCCESS ==>', success);
            firebase_.createUser(email, success.user.uid);
        }
    });
};

firebase_.createUser = (email, uid) => {
    firebase_.writeData('users', uid, {
        id: uid,
        email: email
    });

};




