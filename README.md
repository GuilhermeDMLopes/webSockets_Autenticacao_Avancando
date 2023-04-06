# webSockets_Autenticacao_Avancando

## Projeto baseado no repositório webSockets_NodeJS_Mongo. Houveram refatorações: Foram criadas pastas, separando os arquivos HTML de cadastro, documento e login. NO diretório documento, o arquivo index.html substitui o arquivo documento.html e todos os arquivo de documentos no mesmo diretorio. Cada diretorio segue o mesmo modelo. Dentro da pasta servidor (substitui src), foi criado o diretório db referente aos arquivos de banco.

## Separado em branches:

- cadastrandoUsuarios: refatoração do código, separando cada evento (adicionar_documento, selecionar_documento, excluir_documento, obter_documentos) dentro do diretório registrarEventos. Em seguida vamos realizar os cadastro de usuarios. Vamos linkar os usuarios cadastrados no banco de dados. Evitar o cadastro de usuario existentes pelo nome e por fim proteger as senhas com criptografia.

- implementandoLogin: pegando os dados do formulario de login e enviando para o servidor, fazemos validação se o usuario existe ou não no banco e criamos um JWT para autenticar o usuario e ele não precisar digitar seu login toda vez que quiser acessar a pagina de documentos. Para linkar frontend e backend em portas/locais diferentes, seguir link: https://cursos.alura.com.br/course/websockets-implemente-autenticacao-avance-socket-io/task/119950

