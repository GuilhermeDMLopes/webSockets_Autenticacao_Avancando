const conexoesDocumentos = []

//Verifica se ja existe uma conexão
function encontrarConexao(nomeDocumento, nomeUsuario) {
    //Encontrando conexao
    return conexoesDocumentos.find((conexao) => {
        //se o item da lista tiver o mesmo nome de documento e o mesmo nome de usuario, quer dizer que existe uma conexão
        return conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario;
    });
}

function adicionarConexao(conexao) {
    conexoesDocumentos.push(conexao)
}

function obterUsuariosDocumento(nomeDocumento) {
    return conexoesDocumentos
        .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
        .map((conexao) => conexao.nomeUsuario);
}

//Criando função para remover conexão
function removerConexao(nomeDocumento, nomeUsuario) {
    //pegando o indice do elemento que quero remover
    //callback recebe cada uma das conexoes como parametro
    const indice = conexoesDocumentos.findIndex((conexao) => {
        //se o item da lista tiver o mesmo nome de documento e o mesmo nome de usuario, ele encontra o index do item
        return conexao.nomeDocumento === nomeDocumento && conexao.nomeUsuario === nomeUsuario;
    });

    //Se ele encontrar o indice
    if (indice !== -1) {
        //Pega o indice do elemento que quero remover e a quantidade de elementos que quero remover
        conexoesDocumentos.splice(indice, 1)
    }

    //Verificando se remoção esta funcionando
    console.log(conexoesDocumentos);
}

export { encontrarConexao, adicionarConexao, obterUsuariosDocumento, removerConexao };