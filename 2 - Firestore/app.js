/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];

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

    // .colletion: referencia a coleção
    // .doc: referencia o documento
    // .set: insere o objeto passado por parametro na referencia
    // firebase.firestore().collection("cards").doc("1").set(card)
    // .then(() => {
    //     console.log("Dados salvos");
    //     adicionaCardATela(card, 1);
    // });

    firebase.firestore().collection("cards").add(card).then(() => {
        console.log("Dados salvos");
        adicionaCardATela(card, 1);
    });

    // Gravações em lote

    // Para gravar em lote, é necessário cria um batch, que serve para armazenar as informações que vão ser executadas
    // Pode-se na operações de set, update e delete
    // Para criar uma operação do set, preciso da referencia dos documento e os dados que deseja inserir
    // Ao criar todos os métodos é necessário executar o método .commit para executar todas as operações
    // Com bath, ou são gravados todas as operações ou nenhuma é gravada
    // var batch = firebase.firestore().batch();

    // var cards = [];

    // for (var i = 0; i < 3; i++) {
    //     let doc = {
    //         nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
    //         idade: Math.floor(Math.random() * 22 + 18),
    //         curtidas: 0
    //     }

    //     cards.push(doc);

    //     let ref = firebase.firestore().collection('cards').doc(String(i));

    //     batch.set(ref, doc);
    // }

    // batch.commit(() => {
    //     for (var i = 0; i < cards.length; i++) {
    //         adicionaCardATela(cards[i], i);
    //     }
    // })
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    // Recupera o item pelo id
    var card = document.getElementById(id);

    // Deleta o documento da coleção, pode ser usado apenas em documentos
    firebase.firestore().collection('cards').doc(id).delete().then(() => {
        card.remove();
    });

    // Para remover uma propriedade do documento podemos dar um update e passamos o objeto método de .delete vindo do firebase.firestore.FieldValue.delete()
    // firebase.firestore().collection('cards').doc(id).update({curtidas: firebase.firestore.FieldValue.delete()}).then(() => {
    //     console.log("Removido curtidas")
    // })
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName("count-number")[0];
    var countNumber = +count.innerHTML;
    countNumber++;

    // Atualiza todos os dados passado no parametro
    // Pode ser usado apenas em docs
    firebase.firestore().collection("cards").doc(id).update({ curtidas: countNumber }).then(() => {
        count.innerText = countNumber;
    })
};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
    var card = document.getElementById(id);
    var count = card.getElementsByClassName("count-number")[0];
    var countNumber = +count.innerHTML;

    if (countNumber > 0) {
        countNumber--;

        firebase.firestore().collection("cards").doc(id).update({ curtidas: countNumber }).then(() => {
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

    // // Busca o resulto apenas uma vez
    firebase.firestore().collection("cards").get().then(snapshot => {
        //     // Documentos dentro da minha coleção, retorna uma obejto e devese utilizar o foreach
        //     // snapshot.docs()

        //     // Prop que retorna um boleano se o snapshop estiver vazio
        //     // snapshot.empty()

        //     // São os metadatas da coleção
        //     // snapshot.metadata()

        //     // Retorna a query urilizada no filto para esse get
        //     // snapshot.query()

        //     // Numero de documentos dentro da coleção
        //     // snapshot.size()

        //     // Retorna um array com as mudanças que essa coleção sofreu desde a ultima leitura
        //     // snapshot.docChange()

        snapshot.docs.forEach(card => {
            //         // Retorna os dados do documento
            //         // card.data()

            //         // Retorna o UID do seu documento
            //         // card.data()

            //         // Retorna um boleano caso o documento passado seja igual ao documento utilizado (serve para docs e colletions)
            //         // card.isEqual(doc)

            adicionaCardATela(card.data(), card.id);
        });
    });

    // // .on: observadno em tempo real
    // firebase.firestore().collection('cards').onSnapshot(snapshot => {
    //     // Usar dessa forma é equivalente ao .on("value") do realtemi database
    //     // snapshot.docs.forEach();

    //     // Tras todos os dados com o evento de added na primeira chamada
    //     // E depois traz os documentos que sofreram alterações
    //     snapshot.docChanges().forEach(card => {
    //         if (card.type == 'added')
    //             adicionaCardATela(card.doc.data(), card.doc.id);

    //         if (card.type == 'modified')
    //             console.log("Modificado")

    //         if (card.type == 'removed')
    //             console.log("Modificado")
    //     })
    // })

    // Filtros

    // Retorna dados que obedecerem a condição passada
    // Não aceita || ou && e nem !=
    // firebase.firestore().collection('cards').where('idade', '>', 30).get().then(snapshot => {
    //     snapshot.docs.forEach(card => {
    //         adicionaCardATela(card.data(), card.id);
    //     });
    // });

    // firebase.firestore().collection('cards').where('idade', '>', 30).where('idade', '<', 40).get().then(snapshot => {
    //     snapshot.docs.forEach(card => {
    //         adicionaCardATela(card.data(), card.id);
    //     });
    // });

    // Ordenação "asc" ou "desc"

    // Order palo campo e pelo tipo de ordenação passados,  tipo não obrigatório
    // Ao usar junto com o whete deve usar no mesmo campo
    // firebase.firestore().collection('cards').where('curtidas', '>', 0).orderBy("curtidas", 'desc').get().then(snapshot => {
    //     snapshot.docs.forEach(card => {
    //         adicionaCardATela(card.data(), card.id);
    //     });
    // });

    // Limites

    // Retorna a quantidade de item passados no parametro
    // firebase.firestore().collection('cards').limit(3).get().then(snapshot => {
    //     snapshot.docs.forEach(card => {
    //         adicionaCardATela(card.data(), card.id);
    //     });
    // });

    // Cursores / Filtros
    // startAt: começa a filtrar no valor passado, funciona como o operador >=
    // startAfter: ||, funciona como o operador >
    // endBefore: funciona como o operador de <
    // endAt: funcionario como o operador de <=
    // Os cursores aceitam alem de valor, um documento para começar o filtro

    var startAt;

    firebase.firestore().collection('cards').limit(3).get().then(snapshot => {
        startAt = snapshot.docs[snapshot.docs.length - 1];

        firebase.firestore().collection('cards').startAt(startAt).get().then(snapshot => {
            snapshot.docs.forEach(card => {
                adicionaCardATela(card.data(), card.id);
            });
        });
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