//Arquivo para tratar os eventos de login

const socket = io();

//Função para enviar o evento de autenticação de usuario para o servidor
function emitirAutenticarUsuario(dados) {
    //Emitindo evento
    socket.emit("autenticar_usuario", dados);
}

//Escutando a resposta de autenticação do backend e enviando mensagem de sucesso, falha ou usuario nao encontrado
socket.on("autenticacao_sucesso", () => {
    alert("Usuario autenticado com sucesso!")
    //redirecionando para a pagina de documentos depois de autenticado
    //Como nossa pagina de documentos esta na rota "/", iremos redirecionar para la
    window.location.href = "/";
})
socket.on("autenticacao_erro", () => alert("Falha na autenticação!"))
socket.on("usuario_nao_encontrado", () => alert("Usuario não encontrado!"))


export { emitirAutenticarUsuario };