document.addEventListener("alpine:init", () => {
  Alpine.data("order", () => ({
    products: {},
    price: 0,
    showCheckout: false,
    returnMode: false,
    paid: "",
    toggleReturnMode() {
      this.returnMode = !this.returnMode;
    },
    productUpdated(event) {
      const { productID, productPrice, quantity } = event.detail;
      this.products[productID] = quantity * productPrice;
      this.calculatePrice();
    },
    reset() {
      this.price = 0;
      this.products = {};
      this.$dispatch("order-reset");
    },
    calculatePrice() {
      this.price = Object.values(this.products).reduce(
        (acc, value) => acc + value,
        0,
      );
    },
    getPrice() {
      return (this.price / 100.0).toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      });
    },
    getGiveBack() {
      const totalPaid = this.paid * 100;
      const giveBack = (totalPaid - this.price) / 100;
      return giveBack;
    },
    printPrice(price) {
      return price.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      });
    },
    focusCheckoutInput() {
      this.showCheckout = true;
      this.paid = "";
      this.$nextTick(() => {
        this.$refs.checkout.focus();
        this.$refs.checkout.select();
      });
    },
  }));

  Alpine.data("product", (productID, productPrice) => ({
    quantity: 0,
    startedAt: 0,
    clickingProgress: 0,
    clickingInterval: null,
    reset() {
      this.quantity = 0;
    },
    startClick() {
      if (this.clickingInterval != null) return;
      this.startedAt = Date.now();
      this.clickingProgress = 0;
      this.clickingInterval = setInterval(() => {
        this.clickingProgress = (Date.now() - this.startedAt) / 500;
        if (this.clickingProgress > 1) {
          this.endClick();
        }
      }, 50);
    },
    endClick() {
      if (this.clickingInterval == null) return;
      if (this.clickingProgress > 1) {
        this.quantity = 0;
      } else {
        if (this.returnMode) this.quantity -= 1;
        else this.quantity += 1;
      }
      this.$dispatch("product-updated", {
        productID,
        productPrice,
        quantity: this.quantity,
      });
      this.abortClick();
    },
    abortClick() {
      clearInterval(this.clickingInterval);
      this.clickingInterval = null;
      this.clickingProgress = 0;
    },
  }));

  Alpine.data("productPerKilo", (productID, productPrice) => ({
    quantity: 0,
    prompting: false,
    startedAt: 0,
    clickingProgress: 0,
    clickingInterval: null,
    reset() {
      this.quantity = 0;
      this.prompting = false;
    },
    startClick() {
      if (this.clickingInterval != null) return;
      if (this.prompting) return;
      this.startedAt = Date.now();
      this.clickingProgress = 0;
      this.clickingInterval = setInterval(() => {
        this.clickingProgress = (Date.now() - this.startedAt) / 500;
        if (this.clickingProgress > 1) {
          this.endClick();
        }
      }, 50);
    },
    endClick() {
      if (this.clickingInterval == null) return;
      if (this.clickingProgress > 1) {
        this.quantity = 0;
        this.$dispatch("product-updated", {
          productID,
          productPrice,
          quantity: this.quantity,
        });
      } else {
        this.prompting = true;
        this.$nextTick(() => {
          this.$refs[`productPerKilo${productID}`].focus();
          this.$refs[`productPerKilo${productID}`].select();
        });
      }
      this.abortClick();
    },
    promptEnded() {
      if (!this.prompting) return;
      this.prompting = false;
      if (this.quantity == null || Number.isNaN(this.quantity))
        this.quantity = 0;
      if (this.returnMode) this.quantity = -1 * Math.abs(this.quantity);
      this.$dispatch("product-updated", {
        productID,
        productPrice,
        quantity: this.quantity,
      });
    },
    abortClick() {
      clearInterval(this.clickingInterval);
      this.clickingInterval = null;
      this.clickingProgress = 0;
    },
  }));
});
