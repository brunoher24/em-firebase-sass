const storage       = firebase.storage();
const storageref    = storage.ref();


firebase_.uploadFile = (file, ref) => {
    return new Promise((resolve, reject) => {
        console.log(file);
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
