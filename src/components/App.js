import React, { useEffect } from 'react';
import '../styles/App.scss';
import Products from '../routes/Products';
import Soldout from '../routes/Soldout';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect, Provider } from "react-redux";
import { fetchProducts } from "../actions/index";

const App = ({ store, dispatch }) => {

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <div className='App'>
      <header className='App-header'>
        <div id='logo'>PandaMall</div>
        <div>
          Bienvenue <span>!</span>
        </div>
      </header>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/soldout">
              <Soldout />
            </Route>
            <Route path="/">
              <Products />
            </Route>

          </Switch>

        </Router>
      </Provider>


    </div>
  );
}

const mapStateToProps = state => {
  const { items, loading, error } = state;

  return ({
    items,
    loading,
    error
  });
};


export default connect(mapStateToProps)(App);
