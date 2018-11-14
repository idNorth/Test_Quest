import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

/*  Components */
import HeaderMenu from '../components/HeaderMenu/HeaderMenu';
import User from '../components/User/User';
import CreateProduct from '../components/CreateProduct/CreateProduct';
import ShowAllProducts from '../components/ShowAllProducts/ShowAllProducts';
import GetProductByID from '../components/GetProductByID/GetProductByID';
import Home from '../components/Home/Home';

/* reducer */
import reducer from '../components/reducers';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <HeaderMenu />
            <Route exact path='/'               component={Home}/>
            <Route exact path='/login'          component={User}/>
            <Route exact path='/products'       component={ShowAllProducts}/>
            <Route exact path='/product/new'    component={CreateProduct}/>
            <Route exact path='/product/{id}'   component={GetProductByID} />
          </div>
        </BrowserRouter>
      </Provider>
    );
}
