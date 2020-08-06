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


const initRefreshedPageNode = () => {
    firebase_.writeData("pageRefreshed", "infos", {
        lastTimeRefreshed: new Date().getTime(),
        refreshedNbr: 0
    });
};

const updateRefreshedPageNode = (refreshedNbr) => {
    firebase_.updateData("pageRefreshed", "infos", {
        lastTimeRefreshed: new Date().getTime(),
        refreshedNbr: refreshedNbr + 1
    });
};

const implementRefreshedPageNode = async () => {
    const querySnapshot = await firebase_.readData("pageRefreshed");
    
    if(querySnapshot.size < 1) {
        initRefreshedPageNode();
    } else {
        querySnapshot.forEach(doc => {
            updateRefreshedPageNode(doc.data().refreshedNbr);
        });
    }
   
}; 

implementRefreshedPageNode();
