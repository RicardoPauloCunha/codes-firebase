const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
    apiKey: "AIzaSyAwmhj1WiXFfdKHSJ8B3jX2FS7e5XhKAJM",
    authDomain: "curso-firebase-webapps-b0857.firebaseapp.com",
    databaseURL: "https://curso-firebase-webapps-b0857.firebaseio.com",
    projectId: "curso-firebase-webapps-b0857",
    storageBucket: "curso-firebase-webapps-b0857.appspot.com",
    messagingSenderId: "559854379896",
    appId: "1:559854379896:web:85253099442c540a879e8d",
    measurementId: "G-LSK1T3FY6L"
});

exports.addCard = functions.https.onRequest((request, response) => {
    let card = JSON.parse(request.body);

    admin.database().ref('card').push(card).then(() => {
        response.status(200).send('Gravação realizada com sucesso')
    }, error => {
        response.status(500).send(error);
    });
});

// onCreate = ao criar uma novo dado na db
// onUpdate = ao atualizar um dano no nó
// onDelete = ao excluir um dado em um nó
// onWrite = ao executar qualquer uma das funções anteriores
exports.updateCount = functions.database.ref('/card/{pushId}').onCreate((snapshot, context) => {
    // .onCreate: snapshot é o dado atual, context é o contexto
    admin.database().ref('card').once('value').then(snap => {
        admin.database().ref('contagem').set(snap.numChildren()).then(() => {
            // É preciso retorna um dado ou processo;
            return snap.numChildren();
        })
    });
});


exports.updateName = functions.firestore.document('/cards/{userId}').onCreate((snapshot, context) => {
    let nome = snapshot.data().nome;

    nome = nome.toUpperCase();

    admin.firestore().collection('cards').doc(snapshot.id).update(nome).then(() => {
        return nome;
    })
})