import React, { useMemo, useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Products.scss';
import ProductLightbox from '../components/ProductLightbox';
import { useSelector, connect } from 'react-redux';
import ListHeader from '../components/ListHeader';
import { selectProduct, unselectProduct } from '../actions';

const Products = ({ selectedItems, selectItem, unselectItem }) => {

  const products = useSelector(state => state.products.items);

  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState({
    sortAttribute: 'name',
    sortOrder: 'asc',
  });
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

  const productIsSelected = useCallback((product) => {
    return selectedItems.some(p => p.id === product.id);
  }, [selectedItems])

  const selectProductHandler = useCallback((product) => {
    if (!productIsSelected(product))
      return selectItem(product);
    else
      return unselectItem(product.id);
  }, [selectItem, unselectItem, productIsSelected]);

  const searchHandler = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (selectedItems.length > 0) {
      const products = selectedItems.map(p => `#${p.id} - ${p.label}`).join('\n');
      const body = encodeURIComponent(`Salut, \nJe suis intéressé par :\n\n${products}\n\n<Mon nom>`);
      setMailTo(`mailto:selyne57@gmail.com?subject=[PandaMall] Objets à vendre&body=${body}`);
    }
  }, [selectedItems]);


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
  }, [filter, order.sortAttribute, order.sortOrder, products, searchText]);

  const headerProps = {
    filteredProducts,
    selectedProducts: selectedItems,
    enableSelection: true,
    changeFilterHandler,
    filter,
    searchText,
    searchHandler,
    order,
    changeOrderHandler,
    mailTo
  };

  return (
    <div id="products-content">
      <ListHeader {...headerProps} />
      <div id="products-container">
        <div className='products-list'>
          {filteredProducts.map((product) => (
            <ProductCard
              key={'product-' + product.id}
              product={product}
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

const mapStateToProps = state => {
  const { selectedItems } = state.products;

  return ({
    selectedItems
  });
};

const mapDispatchToProps = dispatch => {
  return {
    selectItem: product => {
      dispatch(selectProduct(product))
    },
    unselectItem: id => {
      dispatch(unselectProduct(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
