/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

// Referencia para o storafe do firevase, criando uma pasta com o nome arquivos
var ref = firebase.storage().ref('arquivos');

var tarefaDeUpload;

/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    // Recupera o primeiro arquivo
    var arquivo = event.target.files[0];

    // Gera um id unico do firebase, sem inserir nada
    var uid = firebase.database().ref().push().key;

    // Upload

    // // child: Vai acessar o caminho para inserir o arquivo
    // // put: vai inserir o arquivo
    // ref.child(uid).put(arquivo, {
    //     customMetadata: {
    //         nome: "Fate"
    //     }
    // }).then(snapshot => {
    //     console.log("snapshot", snapshot);

    //     // getDownloadURL: retorna a url para download/apresentação desse arquivo enviado
    //     ref.child(uid).getDownloadURL().then(url => {
    //         console.log('string download', url);
    //     });

    //     ref.child(uid).getMetadata().then(metadata => {
    //         console.log("metadata", metadata);
    //     });
    // });

    // Gerenciar Upload

    // Atribui a tarefa de upload a variavel, e executa ao dar o put
    tarefaDeUpload = ref.child(uid).put(arquivo);

    // monitora o download
    tarefaDeUpload.on('state_changed', upload => {
        console.log("Mudou o estado", upload);

        // retorna o estado do download, ele pode ser running, paused ou success
        if (upload.state = 'running') {
            // Bytes transfetidos e totais dos arquivos
            var progresso = Math.round((upload.bytesTransferred / upload.totalBytes) * 100);
            console.log(`${progresso}%`);
        }
    }, error => {
        console.log("Ocorreu um erro", error);
    }, () => {
        console.log('Completou a tarefa');

        ref.child(uid).getDownloadURL().then(url => {
            console.log('string download', url);
        });
    });

    // tarefaDeUpload.then(snapshot => {
    //     console.log("snapshot", snapshot);
    // }).catch(error => {
    //     // Pega o erro, nessa caso, os cancelamento da tarefa
    //     console.log("error", error);
    // })
}

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
    // Recupera o primeiro arquivo
    var arquivo = event.target.files[0];

    // Cria o objeto de conversão para base64
    const reader = new FileReader();

    // Le o arquivo como data url
    reader.readAsDataURL(arquivo);

    // Resultado
    reader.onload = function () {
        // Formata a string da img
        const base64 = reader.result.split('base64,')[1];

        // putString: salva uma string no firebase e posso colocar um formate de image que ele automaticate converta para png
        ref.child('imagem').putString(base64, 'base64', { contentType: 'image/png' }).then(snapshot => {
            // getDownloadURL: retorna a url para download/apresentação desse arquivo enviado
            ref.child("imagem").getDownloadURL().then(url => {
                console.log('string download', url);
            })
        })
    }
}

/*
 * Deleta um arquivo
 */
function deletar() {
    ref.child('imagem').delete().then(() => {
        console.log("Deletou com sucesso")
    }).catch(error => {
        console.log("Erro", error);
    });
}

// Passa a tarefa de upload
pausar = function () {
    tarefaDeUpload.pause();
    console.log("Passou a tarefa");
}

// Continua a tarefa de upload pausada
continuar = function () {
    tarefaDeUpload.resume();
    console.log("Continuou a tarefa");
}

// Cancela a tarefa de upload
cancelar = function () {
    tarefaDeUpload.cancel();
    console.log("Cancelou a tarefa");
}