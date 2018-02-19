var config = {
    apiKey: "AIzaSyCd1dNugLT94SV-uMY086QGoe8f-F7d2rk",
    authDomain: "cloudnotes-rishavb123.firebaseapp.com",
    databaseURL: "https://cloudnotes-rishavb123.firebaseio.com",
    projectId: "cloudnotes-rishavb123",
    storageBucket: "",
    messagingSenderId: "584029404493"
};
firebase.initializeApp(config);

const txtEmail = document.getElementById('txtEmail')
const txtPassword = document.getElementById('txtPassword')
const btnLogin = document.getElementById('btnLogin')
const btnSignUp = document.getElementById('btnSignUp')
const btnLogout = document.getElementById('btnLogout')
const errorOutput = document.getElementById('error-output')

function outputError(e) {
    errorOutput.innerHTML = e.message
    $('.warning').removeClass('hide')
}

function clearOutput() {
    errorOutput.innerHTML =''
    $('.warning').addClass('hide')
}

btnLogin.addEventListener('click', e => {
    const email = txtEmail.value
    const pass = txtPassword.value
    const auth = firebase.auth()
    
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.then(e => {
        clearOutput()
    }).catch(e => {
        outputError(e)
    })
})

btnSignUp.addEventListener('click', e=> {
    const email = txtEmail.value
    const pass = txtPassword.value
    const auth = firebase.auth()
    
    const promise = auth.createUserWithEmailAndPassword(email, pass)
    promise.then(e => {
        clearOutput()
    }).then(e => {
        var user = firebase.auth().currentUser

        user.sendEmailVerification()
        
    }).catch(e => {
        outputError(e)
    })
})

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
})

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        $('.log-in').addClass("hide")
        $('.main-app').removeClass('hide')
        txtEmail.value = ""
        txtPassword.value = ""
        $('canvas').removeClass('blur')
        app()
    }
    else {
        $('.log-in').removeClass('hide')
        $('.main-app').addClass('hide')
    }
})

$('body').click(e => {
    if(e.target.tagName=='BODY')
        $('canvas').removeClass('blur')
})

var dbRef = firebase.database().ref()
var userRef
data = []

document.getElementById('search-bar').addEventListener('keyup', function() {
    var input = document.getElementById('search-bar').value.toLowerCase()
    var li = document.getElementById('notes').getElementsByTagName('li')
    
    for(var i=0;i<li.length;i++) {
        var spans = li[i].getElementsByClassName('inside-list')
        if(spans[0].innerHTML.toLowerCase().indexOf(input)<0&&spans[1].innerHTML.toLowerCase().indexOf(input)<0) {
            li[i].classList.add('hide')
        } else {
            li[i].classList.remove('hide')
        }
                
    }
    
})

document.getElementById('editor').addEventListener('keyup', function() {
    var edit = document.getElementById('editor')
    var index = edit.dataset.index
    var titleInput = document.getElementById('title-input')
    var lastEditedArea = document.getElementById('editor-last-edited')
    var updatedNote = document.getElementById('updated-note')
    
    var time = curTime()
    
    lastEditedArea.innerHTML = time
    
    userRef.child(index).set({
        
        "title": titleInput.value.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
        "note": updatedNote.value.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
        "last-edited": time
        
    })
    
})


function editor(index) {
    $('.editor-wrapper').removeClass('hide')
    $('.main-app').addClass('blur')
    var edit = document.getElementById('editor')
    edit.dataset.index = String(index)
    
    var dbData = data[index]
    
    var titleInput = document.getElementById('title-input')
    var lastEditedArea = document.getElementById('editor-last-edited')
    var updatedNote = document.getElementById('updated-note')

    titleInput.value = dbData["title"]
    lastEditedArea.innerHTML = "Last Edited: "+dbData["last-edited"]
    updatedNote.value = dbData["note"]
    
}

function noteDelete() {
    var entry = prompt("Are You Sure That You Want To Delete This Note? ")
    console.log(!isIn(properResponses, entry.toLowerCase().replace(/ /g,'')))
    if(!isIn(properResponses, entry.toLowerCase().replace(/ /g,'')))
        return;
    var edit = document.getElementById('editor')
    var index = parseInt(edit.dataset.index)
    closeEditor()
    removeData(index)
}

function removeData(index) {
    for(var x=index;x<data.length-1;x++) {
        userRef.child(x).set(data[index+1])
    }
    userRef.child(data.length-1).remove()
}

var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
var properResponses = ["yes","totally","yup","imsure","ofcourse","whynot","definitely","gladly","i'msure"]

function closeEditor() {
    console.log('closed')
    $('.editor-wrapper').addClass('hide')
    $('.main-app').removeClass('blur')
}

function isIn(arr, item) {
    for(var a in arr) {
        if(arr[a]==item)
            return true;
    }
    return false;
}

function curTime() {
    var d = new Date()
    return d.getDate()+" "+months[parseInt(d.getMonth())]+" "+d.getFullYear()+" "+String(parseInt(d.getHours()))+":"+String(parseInt(d.getMinutes()))+":"+String(parseInt(d.getSeconds()))+":"+String(parseInt(d.getMilliseconds()))
}

function newNote() {
    var ni = data.length
    userRef.child(ni).set({
        "title": "New Note",
        "note": "Enter Text Here",
        "last-edited": curTime()
    })
    
    editor(data.length-1)
}

function app() {
    if(firebase.auth().currentUser.emailVerified) {
        userRef = dbRef.child(firebase.auth().currentUser.uid)
        userRef.on('value', function(snap) {
            data = snap.val()
            if(data==null) {
                data = [];
            }
            
            document.getElementById('notes').innerHTML = '';
            
            for(index in data) {
                document.getElementById('notes').innerHTML+="<li class='note' onclick = 'editor("+String(index)+")'><h2 class='note-title inside-list'>"+data[index].title+"</h2><pre class='note-content inside-list'>"+data[index].note+"</pre></li>"
            }
            
            document.getElementById('notes').innerHTML+="<li class='note' onclick='newNote()'><h2 class='note-title inside-list'>New Note</h2><span class='new-note note-content inside-list'></span></li>"
            
        })
        var innerCode = ""
        
    } else {
        document.getElementById('notes').innerHTML = '<h1 style="color: red;">PLEASE USE A VERIFIED ACCOUNT</h1>'
    }
}
