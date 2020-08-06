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
      'auth/wrong-password'       : 'Mot de passe non valide !',
      'auth/unauthorized-domain'  : `Votre domaine (${window.location.hostname}) n'est pas autorisé à effectuer cette opération. Vous pouvez l'ajouter à la liste 'OAuth redirect domains' dans votre console Firebase -> section 'Authentification' -> Onglet 'Méthode d'inscription'`,
      'auth/too-many-requests'    : 'Trop de requêtes échouées ... Veuillez réessayer dans quelques instants',
      'auth/operation-not-supported-in-this-environment' : 'Opération non supportée par votre environnement de dévelopement. "location.protocol" doit être en "http", "https" ou "chrome-extension" et l\'API "web storage" doit être activée'
    };
}

const firebase_ = new Firebase_();

