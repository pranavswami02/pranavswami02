// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbjWaJsINCmpUKSDacUi8NVgO-i9Wx5hA",
    authDomain: "messaging-rishavb123.firebaseapp.com",
    databaseURL: "https://messaging-rishavb123.firebaseio.com",
    projectId: "messaging-rishavb123",
    storageBucket: "",
    messagingSenderId: "354766583193"
};
firebase.initializeApp(config);

function updateScroll(){
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}

var textForEventListener = document.getElementById('textfield');


var object = {
    
}

var size = 0;
var dbRef = firebase.database().ref()
var full = dbRef.child("Messages")
full.on('value', function(snap){
    var messages = document.getElementById('messages');
    var msgs = "";
    var title = document.getElementById('title');
    size = snap.val().length;
    
    object = {

    }
    for (value in snap.val()) {
        object[value] = snap.val()[value];
        msgs+="<p>"+snap.val()[value]+"</p>";
        title.innerHTML = (size<=1)? "Messaging":snap.val()[value];
    }
    
    if(snap.val()[snap.val().length-1]=="noise") {
        document.getElementById("audio").play()
    }

    messages.innerHTML = msgs;
    
    updateScroll();
    
});

function enter(e) {
    if( e.keyCode == 13 )
        send();
}


function send() {
    var title = document.getElementById('title');
    var text = document.getElementById('textfield');
    var messages = document.getElementById('messages');
    
    if(text.value!="[(}:]clear[:{)]") {
        object[size] = text.value;
        title.innerHTML = text.value;
        size++;

        full.set(object);
    }
    else {
        object = {
            0: "Welcome To Rishavs Messaging Web App"
        }
        title.innerHTML = "Messaging";
        size = 1;
        
        messages.innerHTML = "<p>Welcome To Rishavs Messaging Web App</p>"
        
        full.set(object);
    }
    
    
    
    updateScroll();
    text.value="";
    
}
