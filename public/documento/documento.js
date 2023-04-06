import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
//Pegando lista de usuarios
const listaUsuariosConectados = document.getElementById("usuarios-conectados");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

//Função para tratar a autorização recebida de socket-front-documento.js
function tratarAutorizacaoSucesso(payloadToken) {
  //Enviar nome do documento junto com o nome do usuario
  selecionarDocumento({nomeDocumento, nomeUsuario: payloadToken.nomeUsuario});
}

//Subindo para função acima
//selecionarDocumento(nomeDocumento);

//Função para atualizar front com os usuarios conectados
function atualizarInterfaceUsuarios(usuariosNoDocumento) {
  //Vamos manipular o html e pegar a lista dos usuarios
  //Estamos passando vazio para não aparecer nada quando nao tiver nenhum usuario conectado
  listaUsuariosConectados.innerHTML = "";

  //Para cada usuario no documento listar ele no front
  usuariosNoDocumento.forEach((usuario) => {
    listaUsuariosConectados.innerHTML += `
      <li class="list-group-item">${usuario}</li>
    `;
  });   
  
}

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluído!`);
    window.location.href = "/";
  }
}

//Exportando função tratarAutorizacaoSucesso e atualizarInterfaceUsuarios
export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios };
