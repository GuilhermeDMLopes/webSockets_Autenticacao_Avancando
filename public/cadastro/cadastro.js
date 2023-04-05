//Arquivo para trabalharmos a parte de cadastro de novos usuarios

import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

//Pegando o elemento de id "form-cadastro" de index.html
const form = document.getElementById("form-cadastro")

//Adicionando um evento de submit no frontend.
//Quando uma pessoa submeter um formulario no FrontENd, poderemos executar uma função callback
//que sera colocada no segundo parametro
form.addEventListener("submit", (evento) => {
    //Evita atualização da pagina
    evento.preventDefault();

    //Pegando dados no campo de login e senha. Pegaremos o id dos inputs de usuario e senha
    //Pegando o valor de input-usuario que é uma propriedade do objeto form
    const nome = form["input-usuario"].value;
    const senha = form["input-senha"].value;

    //Para testar se está sendo pego mesmo
    //console.log(nome, senha)

    //Emitindo dados para backend (nome do usuario e senha)
    emitirCadastrarUsuario( { nome,senha });
});