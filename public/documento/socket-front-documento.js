import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizaTextoEditor, atualizarInterfaceUsuarios, tratarAutorizacaoSucesso } from "./documento.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt")
  },
});

//Escutando evento de recebimento de payload do backend
/*socket.on("autorizacao_sucesso", (payloadToken) => {
  //Checando se vamos receber o payload com o nome de usuario no front
  //O payload retorna um objeto com 3 chaves: nome do usuario, exp (quanto tempo falta para expirar (em ms)) e iat(quando foi criado)
  //console.log(payloadToken);
  //Ja temos uma função que envia para o servidor o documento em que estamos (selecionar_documento).
  //Iremos enviar o nome do usuario junto. ALteraremos documento.js
})*/
//Enviando nome do usuario para documento.js
socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso);

socket.on("connect_error", (erro) => {
  alert(erro)
  window.location.href = "/login/index.html";
})

/*
function selecionarDocumento(nome) {
  socket.emit("selecionar_documento", nome, (texto) => {
    atualizaTextoEditor(texto);
  });
}*/
//Depois de alterarmos para passar tanto nome do documento quanto nome do usuario, a função fica:
function selecionarDocumento(dadosEntrada) {
  socket.emit("selecionar_documento", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

//Escutando evento com a lista de usuarios na conexao
socket.on("usuarios_no_documento", atualizarInterfaceUsuarios)

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
