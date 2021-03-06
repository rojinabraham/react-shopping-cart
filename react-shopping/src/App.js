import React from "react";
import data from "./data.json";
import Products from "./components/products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
    // this.sortProducts = this.sortProducts.bind(this);
    // this.filterProducts = this.filterProducts.bind(this);
  }
  removeFromCart = (product) => {
    let cartItems = this.state.cartItems;
    this.setState(
      {
        cartItems: cartItems.filter((item) => item._id !== product._id),
      },
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems.filter((item) => item._id !== product._id))
      )
    );
    // localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };
  createOrder = (order) => {
    console.log(order);
  };
  addToCart = (product) => {
    const cartItems = this.state.cartItems;
    let alreadyInCart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  // sortProducts(e) {
  //   const sort = e.target.value;
  //   this.setState((state) => ({
  //     sort,
  //     products: state.products
  //       .slice()
  //       .sort((a, b) =>
  //         sort === "lowest"
  //           ? a.price > b.price
  //             ? 1
  //             : -1
  //           : sort === "highest"
  //           ? a.price < b.price
  //             ? 1
  //             : -1
  //           : a._id < b._id
  //           ? 1
  //           : -1
  //       ),
  //   }));
  // }
  // // filterProducts(e) {
  // //   if (e.target.value === "") {
  // //     this.setState({ size: e.target.value, products: data.products });
  // //   } else {
  // //     this.setState({
  // //       size: e.target.value,
  // //       products: data.products.filter(
  // //         (product) => product.availableSizes.indexOf(e.target.value) >= 0
  // //       ),
  // //     });
  // //   }
  // // }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
              <Filter />
              <Products addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                createOrder={this.createOrder}
                removeFromCart={this.removeFromCart}
                cartItems={this.state.cartItems}
              />
            </div>
          </div>
        </main>
        <footer>All Rights Reserved</footer>
      </div>
    );
  }
}
export default App;
