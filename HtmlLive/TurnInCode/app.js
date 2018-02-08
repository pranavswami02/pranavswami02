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
    var sourceUrl
    var url
    
    get_short_url("https://rishavb123.github.io/HtmlLive/Webpages?"+pageTitle+"/index="+data.length, function(short_url) {
        url=short_url
    });
    
    studentRef.set({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        id: document.getElementById('id').value,
        code: document.getElementById('code').value,
        datatime: d.toString(),
    })
    location.href = "submitted.html?"+url;
}

//https://tinyurl.com/api-create.php?url="+bigurl
function get_short_url(long_url, func)
{
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": "R_3f041f721fc14727a301fee9de2ad41a",
            "login": "rishavb123",
            "longUrl": long_url
        },
        function(response)
        {
            func(response.data.url);
        }
    );
}
get_short_url("https://rishavb123.github.io", function(short_url) {
    console.log(short_url)
});