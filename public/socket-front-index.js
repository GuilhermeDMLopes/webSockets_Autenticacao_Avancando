import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

//O middleware é executado antes das conexões de socket do cliente e servidor, por isso não podemos usar socket.emit
//Para isso, devemos enviar pro backend por parametro em io com algumas opções adicionais
//o primeiro parametro é referente ao namespace em que ele sera utilizado
const socket = io("/usuarios", {
  //propriedade prevista pelo socket.io
  auth: {
    //escolhemos nome token para nossa chave e o valor vem da função obterCookie
    token: obterCookie("tokenJwt"),
  },
});

//Recebendo evento do middleware de que o usuario não esta logado
//connect_error é um evento interno do socket.io de quando executamos a função next passando algum erro
socket.on("connect_error", (erro) => {
  //Enviando mensagem de que o usuario não esta logado
  alert(erro)
  //Mudando para pagina de login
  window.location.href = "/login/index.html";
})

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

socket.on("adicionar_documento_interface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
