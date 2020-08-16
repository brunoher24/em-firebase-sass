(() => {
    'use strict';
    
    const $msgSection       = document.querySelector('#messages-section');
    const $msgList          = document.querySelector('#messages-list');
    const $textarea         = document.querySelector('#new-message-section > textarea');
    const $sendMsgBtn       = document.querySelector('#new-message-section > button');

    $sendMsgBtn.addEventListener('click', () => {
        sendMessage();
    });

    /**
     * fonction displayMessage()
     * 
     * Affiche les messages dans la page
     *
     * @param {firebaseArray} msgs collection de messages récupérées depuis la base de données
     * 
     * 
     */
    const displayMessage = msgs => {
        $msgList.innerHTML = ''; 

        // si collection vide, on affiche le titre 'Aucun message à afficher' dans la page
        if(msgs.size < 1) {
            $msgSection.style.display = 'flex';
            $msgSection.style.justifyContent = 'center';
            $msgSection.style.alignItems = 'center';
            $msgSection.innerHTML = '<h2>AUCUN MESSAGE A AFFICHER</h2>'
            return;
        } 

        // on affiche les messages un par un les uns en dessous des autres, en alternant gauche/droite
        let i = 0;
        msgs.forEach(msg => {
            const position = i%2 === 0 ? 'left' : 'right'; 
            i ++;
            const data   = msg.data();
            const posted = formatDate(data.posted.seconds * 1000);

            $msgList.innerHTML += 
            `<li class='${position}'>
                <div class='msg-header'>
                    <div class="user-img" style='background-image: url("${data.userImage}");'></div>
                    <h4>${data.username}</h4>
                    <span>Posté le : ${posted}</span>
                </div>
                <p>${data.content}</p>
            </li>`
        });
    };

    /**
     * fonction sendMessage()
     * 
     * Poste un nouveau message en l'ajoutant à la collection 'chatroom' dans le cloud firestore
     *  
     */
    const sendMessage = () => {
        const content = $textarea.value.trim();
        if(content.length < 1) return;

        const storage = new Storage('local');
        const user    = storage.getItem('user');

        const date_     = new Date(); 
        const timeStamp = date_.getTime();
        //le nouveau message aura pour id : <pseudo de l'utilsiateur>_<timeStamp de l'envoi>
        const id        = user.name + '_' + timeStamp;

        firebase_.writeData('chatroom', id, {
            content,
            posted: firebase.firestore.Timestamp.fromDate(date_),
            userImage: user.imageUrl,
            username: user.name
        });
    };


    // on éxécute la méthode readCollection() en lui passant en callback la fonction displayMessage qui prendra elle-même
    // en paramêtre la collection firebase des messages postés. 
    (async () => {await firebase_.readCollection(displayMessage, 'chatroom', 'orderBy', 'posted', 'asc')})();
})();

