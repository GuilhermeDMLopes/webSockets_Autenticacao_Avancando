import {    
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento    
  } from "../db/documentosDb.js";
import { adicionarConexao, obterUsuariosDocumento } from "../utils/conexoesDocumentos.js";

function registrarEventosDocumento(socket, io) {
  //Adaptando o evento para receber objeto com nome do documento e do usuario
    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {
      //Checando se estamos recebendo o nome do usuario
      //console.log(nomeUsuario); 
      //colocando a linha em if documento
      //socket.join(nomeDocumento);
    
        const documento = await encontrarDocumento(nomeDocumento);
    
        if (documento) {
          //Fizemos essa alteração pois só faz sentido colocar um documento em uma sala se ele realmente existir
          socket.join(nomeDocumento);

          //Adicionando uma conexão com o nome de um usuario que entrou em determinado documento
          adicionarConexao({ nomeDocumento, nomeUsuario })

          //Enviando lista atualizada para o frontend
          const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento);

          //Checando se estamos pegando o nome do usuario corretamente
          //console.log(usuariosNoDocumento)

          //Enviar para o frontend todos os usuarios que estão no mesmo documento
          io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);

          devolverTexto(documento.texto);
        }
      });
    
      socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
    
        if (atualizacao.modifiedCount) {
          socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
      });
    
      socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);
    
        if (resultado.deletedCount) {
          io.emit("excluir_documento_sucesso", nome);
        }
    });    
}

export default registrarEventosDocumento;