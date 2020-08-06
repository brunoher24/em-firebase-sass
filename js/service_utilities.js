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
    const hours = date_.getHours();
    const min   = date_.getMinutes();
    const sec   = date_.getSeconds();
    return `${d} ${m} ${y} à ${hours}:${min}:${sec}`;
}