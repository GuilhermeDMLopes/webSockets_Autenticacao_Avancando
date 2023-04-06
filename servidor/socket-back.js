//importando dotenv no arquivo ponto de partida da aplicação
import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

/*IREMOS CRIAR UMA DIRETORIO DE MIDDLEWARES PARA SEPARAR O CODIGO E ESTE TRECHO SERA TRANSFERIDO PARA autorizarUsuario
//Gerando um middleware intermediador para verificar se o cliente tem autorização
//para acessar as paginas restritas do AluraDocs. Verifica se o cliente tem autorização para acessar o servidor
//Recebe um socket por parametro e a função next dos middlewares
io.use((socket, next) => {
  //Passando next sem nenhum parametro, qualquer pessoa tera acesso ao servidor
  //Precisamos passar um erro de que o usuario nao esta logado
  next(new Error("Usuário não logado"))
})*/

//Criando variavel que vai salvar a referencia de namespace usada
const nspUsuarios = io.of("/usuarios");

/*o io.of é referente ao namespace que estamos usando. Se não colocarmos nada,
como é o caso do io.on posterior, o io entende como: io.of("/").on...
o namespace "/" é o padrão. Colocando o io.of("/usuarios") estaremos referenciando que
o middleware sera executado no namespace "/usuarios". Com isso, toda vez que quisermos autenticar
precisaremos colocar o .of("/usuarios")
*/
//io.of("/usuarios").use(autorizarUsuario);
//Depois de criar a variavel de referencia, iremos substituir o trecho io.of("/usuarios") por:
nspUsuarios.use(autorizarUsuario);

//Registrando os eventos no namespace de usuarios.
//Quando conectar com o namespace /usuarios, usaremos a mesma função abaixo para usar
//os eventos de inicio e documento.
/*io.of("/usuarios").on("connection", (socket) => {  
  //precisaremos passar uma referencia do namespace de usuarios nos parametros dos eventos
  registrarEventosInicio(socket, io)
  registrarEventosDocumento(socket, io)
})*/
//Depois de criar a variavel de referencia, iremos substituir o trecho io.of("/usuarios") por:
nspUsuarios.on("connection", (socket) => {  
  //precisaremos passar uma referencia do namespace de usuarios nos parametros dos eventos
  registrarEventosInicio(socket, nspUsuarios)
  registrarEventosDocumento(socket, nspUsuarios)
})

io.on("connection", (socket) => { 
  //Reorganizando na ordem de eventos: 
  registrarEventosCadastro(socket, io)
  //criando registro de evento de login
  registrarEventosLogin(socket, io);
  registrarEventosInicio(socket, io)
  registrarEventosDocumento(socket, io)
});
