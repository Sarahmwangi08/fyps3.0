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
    console.log('button clicked'+ emailInput + ' ' + passwordInput + ' ');


    /*regFire(emailInput,passwordInput);*/

    var role2 = document.getElementById('selRole').value;
    var fname2 = document.getElementById('fname').value;
    var lname2 = document.getElementById('lname').value;
    var idNumber2 = document.getElementById('idNum').value;


    if (fname2 == '') {
        document.getElementById('alert2').classList.remove('alert-success');
        document.getElementById('alert2').classList.add('alert-danger');
        document.getElementById('alert2').innerHTML = 'First name empty!';
    }else if (fname2 != '') {
        if (lname2 == '') {
            document.getElementById('alert2').classList.remove('alert-success');
            document.getElementById('alert2').classList.add('alert-danger');
            document.getElementById('alert2').innerHTML = 'last name empty!';
        }else if (lname2 != '') {
            if (idNumber2 == '') {
                document.getElementById('alert2').classList.remove('alert-success');
                document.getElementById('alert2').classList.add('alert-danger');
                document.getElementById('alert2').innerHTML = 'Id field empty!';
            }else if (idNumber2 != '') {
                if (idNumber2.length != 6) {
                    document.getElementById('alert2').classList.remove('alert-success');
                    document.getElementById('alert2').classList.add('alert-danger');
                    document.getElementById('alert2').innerHTML = 'ID invalid!';
                }else if (fname2.length != 6 ) {

                    console.log(6);


                    regFire(emailInput,passwordInput);

                }
            }
        }
    }


});

function regFire(email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (success) {
        document.getElementById('alert2').hidden = false;
        document.getElementById('alert2').classList.remove('alert-danger');
        document.getElementById('alert2').classList.add('alert-success');
        document.getElementById('alert2').innerHTML = 'Success!';



        console.log('success', success);

        var userDetails = firebase.auth().currentUser;
        var userTrueID = userDetails.uid;
        var userEmail = userDetails.email;
        console.log(userTrueID);

        var role = document.getElementById('selRole').value;
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        var idNumber = document.getElementById('idNum').value;

        writeUsersToDb(idNumber,role,fname,lname,userTrueID,userEmail);


        /*setTimeout(function () {
            window.location.href = 'index.html';
        } ,5000);*/


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

    function checkAuthStatechange() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.

                console.log('signed in ' + user);
            } else {
                // No user is signed in.
            }
        });
    }


}


function writeUsersToDb(admissionNumber, role, fname, lname,userID,Email) {
        firebase.database().ref('users/' + userID).set({
            admissionNumber: admissionNumber,
            role: role,
            fname : fname,
            lname:lname
        }).then(function () {
            console.log('write successful', role);



            $.ajax({
                type: "post",
                method: "POST",
                data: {role:role, admissionNumber:admissionNumber,lname:lname,fname:fname,userID:userID,Email:Email},
                url: "php/createUpdate.php",
                success: function (response) {
                    console.log('response: '+ response);
                }
            });


        });
}