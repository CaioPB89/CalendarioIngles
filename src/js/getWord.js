export async function getWord(palavra = "error") {
  // Vai: Buscar o link com a palavra, fazer uma resolução e usa o primeiro item para construir um objeto, que é então retornado. No caso de erros, retorna o erro
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`Não conseguimos encontrar a palavra buscada`); // erro de promessa
    const dataPalavra = data[0];
    return {
        palavra: dataPalavra.word,
        comoFalar: dataPalavra?.phonetics[1]?.audio,
        significados: dataPalavra.meanings,
        fonte: dataPalavra?.sourceUrls
    }
  } catch (err) {
    alert(`Erro ao encontrar a palavra, busque erros de escrita ou se a palavra realmente existe`)
  }
}

// {
//     "word": "error",
//     "phonetic": "/ˈɛɹə(ɹ)/",
//     "phonetics": [
//         {
//             "text": "/ˈɛɹə(ɹ)/",
//             "audio": ""
//         },
//         {
//             "text": "/ˈɛɹɚ/",
//             "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/error-us.mp3",
//             "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=857012",
//             "license": {
//                 "name": "BY-SA 3.0",
//                 "url": "https://creativecommons.org/licenses/by-sa/3.0"
//             }
//         }
//     ],
//     "meanings": [
//         {
//             "partOfSpeech": "noun",
//             "definitions": [
//                 {
//                     "definition": "The state, quality, or condition of being wrong.",
//                     "synonyms": [],
//                     "antonyms": []
//                 },
//                 {
//                     "definition": "A mistake; an accidental wrong action or a false statement not made deliberately.",
//                     "synonyms": [],
//                     "antonyms": []
//                 },
//                 {
//                     "definition": "Sin; transgression.",
//                     "synonyms": [],
//                     "antonyms": []
//                 },
//                 {
//                     "definition": "A failure to complete a task, usually involving a premature termination.",
//                     "synonyms": [],
//                     "antonyms": []
//                 },
//                 {
//                     "definition": "The difference between a measured or calculated value and a true one.",
//                     "synonyms": [],
//                     "antonyms": []
//                 },
//                 {
//                     "definition": "A play which is scored as having been made incorrectly.",
//                     "synonyms": [],
//                     "antonyms": []
//                 },
//                 {
//                     "definition": "One or more mistakes in a trial that could be grounds for review of the judgement.",
//                     "synonyms": [],
//                     "antonyms": []
//                 },
//                 {
//                     "definition": "Any alteration in the DNA chemical structure occurring during DNA replication, recombination or repairing.",
//                     "synonyms": [],
//                     "antonyms": []
//                 }
//             ],
//             "synonyms": [
//                 "blooper",
//                 "blunder",
//                 "boo-boo",
//                 "defect",
//                 "fault",
//                 "faux pas",
//                 "flub",
//                 "fluff",
//                 "fumble",
//                 "gaffe",
//                 "lapse",
//                 "mistake",
//                 "slip",
//                 "stumble",
//                 "thinko",
//                 "wrength"
//             ],
//             "antonyms": []
//         },
//         {
//             "partOfSpeech": "verb",
//             "definitions": [
//                 {
//                     "definition": "To function improperly due to an error, especially accompanied by error message.",
//                     "synonyms": [],
//                     "antonyms": [],
//                     "example": "Remove that line of code and the script should stop erroring there."
//                 },
//                 {
//                     "definition": "To show or contain an error or fault.",
//                     "synonyms": [],
//                     "antonyms": [],
//                     "example": "The block transmission errored near the start and could not be received."
//                 },
//                 {
//                     "definition": "To err.",
//                     "synonyms": [],
//                     "antonyms": []
//                 }
//             ],
//             "synonyms": [
//                 "err"
//             ],
//             "antonyms": []
//         }
//     ],
//     "license": {
//         "name": "CC BY-SA 3.0",
//         "url": "https://creativecommons.org/licenses/by-sa/3.0"
//     },
//     "sourceUrls": [
//         "https://en.wiktionary.org/wiki/error"
//     ]
// }