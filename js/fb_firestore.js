const db = firebase.firestore();

firebase_.initRefreshedPageNode = () => {
    db.collection("pageRefreshed").doc('infos').set({
        lastTimeRefreshed: new Date().getTime(),
        refreshedNbr: 0
    })
    .then(() => {
        console.log("Document was created !");
    })
    .catch(error => {
        console.error("Error creating document: ", error);
    });
}

firebase_.updateRefreshedPageNode = (refreshedNbr) => {
    db.collection("pageRefreshed").doc('infos').update({
        lastTimeRefreshed: new Date().getTime(),
        refreshedNbr: refreshedNbr + 1
    })
    .then(() => {
        console.log("Document was updated !");
    })
    .catch(error => {
        console.error("Error updating document: ", error);
    });
}
firebase_.implementRefreshedPageNode = () => {
    db.collection("pageRefreshed").get().then(querySnapshot => {
        console.log(querySnapshot.size);
        if(querySnapshot.size < 1) {
            firebase_.initRefreshedPageNode();
        } else {
            querySnapshot.forEach(doc => {
                firebase_.updateRefreshedPageNode(doc.data().refreshedNbr);
            });
        }
    }).catch(err => {
        console.log(err);
    });
};