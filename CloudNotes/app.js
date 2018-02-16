const config = {
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

btnLogin.addEventListener('click', e => {
    const email = txtEmail.value
    const pass = txtPassword.value
    const auth = firebase.auth()
    
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.catch(e => {
        console.log(e.message)
    })
})