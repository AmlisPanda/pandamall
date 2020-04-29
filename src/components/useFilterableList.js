import { useMemo, useState, useEffect } from 'react';

const useFilterableList = (products, enableSelection = false) => {

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
  }, [filter, order.sortAttribute, order.sortOrder, products, searchText]);

  const headerProps = {
    filteredProducts,
    selectedProducts,
    enableSelection: true,
    changeFilterHandler,
    filter,
    searchText,
    searchHandler,
    order,
    changeOrderHandler,
    mailTo
  };

  const productProps = {
    openProductHandler,
    closeLightboxHandler,
    selectProductHandler,
    fullScreenProduct
  }

  return {
    headerProps,
    productProps
  }
}

export default useFilterableList;