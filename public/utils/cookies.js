//Arquivo responsavel por criar/manipular cookie para armazenar o JWT

function definirCookie(chave, valor) {
    //Armazenando cookie no navegador
    document.cookie = `${chave}=${valor};path=/`;
}

//Função responsavel por pegar o valor do cookie
function obterCookie(chave) {
    /*
    Essa função vai pegar o cookie, separar a chave e valor,
    encontrar dentre os cookies do navegador, o cookie com a 
    chave passada por parametro. Em seguida pega o valor deste cookie
    encontrado
    */
    return document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${chave}=`))
        ?.split("=")[1];
}

//FUnção responsável por limpar o cookie quando usuario deslogar
function removerCookie(chave) {
    //Codigo especifico do frontend que vai pegar o cookie passado por parametro
    //Expirando o cookie colocando uma data de expiração mais antiga possivel e isso o removerá do navegador
    document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00`;
}

export { definirCookie, obterCookie, removerCookie };