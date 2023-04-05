//Arquivo para fazer criptografia da senha

//importando modulo cripto do JS
import { randomBytes, scryptSync } from "crypto";

//Recebe a senha digitada como parametro
function criaHashESalSenha(senhaDigitada) {
    //Criar sal da senha com 16 bytes aleatórios e converter em string hexadecimal para salvar no BD
    //Sal é uma sequencia de caracteres gerada pelo Node
    const salSenha = randomBytes(16).toString("hex");

    //Criando hash com o sal e senha e o tamanho da hash e transformando em hexadecimal
    const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString("hex");

    return { salSenha, hashSenha }
}

export default criaHashESalSenha;