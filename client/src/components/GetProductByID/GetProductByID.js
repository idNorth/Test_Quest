import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WITHOUT_BODY } from '../../middleware/request_on_server';

/* style */
import './getProductByID.css';

class GetProductByID extends Component {

    state = {
        product: {}
    }

    componentWillMount(){
        WITHOUT_BODY(`/product/${localStorage.getItem('lastProduct')}`, "GET")
        .then(res => res.json())
        .then( product => this.setState({product}))
        .catch( err => {
            console.log('Error: ' + err);
        });
    }

    render() {
        return(
            <div id='productIdBlock'>
                <h1 className='titleProduct'>Product</h1>
                <div className='productElem'>{this.state.product.name}</div>
                <div className='productElem'>{this.state.product.price}</div>
                <div className='productElem productDescription'>{this.state.product.description}</div>
            </div>
        )
    }
}

export default connect(
    state => ({
        STATE_GET_PRODUCT_BY_ID: state
    })
)(GetProductByID);