import { emitirAdicionarDocumento } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";

//Armazenando token jwt para as paginas restritas do aluradocs
//Obter cookie tem uma chave passada por parametro
const tokenJwt = obterCookie("tokenJwt")

//Checando se a função está funcionando
console.log(tokenJwt)

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");
//Fazendo a função de logout:
//pegando id do html do botao de logout
const botaoLogout = document.getElementById("botao-logout");

//Criando função a ser executada ao clicar no botao de logout
botaoLogout.addEventListener("click", () => {
  //Removendo o cookie do usuario, passando o nome do cookie por parametro
  removerCookie("tokenJwt")
  //Criando alert para mostrar que foi deslogado e cookie apagado
  alert("Usuario deslogado com sucesso")
  //Voltando para a pagina de login depois de deslogar
  window.location.href = "/login/index.html"
})

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  emitirAdicionarDocumento(inputDocumento.value);
  inputDocumento.value = "";
});

function inserirLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `
    <a
      href="/documento/index.html?nome=${nomeDocumento}"
      class="list-group-item list-group-item-action"
      id="documento-${nomeDocumento}"
    >
      ${nomeDocumento}
    </a>
  `;
}

function removerLinkDocumento(nomeDocumento) {
  const documento = document.getElementById(`documento-${nomeDocumento}`);

  listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };