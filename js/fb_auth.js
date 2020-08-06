const SESSION_STORAGE_APP_NAME = 'brunoher2404_firebaseapp_em';

const provider = new firebase.auth.FacebookAuthProvider();
const auth = firebase.auth();
auth.useDeviceLanguage();


firebase_.fbSignin = () => {
   
    auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('=====> FB SIGNIN SUCCESS', token, user);
    }).catch(function (error) {
        const errorCode = error.code;
        console.log('=====> FB SIGNIN FAILURE', error);
        const popup = new Popup(firebase_.errors[errorCode]);
        delete popup;
    });
    
};

firebase_.signinWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {  
        auth.signInWithEmailAndPassword(email, password)
        .then(success => {
            if (success) {
                console.log('SIGNIN_WITH_EMAIL_AND_PASSWORD SUCCESS ==>', success);
                resolve(success.user.uid);
            } else {
                reject('error');
            }
        })
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('SIGNIN_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
            const popup = new Popup(firebase_.errors[errorCode]);
            delete popup;
            reject(error);
        });   
    });
};

firebase_.signupWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
            const popup = new Popup(firebase_.errors[errorCode]);
            delete popup;
            reject();
        }).then(function(success) {
            if (success) {
                console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD SUCCESS ==>', success);
                const userId = success.user.uid;
                resolve(userId);
            }
        });
    });
};
