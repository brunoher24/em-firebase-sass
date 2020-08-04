$signupBtn = document.querySelector('#signup-btn');

$emailInput = document.querySelector('#mail-input');
$pwdInput = document.querySelector('#pwd-input');


$signupBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const email     = $emailInput.value.trim();
    const password  = $pwdInput.value.trim();

    firebase_.signupWithEmailAndPassword(email, password);
});

