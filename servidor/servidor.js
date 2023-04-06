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
Iremos agora mostrar qual usuário está conectado na página de cada documento

Para fazer isso, precisaremos fazer algumas alterações no middleware de autorizarUsuario.js.

Feita a alteração, iremos receber o payload em socket-front-documento.

Agora ja estamos recebendo o nome do usuario no servidor que está conectado na pagina de documento.
Vamos manter um registro de qual usuario acessou tal documento. Criaremos uma lista local do node em documento.js
para o frontend consumir e apresentar na tela. Iremos criar dentro do diretorio utils no servidor o arquivo
conexoesDocumentos.js.

Criamos uma lista para receber as conexoes de cada documento com o nome de cada usuario que está nele.
Agora faremos a atualização dos usuarios conectados no frontend em socket-front-documento.js.

Depois de implementado a lista de usuarios conectados na mesma conexão, precisaremos corrigir um problema.
Por enquanto estamos controloando apenas a entrada de usuarios. Porém, se eu sair e voltar para o documento,
meu usuario aparecerá 2x. Sera feita essa implementação na branch seguinte.
*/
