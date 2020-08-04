const $fbConnectBtn = document.querySelector('#fb-connect-btn');
$fbConnectBtn.addEventListener('click', e => {
    e.preventDefault();
    firebase_.fbSignin();
});
firebase_.implementRefreshedPageNode();
