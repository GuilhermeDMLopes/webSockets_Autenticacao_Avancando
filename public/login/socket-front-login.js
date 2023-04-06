import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitirAutenticarUsuario(dados) {
    socket.emit("autenticar_usuario", dados);
}

//Escutaremos o evento recebendo o JWT e passaremos como parametro na função
socket.on("autenticacao_sucesso", (tokenJwt) => {
    //Vamos definir um cookie para guardar o token
    //Existem algumas formas de guardar dados no front, localstorage, recessionstorage, cookies, etc
    //As formas mais seguras de armazenar dados no front são utilizando frameworks e ferramentas mais avançadas
    //Criando uma função para definir cookie passando uma chave e um valor como parametro
    definirCookie("tokenJwt", tokenJwt);


    alert("Usuario autenticado com sucesso!")
    window.location.href = "/";
})
socket.on("autenticacao_erro", () => alert("Falha na autenticação!"))
socket.on("usuario_nao_encontrado", () => alert("Usuario não encontrado!"))


export { emitirAutenticarUsuario };