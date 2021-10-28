import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import SelectCategory from './SelectCategory';

class FilterBar extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount = () => {
    this.renderCategories();
  }

  handleChangeFilterBar = async (event) => {
    const { handleChange, getProductsFromApi } = this.props;
    await handleChange(event);
    await getProductsFromApi();
  }

  async renderCategories() {
    const categories = await getCategories();
    console.log(categories);
    this.setState({
      categories,
    });
  }

  render() {
    const {
      categories,
    } = this.state;
    return (
      <aside>
        <SelectCategory
          categories={ categories }
          onChange={ this.handleChangeFilterBar }
        />
      </aside>
    );
  }
}

FilterBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  getProductsFromApi: PropTypes.func.isRequired,
};

export default FilterBar;
