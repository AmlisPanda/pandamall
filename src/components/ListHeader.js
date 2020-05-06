import React, { useMemo } from 'react'
import classnames from 'classnames';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/ListHeader.scss';

const ListHeader = ({
  filteredProducts,
  selectedProducts,
  enableSelection = true,
  changeFilterHandler,
  filter, searchText,
  searchHandler,
  order,
  changeOrderHandler,
  mailTo }) => {

  const categories = useMemo(() => {
    return Array.from(new Set(filteredProducts.map((p) => p.category)));
  }, [filteredProducts]);


  return (
    <div id='list-header'>

      <h2 className="nb-articles">Articles ({filteredProducts.length})
      {enableSelection && selectedProducts.length > 0 && <span>{selectedProducts.length} {selectedProducts.length === 1 ? 'sélectionné' : 'sélectionnés'}</span>}
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
  )
}

ListHeader.propTypes = {

}

export default ListHeader
