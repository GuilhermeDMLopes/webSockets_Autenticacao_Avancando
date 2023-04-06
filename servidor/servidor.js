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
Vamos implementar o cadastro em si, pegando os dados do formulario de login e enviando para o servidor para ele reconhecer quem está logado.

Dentro do diretório login, criaremos um arquivo chamado login.js para realizar essa atividade.

Feita a autenticação iremos enviar a resposta se foi bem sucedida ou não para o frontend (socket-front-login).
Faremos o tratamento caso o usuario nem exista no banco de dados.

Depois de autenticado, vamos redirecionar para a pagina de documentos.

Agora iremos deixar o servidor capaz de identificar posteriormente os usuarios que ja foram autenticados
para eles nao precisarem sempre digitar o login quando quiserem entrar na pagina de documentos (area restrita do sistema que precisa de autenticação)
Para isso, usaremos JWT(JavaScript Web Token).

Dentro da pasta utils iremos criar uma função para criar o JWT
Precisaremos de mais uma dependencia para o projeto

npm install jsonwebtoken@8.5.1

Além disso, usaremos a biblioteca .env para guardar algumas informações do jwt
npm install dotenv@16.0.3

Para trabalhar com servidores em locais diferentes, seguir o link:
https://cursos.alura.com.br/course/websockets-implemente-autenticacao-avance-socket-io/task/119950
*/
