var auth = firebase.auth()

function validateUser(user) {
    return user.emailVerified
}

window.onload = function() {
    console.log(validateUser(auth.currentUser))
}