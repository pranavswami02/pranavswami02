
var config = {
    apiKey: "AIzaSyDbUVRacFx1pzWHo3rCzdU8720OjTzBLPg",
    authDomain: "htmllive-b01eb.firebaseapp.com",
    databaseURL: "https://htmllive-b01eb.firebaseio.com",
    projectId: "htmllive-b01eb",
    storageBucket: "htmllive-b01eb.appspot.com",
    messagingSenderId: "879716801562"
};
firebase.initializeApp(config);

var dbRef = firebase.database().ref()

var htmlDbRef = dbRef.child('html')

htmlDbRef.on('value', function(snap) {
    
    document.getElementById('fullHTML').innerHTML = snap.val()+ "<script src='https://www.gstatic.com/firebasejs/4.9.0/firebase.js'></script><script src='script.js'></script>"
    
})
