/**
 * Fonction utilitaire getImageData()
 *
 * Retourne une image à afficher dans le HTML encodé en base64
 * cette valeur apour but d'être passée en valeur de l'attribut src d'une balise <img>
 * 
 * @param {File} file élément de type File duquel récupéré de la data encodée en base64
 * 
 * @resolve {string} en cas de succès, on pourra récupérer la base64 dans le .then(). 
 * @reject {void} en cas d'échec , on le bloc .catch() ne retournera rien. 
 */
function getImageData(file) {
    return new Promise((resolve, reject) => {
        const reader  = new FileReader();

        reader.addEventListener("load", () => {
            resolve(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject();
        }
    });
}


function addZero(nbr) {
    return nbr < 10 ? '0' + nbr : nbr;
}

function formatDate(timestamp) {
    const months = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre'
    ];

    const days = [
        'dimanche',
        'lundi',
        'mardi',
        'mercredi',
        'jeudi',
        'vendredi',
        'samedi'
    ];

    const date_ = new Date(timestamp);
    const y     = date_.getFullYear();
    const m     = date_.getDate() + ' ' + months[date_.getMonth()];
    const d     = days[date_.getDay()];
    const hours = addZero(date_.getHours());
    const min   = addZero(date_.getMinutes());
    const sec   = addZero(date_.getSeconds());
    return `${d} ${m} ${y} à ${hours}:${min}:${sec}`;
}