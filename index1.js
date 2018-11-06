var config = {
    apiKey: "AIzaSyDJghWeCxA0rNRRaHE_sG7qI5clFY3pSbo",
    authDomain: "fyps-84588.firebaseapp.com",
    databaseURL: "https://fyps-84588.firebaseio.com",
    projectId: "fyps-84588",
    storageBucket: "fyps-84588.appspot.com",
    messagingSenderId: "130526592260"
};
firebase.initializeApp(config);

$('#logoutBtn').on('click',function () {
    firebase.auth().signOut().then(function () {
        console.log('logout done');
        setTimeout(function () {
            document.location.href = 'login.html';
        },3000);
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log(user);
        var userID = user.uid;
        var userRead2 = firebase.database().ref('users/' + userID);
        userRead2.on('value', function(snapshot) {
            console.log(snapshot.val().role);
            var userRole = snapshot.val().role;
            var Username12 = snapshot.val().fname + " " + snapshot.val().lname;

            document.getElementById('UnameField').innerHTML = Username12;

            if (userRole == 'Student'){
                console.log('this is a student');
            }else if (userRole == 'Supervisor') {
                console.log('switch to supervisor');
                setTimeout(function () {
                    document.location.href = 'index-2.html';
                },1000);
            }else if (userRole == 'Lead Lecturer') {
                console.log('This is a lead lecturer');
                setTimeout(function () {
                    document.location.href = 'index-0.html';
                },1000);
            }


        });

    } else {
        // No user is signed in.
        console.log('signed out current user');
        document.location.href = 'login.html';
    }
});
