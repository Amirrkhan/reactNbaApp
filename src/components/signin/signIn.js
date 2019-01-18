import React, { Component } from 'react';
import FormField from '../widgets/formFields/formField'

import {firebase } from '../../firebase'
import './signIn.sass'

class SignIn extends Component {

    state = {
        registerError: '',
        loading: false,
        formdata: {
            email:{
                element: 'input',
                value: '',
                config: {
                    name: "email_input",
                    type: "email",
                    placeholder: "Enter your email"
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            password:{
                element: 'input',
                value: '',
                config: {
                    name: "password_input",
                    type: "password",
                    placeholder: "Enter your password"
                },
                validation: {
                    required: true,
                    password: true,
                },
                valid: false,
                touched: false,
                validationMessage: ""
            }
        }
    }

    submitForm = (event, type) => {

        event.preventDefault()

        if(type !== null){

            let dataToSubmit = {};
            let formIsValid = true;

            for(let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid
            }

            if(formIsValid){
                this.setState({
                    loading: true,
                    registerError: ''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(() => {
                        this.props.history.push('/')
                    }).catch(error => {
                        this.setState({
                            loading: false,
                            registerError: error.message
                        })
                    })
                } else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(() => {
                        this.props.history.push('/')
                    }).catch(error => {
                        this.setState({
                            loading: false,
                            registerError: error.message
                        })
                    })
                }

                
            }
        }

    }

    submitButton = () => (
        this.state.loading ? 
        'loading...'
        :
        <div className="form__buttons">
            <button className="button" onClick={(event) => this.submitForm(event, true)}>
                Log in
            </button>
            <button className="button" onClick={(event) => this.submitForm(event, false)}>   
                Register
            </button>   
        </div>
    )

    showError = () => (
        this.state.registerError === '' ? 
        null 
        :
        <div className="registerError">
            {this.state.registerError}
        </div> 
    )

    validate = (element) => {
        let error = [true, '']

        if(element.validation.required){
            const valid = element.value.trim() !==''
            const message = `${!valid ? 'This field is required': ''}`
            error = !valid ? [valid, message] : error 
        }

        if(element.validation.password){
            const valid = element.value.length >= 5
            const message = `${!valid ? 'Must be greater or equal to 5': ''}`
            error = !valid ? [valid, message] : error    
            
        }

        if(element.validation.email){
            const valid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(element.value)
            const message = `${!valid ? 'Email is not valid': ''}`
            error = !valid ? [valid, message] : error    
        }
        

        return error
    }

    changeValue = (element) => {
        const newFormData = {
            ...this.state.formdata
        }
        
        const newElement = {
            ...newFormData[element.id]
        }
    
        newElement.value = element.event.target.value
        if(element.blur){
            let validData = this.validate(newElement)
            newElement.valid = validData[0]
            newElement.validationMessage = validData[1]
        }
        newElement.touched = newElement.blur
        newFormData[element.id] = newElement
        
        this.setState({
            formdata: newFormData
        })

    }

    render() {
        const formdata = this.state.formdata
        return (
            <div className="signin">
                <h2 style={{textAlign: "center"}}>Register/Login</h2>
                <form className="form form--signin" onSubmit={(event)=>this.submitForm(event, null)}>
                    <FormField
                        id={'email'}
                        formdata = {formdata.email}
                        change = {(element) => this.changeValue(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata = {formdata.password}
                        change = {(element) => this.changeValue(element)}

                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        );
    }
}

export default SignIn;