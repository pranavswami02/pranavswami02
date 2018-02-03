var config = {
    apiKey: "AIzaSyDhtxgKACak2_A29LCkL_nehtjBdN87pl0",
    authDomain: "turnincode.firebaseapp.com",
    databaseURL: "https://turnincode.firebaseio.com",
    projectId: "turnincode",
    storageBucket: "turnincode.appspot.com",
    messagingSenderId: "140277393494"
};
firebase.initializeApp(config)

var data = []

var title = location.href.split("?").length==1 ? "current" : (location.href.split("?")[1].split("=")[0]=="title"?location.href.split("?")[1].split("=")[1]:"current")
if(title==""||title==null)
    title="current"
displayTitle = capitalize(title)


var formTitle = document.getElementById("formTitle")
formTitle.innerHTML = displayTitle

var pageTitle = document.getElementById("title")
pageTitle.innerHTML = displayTitle

var dbRef = firebase.database().ref()
var childRef = dbRef.child(title)

childRef.on('value', function(snap) {
    data = snap.val()
    if(data==null)
        data = []
})

function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function submit() {
    
    var studentRef = childRef.child(data.length)
    var d = new Date()
    studentRef.set({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        id: document.getElementById('id').value,
        code: document.getElementById('code').value,
        datatime: d.toString()
    })
    location.href = "submitted.html"
}