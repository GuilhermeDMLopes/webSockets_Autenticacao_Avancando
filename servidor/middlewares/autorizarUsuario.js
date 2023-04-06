//Arquivo responsavel por fazer o middleware de autorizar paginas restritas apenas para usuarios logados
//importando biblioteca jwt
import jwt from "jsonwebtoken";

//Gerando um middleware intermediador para verificar se o cliente tem autorização
//para acessar as paginas restritas do AluraDocs. Verifica se o cliente tem autorização para acessar o servidor
//Recebe um socket por parametro e a função next dos middlewares
function autorizarUsuario(socket, next) {
    //Recebendo autenticação do frontend pelo parametro de io em socket-front-index
    //handshake é o termo tecnico para uma conexão estabelecimente cliente-servidor
    //a partir dele temos acesso ao auth do socket enviado do front
    const tokenJwt = socket.handshake.auth.token;

    //Checando se estamos conseguindo receber a autenticação do front
    //console.log(tokenJwt);

    //Verificando se o token recebido é valido
    try {
        //Ele checa se o token recebido é valido e retorna um erro caso não.
        jwt.verify(tokenJwt, process.env.SEGREDO_JWT)
        next()
    } catch (erro) {
        next(erro);
    }
    
}

export default autorizarUsuario;