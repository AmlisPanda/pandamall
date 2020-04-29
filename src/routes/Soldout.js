import React from 'react'
import { useSelector } from 'react-redux';
import ListHeader from '../components/ListHeader';
import useFilterableList from '../components/useFilterableList';
import ProductCard from '../components/ProductCard';

const Soldout = props => {
  const products = useSelector(state => state.products.items);

  const { headerProps, productProps } = useFilterableList(products);

  const { filteredProducts } = headerProps;
  const { openProductHandler } = productProps;

  return (

    <div id="products-content">
      <ListHeader {...headerProps} />
      <div id="products-container">
        <div className='products-list'>
          {filteredProducts && filteredProducts.map((product) => (
            <ProductCard
              key={'product-' + product.id}
              product={product}
              openProductHandler={openProductHandler}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

Soldout.propTypes = {

}

export default Soldout
