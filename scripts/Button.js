class Button {
  #height;
  #width;
  static #counter = 0;

  constructor(height, width, text_back, font_size, color_back, color_text) {
    this.#height = height;
    this.#width = width;
    this.text_back = text_back;
    this.font_size = font_size;
    this.color_back = color_back;
    this.color_text = color_text;
    Button.#counter++;
  }

  get height() {
    return this.#height;
  }

  set height(value) {
    this.#height = value;
  }

  get width() {
    return this.#width;
  }

  set width(value) {
    this.#width = value;
  }

  static showCount() {
    return Button.#counter;
  }

  show() {
    console.log(this.text_back);
  }
}

export default Button;
