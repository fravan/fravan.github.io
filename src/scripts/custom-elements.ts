class HTMLPriceElement extends HTMLElement {
  static observedAttributes = ["price"];

  constructor() {
    super();
  }

  attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
    const totalValue = Math.round(Number(newValue));
    if (isNaN(totalValue)) return;

    this.textContent = (Number(newValue) / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  }
}

customElements.define("lce-price", HTMLPriceElement);
