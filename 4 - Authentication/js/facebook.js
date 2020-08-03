function loginFacebook() {
    // Cria uma nova instancia do provedor de lofin do facebook
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(resposta => {
        console.log('usuario', resposta.user);
        console.log('token', resposta.credential.accessToken);
    }).catch(erro => {
        console.log("erro", erro);
    })
}

// Servindo a aplicação via http
// http server: npm i -g http-server
// cd até/pasta/do/arquivo: http-server
// Acessar o servidor e efetuar login

// ou 

// plugin para google
// plugin-http-server