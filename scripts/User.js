class User {
  //private field
  #login;
  #age;
  static #counter = 0;

  constructor(login, age) {
    this.#login = login;
    this.#age = age;
    User.#counter++;
  }

  #changeAge() {
    this.#age++;
  }

  static showInfo() {
    console.log(User.#counter);
  }

  get login() {
    return this.#login;
  }

  set login(value) {
    this.#changeAge();
    this.#login = value;
  }

  toString() {
    return `${this.#login} ${this.#age}`;
  }
}

export default User;
