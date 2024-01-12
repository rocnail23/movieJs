import { View } from "./View"


class Movie extends View {
      
      constructor(){
        super()
        this.setParentElement(document.querySelector(".movie"))
      }
    
      generateMarkUp(data){

        const markup = `
        <div class="info" style="background-image: linear-gradient(to right, rgb(0,0,0,.7) 10%, rgb(0,0,0,0.0)), url(https://image.tmdb.org/t/p/original/${data.image})">
            <h2 class="info__title mb-md">
                ${data.title}
            </h2>
            <div class="info__traits">
                <ul class="info__items">
                    <li><ion-icon class="info__icons" name="trending-up-outline"></ion-icon> <p>${data.popularity}</p></li>

                    <li>
                     
                    ${this.generateStars(Math.round(data.voteAverage))}
                       
                    </li>
                </ul>
            </div>
            <p class="info__overview">
               ${data.overview}
            </p>
            <button class="info__btn"> 
                <ion-icon class="info__icons" name="play"></ion-icon> see trailer
            </button>
        </div>
        `
        this.markup = markup

      }

      

      generateStars(stars){

        const numberOfStars = stars
        let length = 0
        const arr = []

        while(length <= 4){
            length++
            if( length <= numberOfStars){
                arr.push(`<ion-icon class="info__icons" name="star"></ion-icon>`)
            }

            if(length > numberOfStars){
                arr.push(`<ion-icon class="info__icons" name="star-outline"></ion-icon>`)
            }
        }

        return arr.join(" ")
        



      }

      



    

}




const movieView = new Movie()

export default movieView