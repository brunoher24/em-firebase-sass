function getImageData(file) {
    return new Promise((resolve, reject) => {
        const reader  = new FileReader();

        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject();
        }
    });
}