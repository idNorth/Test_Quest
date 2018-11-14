import React, {Component} from 'react';
import { WITH_BODY } from '../../middleware/request_on_server';

/* style */
import './createProduct.css';

export default class CreateProduct extends Component {

    state = {
        message: null
    }

    toCollectNewProduct(){
        if( !this.title.value ) {
            this.setProductMessage("Enter the product name")
            return
        } else if( !this.price.value ) {
            this.setProductMessage("Enter the price of the item")
            return
        } else if( isNaN(this.price.value % 1) || (this.price.value <= 0)) {
            this.setProductMessage("Invalid price entered")
            return
        };

        let product_Form = {
            name: this.title.value,
            description: this.description.value || " ",
            price: this.price.value 
        };
        
        let JSON_Product_Form = JSON.stringify(product_Form);
        /* create new product*/
        this.toCreateNewProduct(JSON_Product_Form);

        this.title.value = '';
        this.price.value = '';
        this.description.value = '';
    }

    toCreateNewProduct(JSON_Product_Form) {
        WITH_BODY('/product/new', 'POST', localStorage.getItem('userToken'), JSON_Product_Form)
        .then( res => res.json() )
        .then( msg => this.setProductMessage(msg.message) )
        .catch( err => {
            console.log('Error: ' + err);
        });
    }

    setProductMessage(message) {
        this.setState({message: message})
    }

    getProductMessage(){
        if(this.state.message !== null) {
            return (<div className='product_message'>{this.state.message}</div>)
        }
    }

    render() {
        return (
            <div id='createProductComponent'>
                <h1 id='title_CreateProduct'>Create Product</h1>
                {this.getProductMessage()}
                <div id='formInput'>
                    <input ref={ input => { this.title = input } } 
                        className='createInput'
                        type='text'   
                        name='name'        
                        placeholder='title'/>
                    <input ref={ input => { this.price = input } } 
                        className='createInput price'
                        type='text' 
                        name='price'       
                        placeholder='price'/>
                    <input ref={ input => { this.description = input } }
                        className='createInput decription'
                        type='text'   
                        name='description' 
                        placeholder='description' />
                    <button onClick={ this.toCollectNewProduct.bind(this) } className='create_btn' type='submit'>Create</button>
                </div>
            </div>
        );
    }
}