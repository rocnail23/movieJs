import { View } from "./View"


class Movies extends View {

    constructor(){
        super()
        this.setParentElement(document.querySelector(".container-movies"))
    }
 

    generateMarkup(data){
        const markup = data.map(data => (
            `<div id="${data.id}" class="card-movie">
            <img src="https://image.tmdb.org/t/p/w200/${data.poster}" alt="poster movie"> 
            </div> 
            `
        )).join("")
        this.markup = markup
    }




}


const moviesView = new Movies()


export default moviesView