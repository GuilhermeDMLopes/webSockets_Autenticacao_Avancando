//Arquivo para registrar evento de cadastro de usuarios

import { cadastrarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
    //Recebendo evento de cadastrar_usuario
    socket.on("cadastrar_usuario", async (dados) => {
        //Criando variavel para checar se o usuario ja existe pelo nome
        const usuario = await encontrarUsuario(dados.nome);

        //Refatorando para cadastrar apenas se ele não tiver sido encontrado
        if(usuario === null) {            
            //Vamos receber os dados e mostrar na tela para ver se estamos recebendo no servidor
            //console.log(dados);
            //Depois de testado, faremos uma função que irá se conectar com o banco de dados e realizar o cadastro em si
            const resultado = await cadastrarUsuario(dados)
            //Mostrando o usuario cadastrado no banco no terminal
            //console.log(resultado)
    
            //Vamos enviar a informação que o usuario foi cadastrado para o frontEnd
            if(resultado.acknowledged) {
                //emitir que o cadastro foi sucesso
                socket.emit("cadastro_sucesso")
            } else {
                socket.emit("cadastro_erro");
            }
        } else {
            //console.log("Usuario ja existe")
            //Enviando para o frontEnd que o usuario ja existe
            socket.emit("usuario_ja_existe");
        }
        
    })
}

export default registrarEventosCadastro;