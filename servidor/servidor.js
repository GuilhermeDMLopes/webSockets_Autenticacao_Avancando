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
Agora, iremos pegar o token gerado pela branch anterior, enviar para o frontEnd e de alguma forma, guardar 
este dado no navegador. O token servirá como "crachá" de cada usuario.

Começaremos a receber o evento de envio do token em login e socket-front-login.js

Na parte do front-end, criaremos uma pasta chamada útils para criar funções especificas do front

Para checarmos se o cookie foi armazenado no navegador, ao lado da URL localhost na pagina, tem um icone "i" e clicar
em cookies.

Para manipular o cookie no frontend, precisaremos do valor dele (que está criptografado) para uma pagina "restrita" do 
aluradocs, pagina de documento por exemplo, que precisa de login para ser acessada.

Depois dessa implementação pronta, precisamos trabalhar no botão de logout e apagar esse token para o usuario
deslogar

Para entender melhor sobre os Cookies:
https://cursos.alura.com.br/course/websockets-implemente-autenticacao-avance-socket-io/task/119955

Mesmo feito tudo isso, se digitarmos a URL da pagina de documentos diretamente, mesmo que não estejamos logados,
ainda conseguiremos acessar essa aba. Precisaremos restringir essas areas para serem acessadas apenas depois do login.
Para isso iremos em socket-back.js e implementaremos um middleware para realizar essa função.

EM seguida, vamos receber essa informação que o usuario nao esta logado e trata-lo no frontend em socket-front-index.js.

Agora iremos criar um diretorio para as funções middlewares para separar o codigo.

O middleware está funcionando poreḿ ele é executado por todas as paginas, inclusiva a pagina de login, impedindo que nós loggemos.
Para contornar esse problema, utilizaremos o conceito de namespaces para aplicar o middleware em paginas especificas.

Toda a nossa aplicação acontece em um único namespace, iremos criar o namespace /usuarios que tera os proprios clientes, eventos, salas
e middlewares proprios. Então, iremos colocar nosso middlware de autenticação no namespace de usuarios para chamarmos apenas quando for necessario.

O arquivo socket-back.js esta implementando o novo namespace
e em socket-front-index.js, iremos referenciar a autenticação para o namespace /usuarios.

Agora voltamos a conseguir fazer autenticação do login, no entando, os documentos não estão sendo autenticados, precisaremos fazer mais uma 
alteração para pegar os documentos do banco, alteraremos novamente o socket-back.js.

Depois de tudo implementado, tambem precisaremos autenticar a pagina de documentos especificos com o chat. iremos alterar o arquivo
socket-front-documento

*/
