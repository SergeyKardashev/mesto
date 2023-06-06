export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach((itemData) => {
      this.renderer(itemData);
    });
  }

  addItem(htmlElement) {
    this.container.prepend(htmlElement);
  }
}
