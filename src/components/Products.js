import React, { useMemo, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import products from '../config/products';
import './Products.css';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductLightbox from './ProductLightbox';
import classnames from 'classnames';

const Products = () => {
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, []);

  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState({
    sortAttribute: 'name',
    sortOrder: 'asc',
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [mailTo, setMailTo] = useState('');
  const [searchText, setSearchText] = useState('');
  const [fullScreenProduct, setFullScreenProduct] = useState();

  const openProductHandler = (product) => {
    setFullScreenProduct(product);
  }
  const closeLightboxHandler = () => {
    setFullScreenProduct(undefined);
  }

  const changeFilterHandler = (event) => {
    setFilter(event.target.value);
  };

  const changeOrderHandler = (event) => {
    const value = event.target.value.split('-');
    setOrder({ sortAttribute: value[0], sortOrder: value[1] });
  };

  const productIsSelected = (product) => {
    return selectedProducts.some(p => p.id === product.id);
  }

  const selectProductHandler = (product) => {
    let newSelectedProducts = [];
    if (productIsSelected(product)) {
      newSelectedProducts = selectedProducts.filter(p => p.id !== product.id);
    } else {
      newSelectedProducts = selectedProducts.concat(product);
    }

    setSelectedProducts(newSelectedProducts);
  }

  const searchHandler = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (selectedProducts.length > 0) {
      const products = selectedProducts.map(p => `#${p.id} - ${p.label}`).join('\n');
      const body = encodeURIComponent(`Salut, \nJe suis intéressé par :\n\n${products}\n\n<Mon nom>`);
      setMailTo(`mailto:selyne57@gmail.com?subject=[PandaMall] Objets à vendre&body=${body}`);
    }
  }, [selectedProducts]);


  const filteredProducts = useMemo(() => {
    let result = filter
      ? products.filter((p) => p.category === filter)
      : products;

    if (searchText) {
      result = result.filter(r => r.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
    }

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
    } else {
      result.sort((a, b) => {
        return order.sortOrder === 'id'
          ? a.id - b.id
          : b.id - a.id;
      });
    }

    return result;
  }, [filter, order, searchText]);

  return (
    <div id="products-content">
      <div id='list-header'>

        <h2 className="nb-articles">Articles ({filteredProducts.length})
          {selectedProducts.length > 0 && <span>{selectedProducts.length} {selectedProducts.length === 1 ? 'sélectionné' : 'sélectionnés'}</span>}
        </h2>
        <div id='toolbar'>
          <div id='filters'>
            <div className={classnames('action', { 'active': !!filter })} >
              <label>Filtrer par</label>
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
            <div className='action'>
              <label>Trier par</label>
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
            <div className={classnames('action', { 'active': !!searchText })} id="search-action">
              <input type="text" id="search-input" placeholder="Recherche..." value={searchText} onChange={searchHandler} />
            </div>


          </div>
          {selectedProducts.length > 0 && <div className="action send-action">
            <a href={mailTo} title="Envoyer un email avec la liste des articles sélectionnés"><FontAwesomeIcon icon={faEnvelope} /><span>Envoyer une demande</span></a>
          </div>}
        </div>



      </div>
      <div id="products-container">
        <div className='products-list'>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={'product-' + index}
              product={product}
              isSelected={productIsSelected(product)}
              selectProductHandler={selectProductHandler}
              openProductHandler={openProductHandler}
            />
          ))}
        </div>
      </div>

      {fullScreenProduct && <ProductLightbox product={fullScreenProduct} closeLightboxHandler={closeLightboxHandler} />
      }

    </div>
  );
};

export default Products;
