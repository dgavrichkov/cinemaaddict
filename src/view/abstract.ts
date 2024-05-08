export default abstract class Abstract {
  protected _element: HTMLElement | null;
  protected _callback: Record<string, Function>;

  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  // getTemplate() {
  //   throw new Error('Abstract method not implemented: getTemplate');
  // }

  abstract getTemplate(): string;

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }
}
