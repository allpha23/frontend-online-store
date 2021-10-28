import React from 'react';
import PropTypes from 'prop-types';

class SelectCategory extends React.Component {
  render() {
    const {
      categories,
      onChange,
    } = this.props;
    return (
      <select
        onChange={ onChange }
        name="category"
      >
        <option
          key="-1"
          value=""
        >
          Todas as categorias
        </option>
        {
          categories.map((category) => (
            <option
              key={ category.id }
              value={ category.id }
              data-testid="category"
            >
              { category.name }
            </option>
          ))
        }
      </select>
    );
  }
}

SelectCategory.propTypes = {
  categories: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectCategory;
