import React, { Component } from 'react';

/* style */
import './headerMenu.css';

export default class HeaderMenu extends Component {
    render() {
        return (
            <div id='headerMenu'>
                <a href='/'             className='header_btn'>Home           </a>
                <a href='/products'     className='header_btn'>Products       </a>
                <a href='/product/new'  className='header_btn'>Create product </a>
                {this.userUpdate()}
            </div>
        );
    }

    userUpdate(){
        if(localStorage.getItem('userToken') === 'undefined') {
            return (<a href='/login' className='header_btn login_btn'>Login</a>)
        } else {
            return (<a href='/login' onClick={this.logoutFunction.bind(this)} className='header_btn login_btn'>Logout</a>)
        }
    }

    logoutFunction(){
        localStorage.setItem('userToken', 'undefined')
    }
}