import { translate } from "./translateDef.js";
const content = document.querySelector(".content");


// Para gerar definições
async function defs(dado) {
  let definitions;
  // Faz map dos elementos e retorna como uma array nova de elementos HTML
  return (definitions = dado.map( async(item) => {
    // Resolve a promessa do translate e colocar em uma array
    return `<p class="itens"> ➡️ ${await translate(item.definition)} </p>`;
  }));
  
}

// Gera elementos de fonte
const gerarFontes = (data) => {
  return data.fonte.map((link) => {
    // Faz map dos elementos e retorna como uma array nova de elementos HTML
    return `<a href="${link}">${link}</a>`;
  });
};

// Pega a URL do audio e toca ao clicar no botão
const playSound = (url) => {
  let falar = new Audio(url);
  falar.play();
};


//// Principal
export async function treat(data) {

  // Criando o elemento HTML com informações de definições, fontes e sinonimos
  // Ja que as palvras podem ter mais do que verbo e substantivivos, aqui está um map que roda pela array de objetos e monta elementos html para uso
  // Então, faz de todos os tipos de palavras. Só usar então está variavel
  const significados = data.significados.map(async (item) => {
    const teste = Promise.all(await defs(item.definitions)); // Transformas os resultados em uma só array promessa. Depois, usa await nesta promessa retornada para a descompactar
    return (`
        <p class="type">${
          item.partOfSpeech[0].toUpperCase() + item.partOfSpeech.slice(1)
        }</p>
          ${(await teste).join("\n")}
            <p class="sinonimos"> <span class="sin"> Sinonimos : </span> ${[
              ...item.synonyms
            ].join(" | ")} </p>
              <p class="fontes"> Fontes: ${gerarFontes(data).join(" -- ")}</p>
      `)
  });

  // ? para checar se exite tal valor no objeto no momento. Já que alguns retornam arrays de elementos, eles não precisam estar dentro de um outro elemento HTML
  // \n faz pular linha com o join

  const significadosTrad = Promise.all(significados); // Transformas os resultados em uma só array promessa. Depois, usa await nesta promessa retornada para a descompactar
  
  // Elemento HTML com os outros elementos e a array de significados
  const html = `
    <div class="resposta">
      <h1 class="palavra">${data.palavra.toUpperCase()} </h1> <span type="button" id="audioBtn+${data.palavra}">${
          data.comoFalar
            ? `<button type="button" id="audioBtn+${data.palavra}" class="btnAudio">🔊</button>`
            : ""
        } </span>
        
      ${(await significadosTrad).join("\n")}
    </div>`;
  content.insertAdjacentHTML("afterbegin", html);
  
  // Tentando adicionar o botão de audio. No caso de não existir, pois não existe link, só retorna um log
  try {
    document
      .getElementById(`audioBtn+${data.palavra}`)
      .addEventListener("click", function (e) {
        e.preventDefault();
        playSound(data.comoFalar);
      });
  } catch (err) {
    console.log("Sem Áudio");
  }
}
