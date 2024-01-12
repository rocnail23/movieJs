import { View } from "./View";

class Video extends View {
  openButton;
  #iframe = document.querySelector(".trailer");

  constructor() {
    super();
    this.setParentElement(document.querySelector(".container-video"));
  }

  openHandlerButtonVideo() {
    this.openButton = document.querySelector(".info__btn");

    this.openButton.addEventListener(
      "click",
      this.callbackOpenClose.bind(this, false)
    );
  }

  closeHandlerButtonVideo() {
    const button = document.querySelector(".container-video__btn");

    button.addEventListener("click", this.callbackOpenClose.bind(this, true));
  }

  clearListener() {
    this.openButton.removeEventListener(
      "click",
      this.callbackOpenClose.bind(this)
    );
  }

  callbackOpenClose(reset = false) {
    console.log("este es el this", this);
    this.toggleClass("active");
    console.log("aqui reset", reset);
    if (reset) {
      console.log("epas");
      this.#iframe.setAttribute("src", this.#iframe.src);
    }
  }

  setYoutubeVideoUrl(key) {
    this.#iframe.setAttribute("src", `https://www.youtube.com/embed/${key}`);
  }
}

const videoView = new Video();

export default videoView;
