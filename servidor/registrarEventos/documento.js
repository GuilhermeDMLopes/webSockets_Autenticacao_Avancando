import {    
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento    
  } from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosDocumento, removerConexao } from "../utils/conexoesDocumentos.js";

function registrarEventosDocumento(socket, io) {
    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {
    
        const documento = await encontrarDocumento(nomeDocumento);
    
        if (documento) {

          //Variavel para checar se ja existe um conexão
          //Iremos passar o nome do documento e do usuario para verificar se conexão existe
          const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);

          //Se não encontrar uma conexão
          if (!conexaoEncontrada) {
            socket.join(nomeDocumento);
  
            adicionarConexao({ nomeDocumento, nomeUsuario })

            //Salvando dados no socket
            socket.data = {
              //chave com qualquer nome e o valor TRUE
              usuarioEntrou: true
            };
  
            const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento);
  
            io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
  
            devolverTexto(documento.texto);
          } else {
            //Emitindo evento que ja existe uma conexão
            socket.emit("usuario_ja_no_documento")
          }

        }

        //Escutando os eventos texto_editor e excluir documento apenas para quando o usuario selecionar um documento.
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

        //Colocando o disconnect aqui, vamos escutar a desconexão apenas para clientes específicos.
        //Mais especificamente os clientes que entraram em uma página de um documento
        socket.on("disconnect", () => {
          //Verifica se tem algum dado de usuarioEntrou antes de desconectar
          //Agora só sera feita a desconexão se o usuario realmente entrar
          //O mesmo usuario em abas diferentes não consegue acessar o mesmo documento. Com isso, ele não sera desconectado das 2
          if (socket.data.usuarioEntrou) {
            //verificando desconexão
            //console.log(`Cliente ${socket.id} desconectado`)
  
            //Criando função para enviar para o front passando o nome do documento e o nome do usuario por parametro
            removerConexao(nomeDocumento, nomeUsuario);
  
            //Enviando dados de remoção de usuario para o front
            const usuariosNoDocumento = obterUsuariosDocumento(nomeDocumento);
  
            io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
          } 
        })
      });

      //Para realizar desconexão apenas ao sair da pagina de documento, vamos subir o codigo para o trecho acima
      //Escutando evendo de desconexão
      /*socket.on("disconnect", () => {
        //verificando desconexão
        console.log(`Cliente ${socket.id} desconectado`)
      })*/
    

      //Esses dois ouvintes também podem ser escutados apenas quando selecionar documento
      //Iremos subi-los para o trecho de selecionar_documentos
      /*
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
    */    
}

export default registrarEventosDocumento;