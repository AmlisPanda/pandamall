import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductImage.css';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductImage = ({ id }) => {

  const [errorImage, setErrorImage] = useState(false);

  const src = `/images/${id}.JPG`;

  const onError = () => {
    setErrorImage(true);
  };

  if (!errorImage) {
    return (
      <img src={src} alt='Produit' onError={onError} />
    );
  }
  else {
    return (
      <FontAwesomeIcon icon={faEyeSlash} color="#ddd" size="3x" />
    );
  }


}

ProductImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

export default ProductImage;
