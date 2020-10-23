import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => {
                return (
                  <li key={product._id}>
                    <div className="product">
                      <a href={"#" + product._id}>
                        <img
                          onClick={() => this.openModal(product)}
                          src={product.image}
                          alt={product.title}
                        />
                      </a>
                      <p>{product.title}</p>
                      <div className="product-price">
                        <div>{formatCurrency(product.price)}</div>
                        <button
                          onClick={() => this.props.addToCart(product)}
                          className="button primary"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true}>
            <Zoom>
              <button onClick={this.closeModal} className="close-modal">
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    <strong>{product.description}</strong>
                  </p>
                  <p>
                    Available Sizes :{" "}
                    {product.availableSizes.map((item) => (
                      <span>
                        <button className="button">{item}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
});
// const mapDispatchToProps = (dispatch) => ({
//   fetchProducts: () => dispatch(fetchProducts()),
// });
const mapdispatch = { fetchProducts };

export default connect(mapStateToProps, mapdispatch)(Products);
