var config = {
    apiKey: "AIzaSyDJghWeCxA0rNRRaHE_sG7qI5clFY3pSbo",
    authDomain: "fyps-84588.firebaseapp.com",
    databaseURL: "https://fyps-84588.firebaseio.com",
    projectId: "fyps-84588",
    storageBucket: "fyps-84588.appspot.com",
    messagingSenderId: "130526592260"
};
firebase.initializeApp(config);

$('#registerBtn').click(function () {
    var passwordInput = document.getElementById('password2').value;
    var emailInput = document.getElementById('email2').value;
    console.log('button clicked');

    regFire(passwordInput,emailInput);
});

function regFire(email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (success) {
        document.getElementById('alert2').hidden = false;
        document.getElementById('alert2').classList.add('alert-success');
        document.getElementById('alert2').innerHTML = 'Success!';
        window.location.href = 'index.html';

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;


        document.getElementById('alert2').hidden = false;
        document.getElementById('alert2').classList.add('alert-danger');
        document.getElementById('alert2').innerHTML = errorMessage;
        console.log(error);
        // ...
    });
}