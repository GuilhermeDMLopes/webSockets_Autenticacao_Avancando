//Arquivo para realizar implementação do login
//Arquivo funciona igual cadastro.js do front
import { emitirAutenticarUsuario } from "./socket-front-login.js";

//Pegando ID do formulario de login do html
const form = document.getElementById("form-login")

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = form["input-usuario"].value;
    const senha = form["input-senha"].value;

    //Enviando nome e senha do usuario
    emitirAutenticarUsuario( { nome,senha });
});