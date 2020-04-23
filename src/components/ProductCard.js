import React from 'react';
import PropTypes from 'prop-types';
import ProductImage from './ProductImage';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className='product-card'>
      <ProductImage images={product.images} />
      <div className='card-content'>
        <div className='card-legend'>
          <div className='card-title'>
            <span className='category'>{product.category}</span>
            <span>{product.label}</span>
          </div>

          <span className='price'>{product.price} $</span>
        </div>
        {product.description && (
          <div className='card-details'>
            <p>{product.description}</p>
          </div>
        )}
        <div className='card-footer'>
          <span className='qty'>
            {product.quantity > 1 && <>Quantité : {product.quantity}</>}
          </span>
          {product.avaibility && (
            <span className='availability'>
              Disponible en {product.avaibility}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
