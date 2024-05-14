// Fetch, checagem de retorno 
export async function translate(definition) {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${definition}&langpair=en|pt-br`
    );
    const data = await res.json(); /// Resolvendo promessa
    
    return data.responseData.translatedText.startsWith("MYMEMORY WARNING:") ? definition : data.responseData.translatedText; 
    // Graças ao limite de tradução, retorna em inglês se não for possivel traduzir
}

