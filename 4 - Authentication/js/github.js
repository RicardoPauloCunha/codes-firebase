function loginGithub() {
    // Cria uma nova instancia do provedor de lofin do facebook
    var provider = new firebase.auth. GithubAuthProvider();

    firebase.auth().signInWithPopup(provider).then(resposta => {
        console.log('usuario', resposta.user);
        console.log('token', resposta.credential.accessToken);
    }).catch(erro => {
        console.log("erro", erro);
    })
}