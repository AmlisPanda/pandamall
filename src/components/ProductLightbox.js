import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ProductLightbox = ({ product, closeLightboxHandler }) => {

  const [photoIndex, setPhotoIndex] = useState(0);


  const nbImages = product['nb-images'] || 1;
  const images = [];
  for (let i = 0; i < nbImages; i++) {
    if (i === 0) {
      images.push(`/images/${product.id}.JPG`);
    } else {
      images.push(`/images/${product.id}-${i}.JPG`);
    }
  }

  return (
    <Lightbox mainSrc={images[photoIndex]}
      nextSrc={nbImages > 1 ? images[(photoIndex + 1) % images.length] : undefined}
      prevSrc={nbImages > 1 ? images[(photoIndex + images.length - 1) % images.length] : undefined}
      onCloseRequest={closeLightboxHandler}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + images.length - 1) % images.length)
      }
      onMoveNextRequest={() =>
        setPhotoIndex((photoIndex + 1) % images.length)
      }></Lightbox>
  )
}

ProductLightbox.propTypes = {
  product: PropTypes.object,
  closeLightboxHandler: PropTypes.func
}

export default ProductLightbox
