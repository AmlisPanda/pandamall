import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductImage from './ProductImage';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

const ProductCard = ({ product, selectProductHandler, openProductHandler }) => {

  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const selectHandler = (e) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
    selectProductHandler(product);
  }

  return (
    <div className='product-card'>
      <div className='product-image' onClick={() => openProductHandler(product)}>
        {!product.soldOut && <button
          title="Je suis intéressé"
          onClick={selectHandler}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <FontAwesomeIcon size="2x" icon={isSelected || isHovered ? faHeart : faHeartRegular} color="#542C85" /></button>}

        <ProductImage id={product.id} />
      </div>

      <div className='card-content'>
        <div className='card-legend'>
          <div className='card-title'>
            <span className='category'>{product.category}</span>
            <div className='label'><span>#{product.id}</span> {product.label}  {product.quantity > 1 && <>(x{product.quantity})</>}</div>
          </div>

          <span className='price'>{product.price} $</span>
        </div>
        {product.description && (
          <div className='card-details'>
            <p>{product.description}</p>
          </div>
        )}
        <div className='card-footer'>
          {!product.soldOut ? <><div className='qty'>
            {product['nb-images'] && <button className="show-pictures-btn" onClick={() => openProductHandler(product)}>Afficher les {product['nb-images']} photos</button>}
          </div>
            {product.avaibility && (
              <span className='availability'>
                Disponible en {product.avaibility}
              </span>
            )}</> : <span className="sold-out">Vendu</span>}

        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
