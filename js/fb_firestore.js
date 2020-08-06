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

firebase_.readData = (ref, docRef) => {
    return new Promise((resolve, reject) => {
        let dbRef = db.collection(ref).doc(docRef);
        dbRef.get().then(querySnapshot => {
            resolve(querySnapshot);
        }).catch(err => {
            reject(err);
        });
    });
}

firebase_.readCollection = (ref, orderBy, orberByField, orderDir, limitNbr, elementToStartAfter) => {
    return new Promise((resolve, reject) => {
        let dbRef = db.collection(ref);
        
        if(orderBy) {
            dbRef = dbRef.orderBy(orberByField, orderDir);
        }

        if(elementToStartAfter) {
            dbRef = dbRef.startAfter(elementToStartAfter);
        }

        if(limitNbr) {
            dbRef = dbRef.limit(limitNbr);
        }

        dbRef.get().then(querySnapshot => {
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
