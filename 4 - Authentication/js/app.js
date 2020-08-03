function logout() {
    // Faz logout da aplicação;
    firebase.auth().signOut().then(() => {
        alert("O Usuário deslogou")
    })
}

document.addEventListener("DOMContentLoaded", function () {
    // Instancia o firebaseUi
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // Configura o firebaseUi
    var config = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult) {
                console.log("authResult", authResult);
                return false;
            }
        },
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                defaultCountry: 'BR'
            }
        ],
        signInFlow: 'popup'
    }


    // Inicializa o firebaseUi
    ui.start('#firebaseUi-auth', config)
})