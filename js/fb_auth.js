const provider = new firebase.auth.FacebookAuthProvider(); // objet d'authentification facebook fourni par la librairie firebase.auth
const auth = firebase.auth(); // objet d'authentification firebase fourni par la même librairie; cet objet contient toutes les méthodes de ce service (connexion, inscription, désactivation de compte ...) 
auth.useDeviceLanguage(); 

/**
 * Méthode fbSignin()
 *
 * Création d'un compte utilisateur au sein du service d'authentification Firebase 
 * via un compte facebook. Utilisation de la méthode 'signInWithPopup' 
 * appartenant à l'objet firebase.auth()
 *
*/

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
        let popup = new Popup(firebase_.errors[errorCode]);
        popup = null;
    });
    
};

/**
 * Méthode signinWithEmailAndPassword()
 *
 * Connexion au service d'authentification Firebase 
 * à l'aide d'une adresse mail et d'un mot de passe . Utilisation de la méthode 'signInWithEmailAndPassword' appartenant à l'objet firebase.auth()
 * 
 * @param {string} email adresse mail (doit correspondre à une adresse mail existante associée au bon mot de passe)
 * @param {string} password mot de passe (doit correspondre au bon mot de passe associé à l'adresse mail)
 * 
 *
 */
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
            let popup = new Popup(firebase_.errors[errorCode]);
            popup = null;
            reject(error);
        });   
    });
};

/**
 * Méthode signupWithEmailAndPassword()
 *
 * Création d'un compte utilisateur au sein du service d'authentification Firebase 
 * à l'aide d'une adresse mail et d'un mot de passe . Utilisation de la méthode 'createUserWithEmailAndPassword' appartenant à l'objet firebase.auth()
 * 
 * @param {string} email adresse mail (ne doit pas déjà exister dans le service d'authentification, doit respecter le format _@_.__, sinon une erreur est retournée)
 * @param {string} password mot de passe (au moins 6 caractères).
 * 
 * @resolve {string} en cas de succes, l'id de l'utilisateur est retorunée dans le bloc de complétion .then(). 
 * @reject {void} en cas d'echec de la connexion, aucune valeur n'est retournée dans le bloc d'erreur .catch(). 

 */
firebase_.signupWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
            let popup = new Popup(firebase_.errors[errorCode]);
            popup = null;
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








