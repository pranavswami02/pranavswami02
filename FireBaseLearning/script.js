// Initialize Firebase
var config = {
    apiKey: "AIzaSyBXy-V7UvK0H6nLkqHQ4_iPyhDIofeySLA",
    authDomain: "fire-base-learning.firebaseapp.com",
    databaseURL: "https://fire-base-learning.firebaseio.com",
    projectId: "fire-base-learning",
    storageBucket: "fire-base-learning.appspot.com",
    messagingSenderId: "997214819415"
};
firebase.initializeApp(config);

var bigOne = document.getElementById('bigOne');
var save = document.getElementById('save');

var dbRef = firebase.database().ref()
var text = dbRef.child("text")
text.on('value', snap => bigOne.innerHTML = snap.val());

function update() {
    var status = document.getElementById('status');
    var te = (status.value==null)? "":status.value;
    dbRef.set({
       text: te,
       second: "hello Rishav "+status.value,
       third: "MAde from web aapp"
    });
}
