import React, {Component} from 'react';
import { connect } from 'react-redux';
import { WITHOUT_BODY } from '../../middleware/request_on_server';
import { SHOW_ALL } from  '../../actionType/index';

/* style */
import './showAllProducts.css';

class ShowAllProducts extends Component {

    componentWillMount(){
        WITHOUT_BODY("/products", "GET")
        .then(res => res.json())
        .then( products => this.props.getProductsList(products))
        .catch( err => {
            console.log('Error: ' + err);
        });
    }

    productByID(index){
        localStorage.setItem('lastProduct', index);
        this.props.history.push(`/product/{id}`);
    }

    render(){
        return(
            <div id='productsComponent'>
                <h1 id='title_Products'>Products</h1>
                <ul id='productsList'>     
                    {this.props.STATE_GET_ALL_PRODUCTS.products.map( (product, index) => 
                        <li onClick={this.productByID.bind(this, product._id)} key={index} className='product'>
                            <div className='element_Product'>{product.name}</div>
                            <div className='element_Product'>{product.price}</div>
                        </li>  
                    )}
                </ul>
            </div>
        );
    };
}

export default connect(
    state => ({
        STATE_GET_ALL_PRODUCTS: state
    }),
    dispatch => ({
        getProductsList(products) {
            dispatch({ type: SHOW_ALL, products: products})
        }
    })
)(ShowAllProducts);