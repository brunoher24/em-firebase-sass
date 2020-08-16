const storage       = firebase.storage();
const storageref    = storage.ref();

/**
 * Méthode uploadFile()
 *
 * Ajout de fichier dans le service Storage
 * 
 * @param {Blob, File} file élément de type Blob ou File qui sera ajouté dans le Storage
 * @param {string} ref chemin qui - au cas où il(s) n'existerait(ent) pas déjà - créa les dossiers et sous-dossiers dans lequel sera créé le fichier
 * exemple : 'images/utilisateurs/utilisateur1.jpg' créera dans le storage un fichier nommé utilisateur1.jpg situé dans images/utilisateurs/
 * @resolve {string} en cas de succès, on pourra récupérer l'url du fichier ajouté au Storage dans le .then(). 
 * @reject {void} en cas d'échec , on le bloc .catch() ne retournera rien. 
 */
firebase_.uploadFile = (file, ref) => {
    return new Promise((resolve, reject) => {
        const childRef = storageref.child(ref);
        childRef.put(file)
        .then(async snapshot => {
            console.log('Uploaded a blob or file!', snapshot);
            let fileUrl =  await childRef.getDownloadURL();
           
            if (!fileUrl) {
                console.log('GET UPLOADED FILE URL FAILURE');
                reject();
            }
            resolve(fileUrl);
        }).catch(err => {
            console.log('UPLOAD FILE FAILURE ==> ', err);
            reject(err);
        });
    });
};

/**
 * Méthode uploadBase64URL()
 *
 * fait exactement pareil que la méthode uploadFile() mais le fichier 
 * à ajouter dans le storage est encodé en base64 plutôt que Blob ou File
 */
firebase_.uploadBase64URL = (base64, ref) => {
    return new Promise(async (resolve, reject) => {
        const childRef = storageref.child(ref);
        childRef.putString(base64, 'data_url')
        .then(async snapshot => {
            console.log('Uploaded a data_url string!');
            const fileUrl = await childRef.getDownloadURL();
            if (!fileUrl) {
                console.log('GET UPLOADED BASE64 URL FAILURE');
                reject();
            }
            resolve(fileUrl);
        }).catch(err => {
            console.log('UPLOAD FILE FAILURE ==> ', err);
            reject(err);
        });
    });
};  
