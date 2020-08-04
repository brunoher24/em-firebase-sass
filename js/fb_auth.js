const provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().useDeviceLanguage();

firebase_.fbSignin = () => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log('=====> FB SIGNIN SUCCESS', token, user);
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log('=====> FB SIGNIN FAILURE', error);
         // "This domain (127.0.0.1) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab."
    });
};

firebase_.signupWithEmailAndPassword = (mail, password) => {
    firebase.auth().createUserWithEmailAndPassword(mail, password)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
    }).then(function(success) {
        console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD SUCCESS ==>', success);
    });
};




