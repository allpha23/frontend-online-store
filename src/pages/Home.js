import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import FilterBar from '../component/FilterBar';
import CardProductPreview from '../component/cardProductPreview';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      products: [],
      cartProducts: [],
      quantityProducts: [],
      query: '',
      category: '',
    };
  }

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    const quantityProducts = JSON.parse(localStorage.getItem('quantity'));
    if (cartProducts) {
      this.setState({
        cartProducts,
        quantityProducts,
      });
    }
  };

  getProductsFromApi = async () => {
    const { query, category } = this.state;
    const list = await getProductsFromCategoryAndQuery(category, query);
    this.setState({ products: list.results });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.getProductsFromApi();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleAddCartButtonClick = ({ target }) => {
    const productId = target.name;
    const { products } = this.state;

    const product = products.find((prod) => prod.id === productId);

    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product],
      quantityProducts: [...prevState.quantityProducts, 1],
    }), () => {
      const { cartProducts, quantityProducts } = this.state;
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      localStorage.setItem('quantity', JSON.stringify(quantityProducts));
    });
  }

  renderProductList = () => {
    const { products } = this.state;
    return products.map((product) => (
      <CardProductPreview
        key={ product.id }
        id={ product.id }
        title={ product.title }
        price={ product.price }
        thumbnail={ product.thumbnail }
        categoryId={ product.category_id }
        handleClick={ this.handleAddCartButtonClick }
      />
    ));
  }

  render() {
    const { products, category, cartProducts } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <form
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }
        >
          <input
            data-testid="query-input"
            type="text"
            name="query"
            id="query-input"
            placeholder="Search"
          />
          <button
            data-testid="query-button"
            type="submit"
          >
            busca
          </button>
        </form>
        <div />

        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <div>
          <FilterBar
            category={ category }
            handleChange={ this.handleChange }
            getProductsFromApi={ this.getProductsFromApi }
          />
        </div>
        { products.length > 0 && this.renderProductList() }
        <Link
          to={ { pathname: '/shoppingcart', state: { cartProducts } } }
          data-testid="shopping-cart-button"
        >
          <button type="button">Carrinho</button>
        </Link>
      </div>
    );
  }
}

export default Home;
