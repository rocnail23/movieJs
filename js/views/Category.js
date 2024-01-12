import { View } from "./View";


class Category extends View {

    constructor(){
        super()
        this.setParentElement(document.querySelector(".nav"))
    }

    handlerCategory(handler){

        this.AttachEventParent("click", function(e){
             e.preventDefault()
             const button = e.target.closest(".nav__item")
             handler(button.id)
        })

    }
}

const categoryView = new Category()

export default categoryView