import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductImage.scss';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductImage = ({ id }) => {

  const [errorImage, setErrorImage] = useState(false);

  const src = `/images/${id}.JPG`;

  const onError = (e) => {
    setErrorImage(true);
  };
  const onLoad = (e) => {
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
