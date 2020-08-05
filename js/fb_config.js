function Firebase_() {
  const firebaseConfig = {
      apiKey: "AIzaSyBaD-12ujtbFwEsG8yPLEOUwUoWToPbxHQ",
      authDomain: "em-login-80748.firebaseapp.com",
      databaseURL: "https://em-login-80748.firebaseio.com",
      projectId: "em-login-80748",
      storageBucket: "em-login-80748.appspot.com",
      messagingSenderId: "883165911021",
      appId: "1:883165911021:web:fbe3bfd0d0a7fb640239e4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    this.errors = {
      'auth/invalid-email'        : 'Adresse mail non valide.',
      'auth/weak-password'        : 'Mot de passe trop faible (au moins 6 caractères)',
      'auth/email-already-in-use' : 'Cette adresse mail est déjà prise !',
      'auth/user-not-found'       : 'Utilisateur non-trouvé !',
      'auth/wrong-password'       : 'Mot de passe non valide !'
    };
}

const firebase_ = new Firebase_();

