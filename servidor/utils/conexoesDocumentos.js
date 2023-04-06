//Arquivo para salvar os usuarios em uma lista
//Serão uma lista d eobjetos com nome de usuario e nome documento
//Ex: Essa conexão se refere a este usuario que entrou neste documento
//UM usuario pode entrar em varios documentos diferentes e cada documento que esse
//usuario entra, terá uma conexão diferente também.

const conexoesDocumentos = []

//função para adicionar uma conexão na lista
function adicionarConexao(conexao) {
    //adicionando na lista
    conexoesDocumentos.push(conexao)

    //Checando se a lista esta sendo preenchida corretamente
    //console.log(conexoesDocumentos)

}

//Pegando os usurios da lista em um determinado documento
function obterUsuariosDocumento(nomeDocumento) {
    //Retorna a lista filtrada pelo documento recebido por parametro e pegando o nome do usuario
    return conexoesDocumentos
        .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
        .map((conexao) => conexao.nomeUsuario);
}

export { adicionarConexao, obterUsuariosDocumento };