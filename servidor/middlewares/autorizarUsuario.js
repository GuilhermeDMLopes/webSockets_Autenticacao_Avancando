import jwt from "jsonwebtoken";

function autorizarUsuario(socket, next) {
    const tokenJwt = socket.handshake.auth.token;

    try {
        //Vamos pegar o payload de retorno da função verify  e mandar para o frontend
        const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT)

        //emitindo payload para front. Lembrando que o payload é um objeto com nome do usuario
        //Essa função é executada para toda pagina restrita, ela sera executada para quem estiver entrando
        //em uma pagina de documento específico
        socket.emit("autorizacao_sucesso", payloadToken)
        next()
    } catch (erro) {
        next(erro);
    }
    
}

export default autorizarUsuario;