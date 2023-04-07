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
Iremos agora tratar as saidas do usuario. Nossa aplicação deve reconhecer quando um usuario
sair da tela de documentos. Iremos realizar alterações em documento.js no backend

Agora que conseguimos ver a mensagem de desconexão, vamos criar uma função para desconectar e enviar para
o front. Sera feito em conexoesDocumentos.js.

Depois de enviar para o front, ele ja estava preparado para atualizar com a remoção.

NO entando, estamos com um pequeno problema. Quando o mesmo usuario esta em 2 abas, aparece 2x e deveria aparecer apenas
uma por se tratar do mesmo. Iremos limitar que um usuario tenha acesso apenas a uma aba para não gerar conflitos.

Em documentos.js, podemos verificar se a conexão ja existe naquele documento em específico. vamos criar a função em conexaoDocumentos.js.

Vamos enviar que ja existe uma conexão, para o front. Sera escutado em socket-front-documentos.js.

Ao implementar essa funcionalidade, o mesmo usuario não consegue acessar o mesmo documento em abas diferentes.
Porém, na aba em que ele estava conectado, os 2 usuarios iguais são removidos, não aparecendo ninguém conectado
mesmo o usuario estando na pagina.

Para corrigir o problema, iremos utilizar uma função do socket.io para salvar dados no proprio socket.
Em documento.js.

Outra forma de realizar uma desconexão:

https://cursos.alura.com.br/course/websockets-implemente-autenticacao-avance-socket-io/task/119969


*/

