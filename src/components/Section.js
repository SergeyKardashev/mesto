export class Section {
  constructor(renderer, containerSelector) {
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderItems(itemsDataArray) {
    itemsDataArray.forEach((itemData) => {
      this.renderer(itemData);
    });
  }

  addItem(htmlElement) {
    // может быть тут сличать айдишники - проверять на владельца
    this.container.prepend(htmlElement);
  }
}
