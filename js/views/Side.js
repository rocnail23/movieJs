import { View } from "./View"

class Side extends View {

    constructor(){
        super()
        this.setParentElement(document.querySelector(".side"))
    }

    generateMarkup(data){

       const markup = Object.entries(data).map(([category,value]) => (
        `<div class="recomendations">
    <h3 class="recomendations__title">${category}</h3>
    <div class="recomendations__movies">
        <div class="recomendations__container">

        ${value[0] ? this.createCard(value) : "no hay peliculas para mostrar"}
            
        </div>
    </div>
</div>`)).join("")
       
        this.markup = markup 
    }
    
    createCard(movies){
      return  movies.map(movie => (

            `<div id="${movie.id}" class="card-movie">
                <img src="https://image.tmdb.org/t/p/w200/${movie.poster}" alt="poster of a ${movie.title}"> 
            </div> 
            `
        )).join("")

    }
    
    
}


const sideView = new Side()


export default sideView