(() => {
    'use strict';
    
    const $msgSection       = document.querySelector('#messages-section');
    const $msgList          = document.querySelector('#messages-list');
    const $textarea         = document.querySelector('#new-message-section > textarea');
    const $sendMsgBtn       = document.querySelector('#new-message-section > button');

    $sendMsgBtn.addEventListener('click', () => {
        sendMessage();
    });

    const displayMessage = msgs => {
        $msgList.innerHTML = ''; 

        if(msgs.size < 1) {
            $msgSection.style.display = 'flex';
            $msgSection.style.justifyContent = 'center';
            $msgSection.style.alignItems = 'center';
            $msgSection.innerHTML = '<h2>AUCUN MESSAGE A AFFICHER</h2>'
            return;
        } 
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

    const loadMessages = async () => {
        const msgs = await firebase_.readCollection(displayMessage, 'chatroom', 'orderBy', 'posted', 'asc');
    };
    
    loadMessages();


    const sendMessage = () => {
        const content = $textarea.value.trim();
        if(content.length < 1) return;

        const storage = new Storage('local');
        const user    = storage.getItem('user');

        const date_     = new Date(); 
        const timeStamp = date_.getTime();
        const id        = user.name + '_' + timeStamp;

        firebase_.writeData('chatroom', id, {
            content,
            posted: firebase.firestore.Timestamp.fromDate(date_),
            userImage: user.imageUrl,
            username: user.name
        });
    };
})();

