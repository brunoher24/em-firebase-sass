(() => {
    'use strict';
    const $emailInput = document.querySelector('#mail-input');
    const $pwdInput = document.querySelector('#pwd-input');

    const $fbConnectBtn = document.querySelector('#fb-connect-btn');
    $fbConnectBtn.addEventListener('click', e => {
        e.preventDefault();
        firebase_.fbSignin();
    });

    const $signinBtn = document.querySelector('#login-btn');
    $signinBtn.addEventListener('click', async e => {
        e.preventDefault();

        const email = $emailInput.value.trim();
        const password = $pwdInput.value.trim();
        
        const uid = await firebase_.signinWithEmailAndPassword(email, password);
        if (!uid) return;
        
        const user = await getUser(uid);
        
        const storage = new Storage('local');
        storage.set('user', user);
        // on store dans lelocalStorage l'utilisateur récupéré dans le cloud firestore
        // dont le mail et le mot de passe correspondent à ceux renseignés
        window.location.href = '../pages/chatroom.html';
    });


    /**
     * fonction initRefreshedPageNode()
     *
     * appelle la méthode firebase_.writeData pour créer en base de données
     * une collection 'pageRefreshed' contenant un seul élément 'infos',
     * lui même ayant 2 propriétés : 
     * 'lastTimerefreshd' : date à laquelle la page a été raffraichie pour la dernière foi (maintenant),
     * 'refreshedNbr' : nombre de fois ou la page a été raffraichie depuis ajout de ce script
     * 
     */
    const initRefreshedPageNode = () => {
        firebase_.writeData("pageRefreshed", "infos", {
            lastTimeRefreshed: new Date().getTime(),
            refreshedNbr: 0
        });
    };

    /**
     * fonction updateRefreshedPageNode()
     *
     * appelle la méthode firebase_.updateData
     * @param {number} refreshedNbr nombre précédent à incrémenter (lui-même + 1)
     * 
     * 
     */
    const updateRefreshedPageNode = (refreshedNbr) => {
        firebase_.updateData("pageRefreshed", "infos", {
            lastTimeRefreshed: new Date().getTime(),
            refreshedNbr: refreshedNbr + 1
        });
    };

    /**
     * fonction implementRefreshedPageNode()
     *
     * appelle la fonction initRefreshedPageNode() si ce script est éxécuté pour la première fois,
     * appelle la fonction updateRefreshPageNode() si un élément est bien récupéré dans le noeud "pageRefreshed",
     * 
     * 
     */
    const implementRefreshedPageNode = async () => {
        const infos = await firebase_.readData("pageRefreshed", "infos");

        if (!infos) {
            initRefreshedPageNode();
        } else {
            updateRefreshedPageNode(infos.refreshedNbr);
        }
    };

    const getUser = (uid) => {
        return new Promise(resolve => {
            const user = firebase_.readData('users', uid);
            resolve(user);
        });
    }

    // au chargement de la page index.html, la fonction implementRefreshedPageNode est exécutée
    implementRefreshedPageNode();

})();