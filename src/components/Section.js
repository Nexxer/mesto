export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на страницефункция, которая отвечает за создание и отрисовку данных на странице
    this._containerSelector = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы
  }
;
  //публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._containerSelector.append(element);
  };

  //публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией
  rendererCard() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };

  addNewItem(element) {
    this._containerSelector.prepend(element);
  };
}