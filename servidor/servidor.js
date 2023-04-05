import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./db/dbConnect.js";

const app = express();
const porta = process.env.porta || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");
app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => console.log(`Servidor escutando na porta ${porta}`));

const io = new Server(servidorHttp);

export default io;

/*
Iremos separar os eventos de socket-back.js criando um novo diretorio chamado registrarEventos

Feito isso, realizaremos o cadastro de novos usuarios adicionando o arquivo cadastro.js em public/cadastro.
Depois de feitas as alterações neste arquivo, vamos renomer todos os arquivos "registrarEventos..." para apenas
o nome do evento que ele esta registrando
ex: registrarEventosCadastro.js para apenas cadastro.js.

Feito isso, vamos linkar os usuarios cadastrados na pagina com o banco de dados. Criaremos o arquivo
usuariosDb.js.

Depois de cadastrado, mostrar um alerta no frontEnd de que o usuario foi cadastrado.
Em seguida, faremos uma validação no banco de dados para não deixar cadastrar usuarios ja cadstrados.

Por último, faremos uma proteção de senhas com criptografia.
Criaremos um diretorio dentro da pasta servidor chamado útils que tera um arquivo para fazer essa criptografia para gente.

Guardar a hash no banco de dados junto com o “sal” é uma técnica que previne contra ataques rainbow table, que tenta descobrir 
senhas comuns a partir de hashes comuns. Como a hash guardada é gerada a partir da senha digitada e do sal criado, até mesmo uma 
senha comum vai gerar uma hash complexa.
*/
