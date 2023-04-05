//Arquivo com função para emitir evento para o backend

//Para ter isso, precisamos usar o script no arquivo index.html <script src="/socket.io/socket.io.js"></script>
const socket = io();

function emitirCadastrarUsuario(dados) {
    //Emitindo evento com nome cadastrar_usuario
    socket.emit("cadastrar_usuario", dados)
}

//Escutando a resposta de cadastro do backend. Se foi sucesso ou falha
//Envia um alerta na tela
socket.on("cadastro_sucesso", () => alert("Cadastro realizado com sucesso!"));
socket.on("cadastro_erro", () => alert("Erro no cadastro!"));
socket.on("usuario_ja_existe", () => alert("Usuario já cadastrado!"));

export { emitirCadastrarUsuario };