//importando dotenv no arquivo ponto de partida da aplicação
import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import io from "./servidor.js";

io.on("connection", (socket) => { 
  //Reorganizando na ordem de eventos: 
  registrarEventosCadastro(socket, io)
  //criando registro de evento de login
  registrarEventosLogin(socket, io);
  registrarEventosInicio(socket, io)
  registrarEventosDocumento(socket, io)
});
