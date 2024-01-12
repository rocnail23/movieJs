export class View {
  #parentElement;
  markup;

  toggleClass(nameClass) {
    this.#parentElement.classList.toggle(nameClass);
  }

  setParentElement(element) {
    this.#parentElement = element;
  }

  handleMovie(handler) {
    this.#parentElement.addEventListener("click", async function (e) {
      const movie = e.target.closest(".card-movie");
      if (!movie) return;

      await handler(movie.id);
      console.log("Peero");
      document.querySelector(".logo").scrollIntoView();
    });
  }

  render(position, markup = this.markup) {
    this.#parentElement.insertAdjacentHTML(position, markup);
  }

  clear() {
    this.#parentElement.innerHTML = "";
  }

  update() {
    const newNodes = document
      .createRange()
      .createContextualFragment(this.markup);

    const arrNewDom = Array.from(newNodes.querySelectorAll("*"));

    const oldDom = Array.from(this.#parentElement.querySelectorAll("*"));

    if (arrNewDom.length != oldDom.length) return this.render();

    arrNewDom.forEach((node, i) => {
      if (
        !node.isEqualNode(oldDom[i]) &&
        node.firstChild?.textContent.trim() != "" &&
        node.firstChild?.textContent
      ) {
        oldDom[i].textContent = node.textContent;
        console.log(typeof node.firstChild.textContent);
      }

      if (!node.isEqualNode(oldDom[i])) {
        node.getAttributeNames().forEach((val) => {
          oldDom[i].setAttribute(val, node.getAttribute(val));
        });
      }
    });
  }

  AttachEventParent(event, fn) {
    this.#parentElement.addEventListener(event, fn);
  }
}

if (module.hot) {
  module.hot.accept();
}
