$signupBtn = document.querySelector('#signup-btn');

$emailInput = document.querySelector('#mail-input');
$pwdInput = document.querySelector('#pwd-input');


$signupBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const email     = $emailInput.value.trim();
    const password  = $pwdInput.value.trim();

    firebase_.signupWithEmailAndPassword(email, password);
});

async function getImage(file) {
   const imageData = await getImageData(file);
   return imageData;
};

document.querySelector('#file-input').addEventListener('change', e => {
   getImage(e.target.files[0]).then(imageData => {
    console.log(imageData);
   });
});

