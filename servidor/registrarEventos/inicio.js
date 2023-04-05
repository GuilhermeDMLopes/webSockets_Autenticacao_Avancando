//Arquivo para exportar os eventos de obter_documentos, adicionar_documentos

//Fazendo as importações
import {
    adicionarDocumento,   
    encontrarDocumento,    
    obterDocumentos
  } from "../db/documentosDb.js";

//Precisa receber o socket e o io como parametro
function registrarEventosInicio (socket, io) {
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();
    
        devolverDocumentos(documentos);
      });
    
      socket.on("adicionar_documento", async (nome) => {
        const documentoExiste = (await encontrarDocumento(nome)) !== null;
    
        if (documentoExiste) {
          socket.emit("documento_existente", nome);
        } else {
          const resultado = await adicionarDocumento(nome);
    
          if (resultado.acknowledged) {
            io.emit("adicionar_documento_interface", nome);
          }
        }
    });
}

export default registrarEventosInicio;