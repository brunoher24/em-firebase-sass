const db = firebase.firestore();


firebase_.writeData = (collectionRef, docRef, data) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionRef).doc(docRef).set(data)
        .then(() => {
            console.log("Document was created !");
            resolve("success");
        })
        .catch(error => {
            console.error("Error creating document: ", error);
            reject('error');
        });
    });
}

firebase_.readData = ref => {
    return new Promise((resolve, reject) => {
        db.collection(ref).get().then(querySnapshot => {
            resolve(querySnapshot);
        }).catch(err => {
            reject(err);
        });
    });
};

firebase_.updateData = (collectionRef, docRef, data) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionRef).doc(docRef).update(data)
        .then(() => {
            console.log("Document was updated !");
            resolve("success");
        })
        .catch(error => {
            console.error("Error updating document: ", error);
            reject('error');
        });
    });
};
