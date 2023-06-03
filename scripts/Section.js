export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.initialData = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  // renderInitialCards = renderItems
  // когда инишл дата подается как ангумент конструктора секции
  renderInitialCards() {
    // console.log(this.items);
    this.items.forEach((itemData) => {
      this.renderer(itemData);
    });
  }

  addItem(htmlElement) {
    this.container.prepend(htmlElement);
  }
}

// export class Section {
//   constructor({ initialData, renderer }, sectionSelector) {
//     this.initialData = initialData;
//     this.renderer = renderer;
//     this.section = document.querySelector(sectionSelector);
//   }
//   // renderCard = addItem
//   renderCard(data) {
//     this.renderer(data);
//   }

//   // как в вебинаре
//   addItem(htmlElement) {
//     this.section.prepend(htmlElement);
//   }

//   // renderInitialCards = renderItems
//   // когда инишл дата подается как ангумент конструктора секции
//   // когда инишл дата подается в конструктор класса секция
//   renderInitialCards() {
//     this.initialData.forEach((data) => {
//       this.renderer(data);
//     });
//   }

//   // когда инишл дата подается как ангумент метода в инедексе как в вебинаре
//   renderItems(items) {
//     items.forEach((item) => {
//       this.renderer(item);
//     });
//   }
// }
