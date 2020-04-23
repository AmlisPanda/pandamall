import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import products from '../config/products';
import './Products.css';

const Products = () => {
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, []);

  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState({
    sortAttribute: 'name',
    sortOrder: 'asc',
  });

  const changeFilterHandler = (event) => {
    setFilter(event.target.value);
  };

  const changeOrderHandler = (event) => {
    const value = event.target.value.split('-');
    setOrder({ sortAttribute: value[0], sortOrder: value[1] });
  };

  const filteredProducts = useMemo(() => {
    const result = filter
      ? products.filter((p) => p.category === filter)
      : products;

    if (order.sortAttribute === 'name') {
      result.sort((a, b) => {
        var nameA = a.label.toUpperCase(); // ignore upper and lowercase
        var nameB = b.label.toUpperCase(); // ignore upper and lowercase
        if (order.sortOrder === 'asc') {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        } else {
          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }
        }
        return 0;
      });
    } else if (order.sortAttribute === 'price') {
      result.sort((a, b) => {
        return order.sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      });
    }

    return result;
  }, [filter, order]);

  return (
    <div className='products'>
      <div id='list-header'>
        Nombre d'articles : {filteredProducts.length}
        <div id='filters'>
          <div class='action'>
            Filtrer par
            <select onChange={changeFilterHandler} value={filter}>
              <option key={`category-all`} value=''>
                Tous
              </option>
              {categories.map((c, index) => (
                <option key={`category-${index}`} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div class='action'>
            Trier par
            <select
              onChange={changeOrderHandler}
              value={`${order.sortAttribute}-${order.sortOrder}`}
            >
              <option value='price-asc'>Prix (asc)</option>
              <option value='price-desc'>Prix (desc)</option>
              <option value='name-asc'>Nom (asc)</option>
              <option value='name-desc'>Nom (desc)</option>
            </select>
          </div>
        </div>
      </div>
      <div className='products-list'>
        {filteredProducts.map((product, index) => (
          <ProductCard key={'product-' + index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
