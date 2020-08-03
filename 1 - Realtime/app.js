/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];

// Resumo da referencia
// Firebase: Objeto do global do firebase
// Database: Cria e manipula realtimeDatabase
// Ref: Referencia NÓ no banco
var ref = firebase.database().ref("card")

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    // Infos do card
    var card = {
        nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
        idade: Math.floor(Math.random() * 22 + 18),
        curtidas: 0
    };

    // Insera dados no firebase
    // Set: Seta os dados
    // Child: Acessa o nome filho passado pelo parametro
    // ref.child(card.nome).set(card).then(() => {
    //     adicionaCardATela(card);
    // })

    // Push: cria uma id unica e insere os dados dentro desse id
    // ref.push(card).then(snapshot => {
    //     adicionaCardATela(card, snapshot.key);
    // });

    // Usando fetch para adicionar um card
    fetch("https://curso-firebase-webapps-b0857.firebaseio.com/card.json", {
        body: JSON.stringify(card),
        method: "POST",
        mode: "no-cors"
    }).catch(err => console.log(err));
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    // Recupera o item pelo id
    var card = document.getElementById(id);

    // .remove: remove o nó em que o método é utilizado, além de todos os nós dentro do nó removido
    ref.child(id).remove().then(() => {
        card.remove();
    });

    // .set(null): ao set um nó em nulo exclui essa método do firebase
    // ref.child(id).set(null).then(() => {
    //     card.remove();
    // });
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    // Recupera o item pelo id
    var card = document.getElementById(id);
    var count = card.getElementsByClassName("count-number")[0];
    var countNumber = +count.innerHTML;
    countNumber++;

    // .set: Pode ser acessado diretamete o objeto que quer atualizar, e passar o valor atualizado
    // Ou pode-se passar o objeto completo e atualiza-lo com os novos valores nos campo correspondentes
    ref.child(id + '/curtidas').set(countNumber).then(() => {
        count.innerText = countNumber;
    })
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
    // Recupera o item pelo id
    var card = document.getElementById(id);
    var count = card.getElementsByClassName("count-number")[0];
    var countNumber = +count.innerHTML;
    
    if (countNumber > 0) {
        countNumber--;

        // .update: recebe um objeto (e apenas um objeto) e atualiza apenas as props desse objeto
        ref.child(id).update({ curtidas: countNumber }).then(() => {
            count.innerText = countNumber;
        }).catch((err) => {
            console.log("Erro ao descutir", err);
        })
    }
};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {

    // Habilita as mensagem do firebase de forma detalhada
    // firebase.database.enableLogging(function(message) {
    //     console.log("firebase:", message)
    // });

    // Once: retorna os dados lidos de uma url
    // snapshot: Objeto retorna pelo leitura
    // ref.once("value").then(snapshot => {
    //     /// Lista os cards do snapshot
    //     // console.log("snapshot:", snapshot.val());

    //     // Adiciona a lista de cards na tela
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key);
    //     })

    //     // Acessa um NÓ filho
    //     // console.log("child:", snapshot.child("-MDM7TdTG2X6lLCm8jT-").val());

    //     // Verifica se tem valor
    //     // console.log("exists:", snapshot.exists());

    //     // Se existe o filho passado na url
    //     // console.log("hasChild.nome", snapshot.hasChild("-MDM7TdTG2X6lLCm8jT-/nome"));
    //     // console.log("hasChild.comentario", snapshot.hasChild("-MDM7TdTG2X6lLCm8jT-/comentario"));

    //     // Se existe algum finlho no NÓ
    //     // console.log("hasChildren", snapshot.child("-MDM7TdTG2X6lLCm8jT-").hasChildren());

    //     // Número de filho
    //     // console.log("numChildren", snapshot.child("-MDM7TdTG2X6lLCm8jT-").numChildren());

    //     // Chave da snapshot (caminho)
    //     // console.log("snapshot.key:", snapshot.key)
    // });

    // .on(value): Quando houver alguma mudança na url da ref, traz todos os dados novamente
    // ref.on("value", snapshot => {
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key);
    //     });
    // });

    // .on(child_added): Monitora cada item inserido, não recebendo tudo novamente, recupera a adição no nó (filnho imediato)
    // ref.on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val(), snapshot.key);
    // });

    // .on(child_changed): Monitora qualquer alteração no nó filho
    // ref.on("child_changed", (snapshot, uid) => {
    //     console.log(snapshot.key, uid);
    // });

    // .on(child_changed): Monitora quando um nó for escolhido
    // ref.on("child_removed", snapshot => {
    //     console.log("removed", snapshot.key);
    // })

    // Ordenação
    // ** Só é possivel adicionar um método de ordenação por vez

    // .orderByChild(): ordena pela prop filha passado como parametro
    // ref.orderByChild("idade").on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val())
    // })

    // .orderByKey(): ordena pela chave dos values
    // ref.orderByKey().on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val())
    // })

    // Filtros

    // Filtra a partir do parametro passado
    // ref.orderByChild("idade").startAt(35).on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val())
    // });

    // Filtra até o valor do parametro passado
    // ref.orderByChild("idade").endAt(35).on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val())
    // });

    // Filtra qualquer um com o valor igual ao parametro
    // ref.orderByChild("idade").equalTo(35).on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val())
    // });

    // Limites
    // Retorna os primeiros até a quantidade passada por parametro
    // ref.limitToFirst(3).on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val())
    // });

    // Retorna os ultimos até a quantidade passada por parametro
    // ref.limitToLast(3).on("child_added", snapshot => {
    //     adicionaCardATela(snapshot.val())
    // });

    // ref.on("value", snapshot => {
    //     snapshot.forEach(value => {
    //         adicionaCardATela(value.val(), value.key);
    //     });

    //     // Remove os observadores
    //     ref.off("value");
    // });

    // Usando resquet http em vez das config do firebase
    fetch("https://curso-firebase-webapps-b0857.firebaseio.com/card.json")
        .then(res => res.json())
        .then(res => {
            for (var key in res) {
                adicionaCardATela(res[key], key);
            }
        })
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}