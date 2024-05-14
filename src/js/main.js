// https://github.com/meetDeveloper/freeDictionaryAPI?tab=readme-ov-file
import { getWord } from "./getWord.js";
import { treat } from "./renderizarDados.js";
const input = document.getElementById("input");

// Palavra é digitada, é buscada no API e então pega suas definições, ve se é possivel traduzir e manda de volta;

async function getPalavra (word){
    const dados = await getWord(word); // Retorna a palavra
    if (!dados) return; // Erro de encontrar a palavra? Retorna undefined para essa salvaguarda
    treat(dados); // Joga no tratamento e renderização
}

// AO apertar enter, puxa as função que buscam a palavra
input.addEventListener("keypress", function(e){
    if (e.key === "Enter"){
        if (!input.value) return // Não aceita valor vazio
        getPalavra(input.value) // Joga para está função para tratar
    }
})

function clean (){
    document.querySelector(".content").textContent = "";
    input.value = ""
}
document.getElementById("clean").addEventListener("click", clean);