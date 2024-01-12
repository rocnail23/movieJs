import { View } from "./View";

class Search extends View {

    constructor(){
        super()
        this.setParentElement(document.querySelector(".filter"))
    }

    handlerSearch(handler){

    this.AttachEventParent("input",function(e){
            handler(e.target.value)
    })

    }


}


const searchView = new Search()


export default searchView