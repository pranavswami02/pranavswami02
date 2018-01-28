var pass = prompt('Please Enter the Password: ')

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

function update() {
    var text = document.getElementById('textfield').value
    if(pass==decode('dpefxfc'))    
        htmlDbRef.set(text)
}
