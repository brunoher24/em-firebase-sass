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
            resolve(querySnapshot.data());
        }).catch(err => {
            reject(err);
        });
    });
}

firebase_.readDataOn = (ref, docRef) => {
    return new Promise((resolve, reject) => {
        let dbRef = db.collection(ref).doc(docRef);
        dbRef.onSnapshot(querySnapshot => {
            resolve(querySnapshot.data());
        });
    });
}

firebase_.readCollectionOnce = (ref, orderBy, orberByField, orderDir, limitNbr, elementToStartAfter) => {
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

        dbRef.get().then(collection => {
            resolve(collection);
        }).catch(err => {
            reject(err);
        }); 
    });
};

firebase_.readCollection = (listeningCallback, ref, orderBy, orberByField, orderDir, limitNbr, elementToStartAfter) => {
  
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

    dbRef.onSnapshot(snapshot => {
        console.log('Changement dans la collection !');
        listeningCallback(snapshot);
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
