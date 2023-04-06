import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

//Iremos fazer a autenticação das paginas de documento com o namespace /usuarios
const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt")
  },
});
//Mesma função de socket-front-index. Tratar o erro de conexão
socket.on("connect_error", (erro) => {
  //Enviando mensagem de que o usuario não esta logado
  alert(erro)
  //Mudando para pagina de login
  window.location.href = "/login/index.html";
})

function selecionarDocumento(nome) {
  socket.emit("selecionar_documento", nome, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
