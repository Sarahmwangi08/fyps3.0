var config = {
    apiKey: "AIzaSyDJghWeCxA0rNRRaHE_sG7qI5clFY3pSbo",
    authDomain: "fyps-84588.firebaseapp.com",
    databaseURL: "https://fyps-84588.firebaseio.com",
    projectId: "fyps-84588",
    storageBucket: "fyps-84588.appspot.com",
    messagingSenderId: "130526592260"
};
firebase.initializeApp(config);


$('#submitBtn').click(function () {
    var usernameInput = document.getElementById('username1').value;
    var passwordInput = document.getElementById('password1').value;
    console.log('button clicked');
    loginFire(usernameInput,passwordInput);
});
$('#gotoRegister').click(function () {
    window.location.href = 'register.html';
});


function loginFire(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (success) {

        document.getElementById('alertI').hidden = false;
        document.getElementById('alertI').classList.add('alert-success');
        document.getElementById('alertI').innerHTML = 'Success!';
        window.location.href = 'index.html';
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;


        document.getElementById('alertI').hidden = false;
        document.getElementById('alertI').classList.add('alert-danger');
        document.getElementById('alertI').innerHTML = errorMessage;
        console.log(error);
        // ...
    });
}