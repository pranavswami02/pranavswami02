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
    infoDiv.innerHTML = "<span class='key'>Name: </span><span class='value'>"+data[index].name+"</span> <span class='key'>Email: </span> <span class='value'>"+data[index].email+"</span> <span class='key'>ID: </span> <span class='value'>"+data[index].id+" <span class='key'>Short-Url: </span> <span class='value'>"+data[index].url+"</span><button class='copy' onclick='copyToClip()'>copy</button>"
    var str = data[index].code
    
    str = str.replace(/"/g,'😁')
    str = str.replace(/=/g,'😄')
    
    str = str.replace(/</g,'&lt;').replace(/>/g,'&gt;</span>')
    
    str = str.replace(/&lt;/g,'<span class="ang-brace">&lt;</span><span class="tag">')
    str = str.replace(/&gt;/g,'</span><span class="ang-brace">&gt;</span>')
    
    
    str = str.replace(/😄/g,"<span class='equals-sign'>=</span>")
    arr = str.split('😁')
        
    str=arr[0]
    
    for(var x=1; x<arr.length;x++) {
        if(x%2==1) {
            str+='<span class="string">"'+arr[x]
        } else {
            str+='"</span>'+arr[x]
        }
    }
    
    var codeTag = document.getElementById('code')
    codeTag.innerHTML = str
    
    var tags = document.getElementsByClassName('tag')
    
    for(var x=0;x<tags.length;x++) {
        var s = tags[x].innerHTML
        s=s.replace(" "," <span class='attributes'>")
        if(s.indexOf(" <span class='attributes'>")>-1)    
           s+="</span>"
        
        tags[x].innerHTML=s
    }
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

