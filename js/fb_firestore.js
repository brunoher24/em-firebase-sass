const db = firebase.firestore();


firebase_.writeData = (collectionRef, docRef, data) => {
    db.collection(collectionRef).doc(docRef).set(data)
    .then(() => {
        console.log("Document was created !");
    })
    .catch(error => {
        console.error("Error creating document: ", error);
    });
}

firebase_.readData = (ref, callback) => {
    db.collection(ref).get().then(querySnapshot => {
        callback(querySnapshot);
    }).catch(err => {
        console.log(err);
    });
};

firebase_.updateData = (collectionRef, docRef, data) => {
    db.collection(collectionRef).doc(docRef).update(data)
    .then(() => {
        console.log("Document was updated !");
    })
    .catch(error => {
        console.error("Error updating document: ", error);
    });
};
