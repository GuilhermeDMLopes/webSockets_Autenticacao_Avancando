//Arquivo para lidar com a collection de usuarios no banco

import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

//Função para encontrar usuario
function encontrarUsuario(nome) {
    return usuariosColecao.findOne({ nome });
}

//Função recebe os dados (usuario e senha) para salvar no banco
function cadastrarUsuario({ nome, senha }) {
    //Criando variaveis para criptografia de senha
    const { hashSenha, salSenha } = criaHashESalSenha(senha);

    //Inserindo os dados no banco
    //Depois de feita a criptografia, mudaremos o parametro de "senha" para hashSenha e salSenha 
    return usuariosColecao.insertOne({ nome, hashSenha, salSenha })
}

export { cadastrarUsuario, encontrarUsuario };