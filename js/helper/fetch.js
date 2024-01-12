const fetchUrl = async(url,type = "GET") => {

  const options = {
    method: type,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWQyZDZiNjExMmJiNjRkMzdhMjU1ODA1ZGEyNWFiYSIsInN1YiI6IjY1OTk1NDI1ODliNTYxMDI1ZTg4ZjE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0-pPTY95-YYVyftxGo_pQzq0NfJFYpFopVut0CnfDo",
    },
  };

 try {
    const res = await fetch(url, options);

    if(!res.ok) throw new Error("no se pudo obtener las peliculas")
  
    const data = await res.json()

    return data
 } catch (error) {
    throw error
 }

}

export default fetchUrl