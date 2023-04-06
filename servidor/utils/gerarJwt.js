//Arquivo responsável por criar um JWT para o usuario
//Biblioteca que implementa o jwt
import jwt from "jsonwebtoken"

function gerarJwt(payload) {
    //Gerando um novo token. Recebe o payload e o segredo para maior segurança e configurações para o token como parametro
    //O Segredo que também gera o JWT é um conteúdo sensível. Portanto devemos guardalo no .env
    //Substituiremos o "segredosupersecreto" pela variavel do .env.
    const tokenJwt = jwt.sign(payload, process.env.SEGREDO_JWT, {
        //Token expira em 1 hora ("1h") ou 2 dias ("2 days")
        expiresIn: "1h",
    });

    return tokenJwt
}

export default gerarJwt;