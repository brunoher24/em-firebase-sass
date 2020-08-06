$emailInput = document.querySelector('#mail-input');
$pwdInput = document.querySelector('#pwd-input');

const $fbConnectBtn = document.querySelector('#fb-connect-btn');
$fbConnectBtn.addEventListener('click', e => {
    e.preventDefault();
    firebase_.fbSignin();
});

const $signinBtn = document.querySelector('#login-btn');
$signinBtn.addEventListener('click', async e => {
    e.preventDefault();

    const email     = $emailInput.value.trim();
    const password  = $pwdInput.value.trim();
    const uid       = await firebase_.signinWithEmailAndPassword(email, password);
    if(!uid) return;
    console.log(uid);
    const user      = await getUser(uid);
    console.log(user.data()); 
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
    const querySnapshot = await firebase_.readData("pageRefreshed", "infos");
 
    if(!querySnapshot.data()) {
        initRefreshedPageNode();
    } else {
        updateRefreshedPageNode(querySnapshot.data().refreshedNbr);
    }
    
}; 

const getUser = (uid) => {
    return new Promise(resolve => {
        user = firebase_.readData('users', uid);
        resolve(user);
    });
}

implementRefreshedPageNode();
