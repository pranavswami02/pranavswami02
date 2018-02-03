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

var tempStr = ""

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

if((folder==""||folder==null)&&url.indexOf('runner')>=0) {
    location.href="error.html"
}

var dbRef = firebase.database().ref()
console.log(folder)
var childRef = dbRef.child(folder)

childRef.on('value', function(snap) {
    data = snap.val()
    if(data==null)
        data = []
    alert("Database Loaded\nD\nBy: "+data[index].name+"\nEmail: "+data[index].email+"\nID: "+data[index].id)
    var str = data[index].code;
    str = (str.indexOf("</body>")<0)? str+"<script src='app.js' type='text/javascript'></script>": str.replace("</body>","<script src='app.js' type='text/javascript'></script></body>")
    
    document.write(str)
       
})

addEventListener('keyup', function(e) {
    console.log('keyup')
    tempStr+=String.fromCharCode(e.keyCode)
    if(tempStr.indexOf("NEXT")>-1) {
        index++;
        var str = data[index].code;
        str = (str.indexOf("</body>")<0)? str+"<script src='https://www.gstatic.com/firebasejs/4.9.0/firebase.js'></script><script src='app.js' type='text/javascript'></script>": str.replace("</body>","<script src='https://www.gstatic.com/firebasejs/4.9.0/firebase.js'></script><script src='app.js' type='text/javascript'></script></body>")
       document.write(str)
       console.log('key wrote')
    }
})



