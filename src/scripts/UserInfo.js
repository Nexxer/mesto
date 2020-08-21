export default class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor(userSelector, jobSelector) {
    this._userSelector = userSelector;
    this._jobSelector = jobSelector;
  }

  // публичный метод, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._userSelector.textContent,
      job: this._jobSelector.textContent,
    }
  }

  //публичный метод, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(info) {
    this._userSelector.textContent = info.surname;
    this._jobSelector.textContent = info.profession;
  }
}