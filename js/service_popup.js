/**
 * Constructeur Popup
 *
 * Ce service sera instancié chaque fois que l'on souhaitera afficher un popup dans la page
 * 
 * @param {string} text texte à afficher dans le popup
 * @param {function} okCallback (optionnel) fonction à déclencher quand l'utilisateur appuie sur le bouton 'ok'
 * @param {any[]} okParams(optionnel) si besoin, paramêtres que prendra la fonction okCallback, tous rangés dans un array
 * @param {function} cancelCallback (optionnel) fonction à déclencher quand l'utilisateur appuie sur le bouton 'annuler'
 * @param {any[]} cancelParams(optionnel) si besoin, paramêtres que prendra la fonction okCallback, tous rangés dans un array
 * 
 */

function Popup(text, okCallback, okParams, cancelCallback, cancelParams) {

    /**
     * Méthode display()
     *
     * Création, puis ajout à la page de l'élément HTML contenant le message à afficher + le ou les 2 boutons 'ok' et 'cancel'
     * 
     */
    this.display = () => {
        
        if(this.displayed) return;

        this.displayed = true;
        
        this.$popupCtnr = document.createElement('div');
        
        document.body.appendChild(this.$popupCtnr);

        const popupStyle = {
            backgroundColor: 'white',
            textAlign: 'center',
            boxShadow: '1px 1px 4px silver',
            padding: '20px',
            borderRadius: '4px',
            zIndex: 10,
            position: 'fixed',
            width: '260px',
            left: 'calc(50% - 150px)',
            top: '100px',
            transform: 'scale(0)'
        };

        for(prop in popupStyle) {
            this.$popupCtnr.style[prop] = popupStyle[prop];
        }
        
        this.show();
    
        $popupMsgCtnr = document.createElement('h6');
        $popupMsgCtnr.innerHTML = text;
        this.$popupCtnr.appendChild($popupMsgCtnr);
    
        const $btnsCtnr = document.createElement('div');
        $btnsCtnr.style.display = 'flex';
        $btnsCtnr.style.justifyContent = 'center';
        $btnsCtnr.style.margin = '20px auto'; 
        this.$popupCtnr.appendChild($btnsCtnr);
    
        const $okBtnCtnr = document.createElement('button');
        $okBtnCtnr.style.backgroundColor = '#305ebb';
        $okBtnCtnr.style.color = 'white';
        $okBtnCtnr.style.margin = '0 15px';
        $okBtnCtnr.style.border = 'none';
        $okBtnCtnr.style.borderRadius = '4px';
        $okBtnCtnr.style.width = '100px';
        $okBtnCtnr.style.height = '30px';
        $okBtnCtnr.innerText = 'Ok';
        $btnsCtnr.appendChild($okBtnCtnr);
        
        
        $okBtnCtnr.addEventListener('click', () => {
            if(okCallback) {
                okCallback(okParams);
            }
            this.hide();
        });
        
        if(cancelCallback) {
            const $cancelBtnCtnr = document.createElement('button');
            $cancelBtnCtnr.style.backgroundColor = '#dd5159';
            $cancelBtnCtnr.style.color = 'white';
            $cancelBtnCtnr.style.marginRight = '25px';
            $cancelBtnCtnr.style.border = 'none';
            $cancelBtnCtnr.style.borderRadius = '4px';
            $cancelBtnCtnr.style.width = '100px';
            $cancelBtnCtnr.style.height = '30px';
            $cancelBtnCtnr.innerText = 'Annuler';
            $btnsCtnr.appendChild($cancelBtnCtnr);
    
            $cancelBtnCtnr.addEventListener('click', () => {
                cancelCallback(cancelParams);
                this.hide();
            });
        } 
    };

    /**
     * Méthode show()
     *
     * Animation en Javascript faisant 'apparaitre' le conteneur du popup en faisant passer son ratio de taille de 0 à 1 en 200ms
     * 
     */
    this.show = () => {
        let size = 0;
        let interval = window.setInterval(() => {
            size += 0.1;
            this.$popupCtnr.style.transform = `scale(${size})`;

            if(size >= 1) {
                window.clearInterval(interval);
            }
        }, 20);
    };
    
    /**
     * Méthode hide()
     *
     * Animation en Javascript faisant 'disparaitre' le conteneur du popup en faisant passer son ratio de taille de 1 à 0 en 200ms
     * 
     */
    this.hide = () => {
        let size = 1;
        let interval = window.setInterval(() => {
            size -= 0.1;
            this.$popupCtnr.style.transform = `scale(${size})`;

            if(size <= 0) {
                window.clearInterval(interval);
                this.displayed = false;
                document.body.removeChild(this.$popupCtnr);
            }
        }, 20);
    };

    this.display();
}
