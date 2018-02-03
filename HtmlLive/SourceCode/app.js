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
var url = location.href

var index
var folder

if(url.split("?").length==1) {
    index=-1
    folder = null
}
else {
    var str = url.split("?")[1]
    var indexEquals = str.split("/")[1]
    folder = str.split("/")[0]
    if(folder==null) {
        index = -1
    }
    else if(indexEquals==null||indexEquals=="") {
        index = 0 
    }
    else if(indexEquals.split("=")[0]=="index")
        index = parseInt(indexEquals.split("=")[1])
}
        
        
if(index==null||Number.isNaN(index))
    index=0

if(folder==""||folder==null)
    location.href="error.html"

var dbRef = firebase.database().ref()
var childRef = dbRef.child(folder)

childRef.on('value', function(snap) {
    data = snap.val()
    if(data==null)
        data = []
    var infoDiv = document.getElementById('info')
    infoDiv.innerHTML = "<span class='key'>Name: </span><span class='value'>"+data[index].name+"</span> <span class='key'>Email: </span> <span class='value'>"+data[index].email+"</span> <span class='key'>ID: </span> <span class='value'>"+data[index].id+"</span><button class='copy' onclick='copyToClip()'><img src='https://camo.githubusercontent.com/84a37ebae7c3ec772c449f9f16cdbd08334f6e01/68747470733a2f2f636c6970626f6172646a732e636f6d2f6173736574732f696d616765732f636c697070792e737667'/></button>"
    var str = data[index].code.replace(/</g,'&lt;').replace(/>/g,'&gt;</span>')
    
    str = str.replace(/&lt;/g,'<span class="ang-brace">&lt;</span><span class="tag">')
    str = str.replace(/&gt;/g,'</span><span class="ang-brace">&gt;</span>')
    
    var codeTag = document.getElementById('code')
    codeTag.innerHTML = str
})


function copyToClip() {
    
    var copyText = document.getElementById("code")
    selectElementTest(copyText)
    document.execCommand("Copy")
    
}

function selectElementTest(el) {
    var range = document.createRange();
    range.selectNodeContents(el)
    var selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range);
}

