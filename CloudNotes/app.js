 var config = {
    apiKey: "AIzaSyAq63qosOoZBFq8StzAtUP2IVjBuK7F8Ao",
    authDomain: "cloudnotes-b0199.firebaseapp.com",
    databaseURL: "https://cloudnotes-b0199.firebaseio.com",
    projectId: "cloudnotes-b0199",
    storageBucket: "cloudnotes-b0199.appspot.com",
    messagingSenderId: "605043491958"
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

var userRef = firebase.database().ref()
data = []

userRef.on('value', function(snap) {
    data = snap.val()
    if(data==null) {
        data = [];
    }
    console.log(data)
})


function app() {
    if(firebase.auth().currentUser.emailVerified) {
       // userRef = userRef.child(firebase.auth().currentUser.uid)
        console.log('good')
        var innerCode = ""
        
    } else {
        document.getElementById('notes').innerHTML = '<h1 style="color: red;">PLEASE USE A VERIFIED ACCOUNT</h1>'
    }
}

