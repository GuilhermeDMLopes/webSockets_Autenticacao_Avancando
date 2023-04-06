//Arquivo responsável por autenticar o usuário no backend
//importando metodos do modulo crypto
import { scryptSync, timingSafeEqual } from "crypto";


function autenticarUsuario(senhaDigitada, usuario) {
    //criar uma hash de teste para poder comparar com a hash guardada no banco de dados
    //Essa hash de teste sera formada através da senha digitada pelo usuario e deve bater com a do banco
    const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64)

    //Transformando o hash em um buffer para conseguirmos fazer a compração
    //Como a senha do banco esta em hex, devemos fazer a comparação em hex
    const hashReal = Buffer.from(usuario.hashSenha, "hex");

    //Fazendo a comparação das duas hashes. AMbas devem ser buffers
    //A função timingSafeEqual realiza a comparação e retorna true ou false
    const autenticado = timingSafeEqual(hashTeste, hashReal);

    return autenticado;
    
}

export default autenticarUsuario