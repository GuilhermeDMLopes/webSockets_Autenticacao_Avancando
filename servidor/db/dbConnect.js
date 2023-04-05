import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://alura:alura123@alura.r4glodr.mongodb.net/?retryWrites=true&w=majority"
);

//Adicionando variavel para pegar a collection de usuarios
let documentosColecao, usuariosColecao;

try {
  await cliente.connect();

  const db = cliente.db("alura-websockets");
  documentosColecao = db.collection("documentos");
  //adicionando coleção de usuarios
  usuariosColecao = db.collection("usuarios");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

//Exportando variavel com coleção de usuarios
export { documentosColecao, usuariosColecao };
