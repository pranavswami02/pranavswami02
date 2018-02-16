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
var childRef = dbRef.child(folder)
var done = false;

childRef.on('value', function(snap) {
    data = snap.val()
    if(done)
        return;
    done = true;
    if(data==null) {
        data = []
        return;
    }
    
    if(data[index].hasOwnProperty('views'))
        childRef.child(index).child('views').set(parseInt(data[index]['views'])+1)
    else
        childRef.child(index).child('views').set(1)
    
    var alertMessage = "Database Loaded\n-------------------------"
    var obj = data[index];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)&&key!="code") {
            
            alertMessage+="\n"+capitalize(key)+": "+obj[key]
        
        }
    }
    
    alert(alertMessage)
    var str
    try {
        str = data[index].code;
    } catch(e) {
        str = "<img width='200px' height='200px' src='https://images-na.ssl-images-amazon.com/images/I/61gDDm3btfL._SL1000_.jpg'><p style='text-align: center; color: #f22; font-size: 200%; font-weight: bold; background:linear-gradient(blue, green)'>This is an empty location in the database</p>"
    }
   // str = (str.indexOf("</body>")<0)? str+"<script src='app.js' type='text/javascript'></script>": str.replace("</body>","<script src='app.js' type='text/javascript'></script></body>")
    
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

function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.substring(1);
}



