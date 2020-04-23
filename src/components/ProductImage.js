import React from 'react';
import PropTypes from 'prop-types';
import './ProductImage.css';

const ProductImage = ({ images }) => {
  if (images && images.length > 0) {
    return (
      <div className='product-image'>
        <img src={`/images/${images[0]}`} alt='Produit' />
      </div>
    );
  }

  return (
    <div className='product-image no-image'>
      <span>Pas de photo</span>
    </div>
  );
};

ProductImage.propTypes = {};

export default ProductImage;
