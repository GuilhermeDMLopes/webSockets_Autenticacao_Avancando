//Arquivo para registrar eventos de login recebidos do front

import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
    //recebe os dados do frontend
    //Para checar se os dados do usuario existem no banco e são compatives, trocamos a variavel dados passada por parametro por nome e senha
    socket.on("autenticar_usuario", async ({ nome, senha }) => {
        //Checar se estamos recebendo os dados corretamente do front
        //console.log(dados)
        //Variavel que vai guardar informação se ele encontrar usuario em usuariosDb
        const usuario = await encontrarUsuario(nome)

        //Checar se ele encontrou usuario
        //console.log(usuario);

        //Checando se o usuario realmente existe no banco
        if(usuario) {
            //Autenticando senha do usuario. Arquivo em utils do backend
            const autenticado = autenticarUsuario(senha, usuario)
            //verificando resposta de autenticação
            //console.log(autenticado)
    
            //Enviando para o frontEnd a resposta de autenticação
            if(autenticado) {
                //Criando JWT passando como paremtro algo que diferencie um usuario de outro (payload)
                //No caso usaremos o nome do usuario como payload
                //O payload deve obrigatoriamente ser um Objeto.
                //Criamos um objeto que tem um campo nomeUsuario com valor "nome" do usuario autenticado
                const tokenJwt = gerarJwt({ nomeUsuario: nome })

                //Mostrando o retorno do token
                //console.log(tokenJwt)

                //Enviando o tokenJwt para o frontend
                socket.emit("autenticacao_sucesso", tokenJwt)
            } else {
                socket.emit("autenticacao_erro")
            }
        } else {
            //Envia um evento para o front que o usuario nao foi encontrado
            socket.emit("usuario_nao_encontrado")
        }

    })
}

export default registrarEventosLogin;