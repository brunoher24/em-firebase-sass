(() => {
    'use strict';
    const $emailInput = document.querySelector('#mail-input');
    const $pwdInput   = document.querySelector('#pwd-input');
    const $nameInput  = document.querySelector('#name-input');
    const $fileInput  = document.querySelector('#file-input');
    const $imgCtnr    = document.querySelector('#img-ctnr');
    const $form       = document.querySelector('form');


    $fileInput.addEventListener('change', e => {
        // affichage de l'image ajoutée dans l'input de type file, dans la balise img ayant pour id 'img-ctnr'
        // getImage est une fonction utilitaire contenue dans service_utilities.js
        getImage(e.target.files[0]).then(imageData => {
            $imgCtnr.style.display         = 'block';
            $imgCtnr.style.backgroundImage = `url(${imageData})`; 
       }).catch(() => {
            $imgCtnr.style.display = 'none';
       });
    });

    $form.addEventListener('submit', async e => {
        e.preventDefault();
    
        let popup;
        // on récupère les valeurs des champs du formulaire en retirant les espaces éventuels 
        // avant et après les chaînes de caractères
        const email     = $emailInput.value.trim();
        const password  = $pwdInput.value.trim();
        const name      = $nameInput.value.trim();
    
        if(name.length <= 2) {
            popup = new Popup('Votre pseudo doit faire au moins 3 caractères !');
            popup = null;
            return;  
        }
        

        /*
        4 étapes successives :
            1) on inscript l'utilisateur au service 'authentification' de firebase, 
            si l'opération échoue, la suite du code n'est pas éxécutée (return;)
            2) On crée un nouvel utilsiateur en base de donnée (service 'cloud firestore') 
            avec sa nouvelle uid récupérée après son inscription, si l'opération échoue, 
            la suite du code n'est pas éxécutée (return;)
            *                                                                   *
            ** Si l'utilsiateur n'a pas ajouté d'image, la fonction se termine **
            *                                                                   *
            3) On ajoute dans le service 'storage' de firebase, l'image de l'utilisateur,
            si l'opération échoue, la suite du code n'est pas éxécutée (return;)
            4) On ajoute en base de données (cloud firestore) la propriété 'imageUrl' de l'utilisateur
            si l'opération échoue, la suite du code n'est pas éxécutée (return;), on reste
            donc sur cette page sans être redirigé vers la page index.html
        */


        let uid;
        try {
            uid = await firebase_.signupWithEmailAndPassword(email, password);
        } catch(err) {
            popup = new Popup('Erreur lors de la création de votre compte !');
            popup = null;
            return; 
        }
       
        popup = new Popup('Votre inscription a bien été effectuée !');
        popup = null;
    
        let userCreated;
        try {
            userCreated = await createUser(email, uid, name);
        } catch(err) {
            popup = new Popup('Erreur lors de l\'ajout de vos infos en base de données !');
            popup = null;
            return;  
        }
    
        const file      = $fileInput.files[0];
        if (!file) {
            window.location.href = '../public/index.html';
            return;
        }
        
        let imageUrl;
        try {
            imageUrl = await firebase_.uploadFile(file, `images/users/${uid}/${file.name}`);
        } catch(err) {
            popup = new Popup('Erreur lors de l\'ajout de votre image de profil !');
            popup = null;
            return;  
        }

        let imageAdded;
        try {
            imageAdded = await firebase_.updateData(`users/`, uid, {imageUrl});
        } catch(err) {
            popup = new Popup('Erreur d\'ajout de l\'image !');
            popup = null;
            return;
        }

        window.location.href = '../public/index.html';
    });

    async function getImage(file) {
        const imageData = await getImageData(file);
        return imageData;
    };

    const createUser = (email, uid, name) => {
        return new Promise(async (resolve, reject) => {
            const result = await firebase_.writeData('users', uid, {
                id: uid,
                email: email,
                name: name
            });
            result === 'success' ? resolve('success') : reject('error');
        });
    };
})();
