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

console.log(title)

if(title==""||title==null)
    title="current"
title = title.toLowerCase()
displayTitle = capitalize(title)


var formTitle = document.getElementById("formTitle")
formTitle.innerHTML = displayTitle

var pageTitle = document.getElementById("title")
pageTitle.innerHTML = displayTitle

var dbRef = firebase.database().ref()
var childRef = dbRef.child(title)
var overrideRef = dbRef.child("OverrideDisabled")

overrideRef.on('value', function(snap) {
    titles = snap.val()
    for(var x=0;x<titles.length;x++) {
        if(title == titles[x]) {
            document.getElementById("overide").style.display="none"
            break
        }
            
    }
})

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
    
    var studentRef = getNewRef()
    var d = new Date()
    
    studentRef.set({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        id: document.getElementById('id').value,
        code: document.getElementById('code').value,
        datatime: d.toString(),
    })
    get_short_url("https://rishavb123.github.io/HtmlLive/Webpages/runner.html?"+title+"/index="+(data.length-1), function(short_url) {
        location.href = "submitted.html?"+short_url
        studentRef.child('url').set(short_url)
    });
}

function getNewRef() {
    var overrideTag = document.getElementById("override")
    var overrideText = overrideTag.value
    try {
        if(overrideText.length==0)
            throw "Empty"
        console.log(typeof parseInt(overrideText))
        if(isNaN(parseInt(overrideText)))
            throw "NAN ERROR"
        console.log(parseInt(overrideText))
        return childRef.child(parseInt(overrideText))
    } catch(err) {
        for(var x=0;x<data.length;x++) {
            if(data[x].url == overrideText)
            {
                console.log(data[x].code)
                return childRef.child(x)
            }
        }
    }
    
    return childRef.child(data.length)
}

function get_short_url(long_url, handler)
{
    $.getJSON(
        "https://api-ssl.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": "R_3f041f721fc14727a301fee9de2ad41a",
            "login": "rishavb123",
            "longUrl": long_url
        },
        function(response)
        {
            handler(response.data.url);
        }
    );
}