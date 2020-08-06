(() => {
    'use strict';

    /*
    const user = JSON.parse(sessionStorage['SESSION_STORAGE_APP_NAME']).user;
    if(!user) return;
    */
    
    const $msgSection = document.querySelector('#messages-section');
    const $msgList = document.querySelector('#messages-list');
    
    const loadMessages = async () => {
       
        const msgs = await firebase_.readCollection('chatroom', 'orderBy', 'posted', 'desc');
    
        if(msgs.size < 1) {
            $msgSection.style.display = 'flex';
            $msgSection.style.justifyContent = 'center';
            $msgSection.style.alignItems = 'center';
            $msgSection.innerHTML = '<h2>AUCUN MESSAGE A AFFICHER</h2>'
        } else {
            let i = 0;
            msgs.forEach((msg, index) => {
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
        }
    };
    
    loadMessages();
})();

