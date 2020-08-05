$emailInput = document.querySelector('#mail-input');
$pwdInput = document.querySelector('#pwd-input');

const $fbConnectBtn = document.querySelector('#fb-connect-btn');
$fbConnectBtn.addEventListener('click', e => {
    e.preventDefault();
    firebase_.fbSignin();
});

const $signinBtn = document.querySelector('#login-btn');
$signinBtn.addEventListener('click', e => {
    e.preventDefault();

    const email     = $emailInput.value.trim();
    const password  = $pwdInput.value.trim();
    firebase_.signinWithEmailAndPassword(email, password);
});


initRefreshedPageNode = () => {
    firebase_.writeData("pageRefreshed", "infos", {
        lastTimeRefreshed: new Date().getTime(),
        refreshedNbr: 0
    });
};

updateRefreshedPageNode = (refreshedNbr) => {
    firebase_.updateData("pageRefreshed", "infos", {
        lastTimeRefreshed: new Date().getTime(),
        refreshedNbr: refreshedNbr + 1
    });
};

implementRefreshedPageNode = () => {
    firebase_.readData("pageRefreshed", querySnapshot => {
        if(querySnapshot.size < 1) {
            initRefreshedPageNode();
        } else {
            querySnapshot.forEach(doc => {
                updateRefreshedPageNode(doc.data().refreshedNbr);
            });
        }
    });
}; 

implementRefreshedPageNode();
