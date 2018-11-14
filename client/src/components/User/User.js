import React, { Component } from 'react';
import { WITH_BODY } from '../../middleware/request_on_server';

/* style */
import './user.css'

export default class User extends Component {

    state = {
        message: null
    }

    toCollectUser(url) {
        if( (this.login.value.length < 3) || this.password.value.length < 6 ) {
            this.setAccountMessage("Login must be at least 3 characters. \nPassword must be at least 6 characters")
            return
        }

        let user_Data = {
            name: this.login.value,
            password: this.password.value
        }
        let JSON_User_Data = JSON.stringify(user_Data);

        this.userLogin(url, JSON_User_Data)  
    }

    userLogin = (url, JSON_User_Data) => {
        WITH_BODY(url, 'POST', null, JSON_User_Data)
        .then(res => res.json())
        .then( result => {
            if(result.token){
                localStorage.setItem('userToken', result.token);
                this.props.history.push('/products');
            } else {
                this.setAccountMessage(result.message);
            }
        })
        .catch(error => {
              console.log('Error <<createUser>>: ' + error);
        });
    }

    setAccountMessage(message){
        this.setState({message: message})
    }

    getAccountMessage(){
        if(this.state.message !== null) {
            return (<div className='account_message' >{this.state.message}</div>)
        }
    }

    render(){
        return(
            <div id='loginBlock'>
                <h2>SING IN</h2>
                <input ref={ input => { this.login = input } } 
                       className='login_Input' 
                       type='text' 
                       placeholder='Login'/>
                <input ref={ input => { this.password = input } } 
                       className='login_Input' 
                       type='password' 
                       placeholder='Password'/>
                <button onClick={this.toCollectUser.bind(this, '/singin')} className='auth_btn' >Sing in</button>
                <button onClick={this.toCollectUser.bind(this, '/login')}  className='auth_btn' >Create an account</button>
                {this.getAccountMessage()}
            </div>
        )
    }
}