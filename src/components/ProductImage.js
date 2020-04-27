import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProductImage.css';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductImage = ({ id }) => {

  const [errorImage, setErrorImage] = useState(false);

  const src = `/images/${id}.JPG`;

  const onError = (e) => {
    console.log('error', id);
    setErrorImage(true);
  };
  const onLoad = (e) => {
    console.log('onload', id);
    setErrorImage(false);
  }

  if (errorImage) {
    return (
      <FontAwesomeIcon icon={faEyeSlash} color="#ddd" size="3x" />
    );
  }

  return (
    <img src={src} alt='Produit' onLoad={onLoad} onError={onError} />
  );


}

ProductImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

export default ProductImage;
