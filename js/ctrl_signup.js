const $emailInput = document.querySelector('#mail-input');
const $pwdInput   = document.querySelector('#pwd-input');
const $nameInput  = document.querySelector('#name-input');
const $fileInput  = document.querySelector('#file-input');
const $imgCtnr    = document.querySelector('#img-ctnr');
const $form       = document.querySelector('form');

$fileInput.addEventListener('change', e => {
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
    const email     = $emailInput.value.trim();
    const password  = $pwdInput.value.trim();
    const name      = $nameInput.value.trim();
    
    const uid       = await firebase_.signupWithEmailAndPassword(email, password);
    if (!uid) {
        popup = new Popup('Erreur lors de la création de votre compte !');
        delete popup;
        return;  
    }
    popup = new Popup('Votre inscription a bien été effectuée !');
    delete popup;

    const userCreated = await createUser(email, uid, name);
    if(!userCreated) {
        popup = new Popup('Erreur lors de l\'ajout de vos infos en base de données !');
        delete popup;
        return;  
    }

    const file      = $fileInput.files[0];
    if (!file) return;
    
    const imageUrl = await firebase_.uploadFile(file, `images/users/${uid}/${file.name}`);
    if(!imageUrl) {
        popup = new Popup('Erreur lors de l\'ajout de votre image de profil !');
        delete popup;
        return;
    }
    const imageAdded = await firebase_.updateData(`users/`, uid, {imageUrl});
    if (!imageAdded) {
        popup = new Popup('Erreur d\'ajout de l\'image !');
        delete popup;
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



