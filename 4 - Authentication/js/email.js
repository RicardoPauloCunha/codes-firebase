var currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Crio usuário por email e senha
    firebase.auth().createUserWithEmailAndPassword(email, senha).then(user => {
        console.log('Usuario', user);
        alert("Usuário criado e logado");
    }).catch(error => {
        console.log('error', error);
    });
}

/**
 * Função para login
 */
function loginEmail() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Faz login e autentico o usuário por email e senha
    firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
        alert("Usuário loagado");
    }).catch(error => {
        console.log('error', error);
    });
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // Observa se há um usuário e mudanças na autenticaçao (login e logout)
    firebase.auth().onAuthStateChanged((usuario) => {
        if (usuario) {
            console.log("usuario", usuario);
            currentUser = usuario;

            // // Mudando o idioma do firebase
            // firebase.auth().languageCode = 'pt';

            // // Muda o idioma com base no aparelho
            // firebase.auth().useDeviceLanguage();

            // // Caso não tenha verificado o email
            // if (!usuario.emailVerified) {
            //     // Envia um email para a conta do usuário
            //     usuario.sendEmailVerification().then(() => {
            //         alert('Email de verificação enviado')
            //     })
            // }

            // // Envia email para mudança de senha para o email do usuário
            // firebase.auth().sendPasswordResetEmail(usuario.email).then(() => {
            //     alert("Email para resete de senha enviado")
            // })
        }
        else
            console.log("Não há usuário logado")
    });

    currentUser = firebase.auth().currentUser;

    if (currentUser) {
        console.log("currentUser", currentUser);

        // Métodos para update de dados do usuário criado no auth
        currentUser.updateProfile({
            displayName: "Ricardo Paulo",
            photoURL: ""
        });
        // currentUser.updateEmail('ricardo@gmail.com');
        // currentUser.updatePassword('ricardo321');
        // currentUser.updatePhoneNumber('+55119xxxxxxxx');
    }
});

/*
 * Deleeta um usuário 
 */
function deletaUsuario() {
    if (currentUser) {
        currentUser.delete().then(() => {
            alert("Usuário excluido")
        })
    }
}