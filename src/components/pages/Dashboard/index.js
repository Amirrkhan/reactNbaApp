import React, { Component } from 'react';

import './dashboard.sass'
import FormField from '../../widgets/formFields/formField'
import FileUploader from '../../widgets/FileUploader/fileuploader'

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import {firebaseTeams, firebaseArticles, firebaseLooper, firebase} from '../../../firebase'

class Dashboard extends Component {

    state ={
        editorState: EditorState.createEmpty(),
        postError: '',
        loading: false,
        formData: {
            author:{
                element: 'input',
                value: '',
                label: false,
                labelText: "",
                config: {
                    name: "author_input",
                    type: "text",
                    placeholder: "Enter your name"
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            title: {
                element: 'input',
                value: '',
                label: false,
                labelText: "",
                config: {
                    name: "title_input",
                    type: "text",
                    placeholder: "Enter title of article"
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },          

            body: {
                element: 'texteditor',
                value: '',
                label: false,
                labelText: "",
                valid: true,
                
            },
            team: {
                element: 'select',
                value: '',
                label: true,
                labelText: "Team:",
                config:{
                    name: 'team_select',
                    id: 'team_select',   
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                optionValues: []
            },
            tags: {               
                element: 'input',
                value: '',
                label: false,
                labelText: "",
                config: {
                    name: "tags_input",
                    type: "text",
                    placeholder: "Enter tags"
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ""  
            },
            image: {
                element: 'image',
                value: '',
                valid: true
            }

        }
    }

    componentDidMount(){
        firebaseTeams.once('value')
        .then((snapshot) => {
            if(this.state.formData.team){
                
            
            const teams = firebaseLooper(snapshot)
            const optionValues = teams.map((item, i)=>{
                return {val: i+1, text: item.name}
            })


            const formData = this.state.formData
            formData['team'].optionValues = optionValues
            
            this.setState({
                formData
            })
            }
            
        })
    }

    validate = (element) => {
        let error = [true, '']
        
        if(element.validation.required){
            const valid = element.value.trim() !==''
            const message = `${!valid ? 'This field is required': ''}`
            error = !valid ? [valid, message] : error 
        }

        return error;
    }

    submitForm = (event) => {

        event.preventDefault()
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value
                }
        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid
        }
        
        

        if(formIsValid){
            
            this.setState({
                loading: true, 
                postError: '',
            })

            firebaseArticles.orderByChild("id")
            .limitToLast(1).once('value')
            .then(snapshot => {
                let articleId = null

                snapshot.forEach((childSnapshot) => {
                    articleId = childSnapshot.val().id
                })
                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSubmit['id'] = articleId + 1
                dataToSubmit['team'] = parseInt(dataToSubmit['team'], 10)

                firebaseArticles.push(dataToSubmit)
                .then((article) => {
                    this.props.history.push(`/article/${article.key}`)
                }).catch( e => {
                    this.setState({
                        postError: e.message
                    })
                })
            })
            
            
        } else {
            this.setState({
                postError: 'You did not fill required field'
            })
        }

    }

    submitButton = () => (
        this.state.loading ? 
        'loading...'
        :
        <div className="form__buttons">
            <button className="button button__post" 
                onClick={(event) => this.submitForm(event, false)}
            >   
                Post
            </button>   
        </div>
    )

    showError = () => (
        this.state.postError === '' ? 
        null 
        :
        <div className="registerError">
            {this.state.postError}
        </div> 
    )
    
    changeValue = (element, content = '') => {
        
        const newFormData = {
            ...this.state.formData
        }
        
     
        const newElement = {
            ...newFormData[element.id]
        }

        if(content === ''){
            newElement.value = element.event.target.value
        } else{
            newElement.value = content
        }
        
        
        if(element.blur){
            let validData = this.validate(newElement)
            newElement.valid = validData[0]
            newElement.validationMessage = validData[1]
        }
        newElement.touched = newElement.blur
        newFormData[element.id] = newElement
        this.setState({
            formData: newFormData
        })
    }

    storeFilename = (filename) => {
        this.changeValue({id: 'image'}, filename)
    }

    onEditorStateChange = (editorState) =>{

        let contentState = editorState.getCurrentContent()
        
        let html = stateToHTML(contentState)
       
        this.changeValue({
            id: 'body'
        }, html)

        this.setState({
            editorState
        })
    }

    render() {
        const formData = this.state.formData;
        
        return (
            <div className="dashboard">
                <div className="post__container">
                    <form action="" className="form form--post" onSubmit={this.submitForm}>
                        <h2>Add post</h2>

                        <FileUploader
                            fileNameCatch ={(filename) => this.storeFilename(filename)}
                        />

                        <FormField
                            id={'author'}
                            formdata = {formData.author}
                            change = {(element) => this.changeValue(element)}
                        />
                        <FormField
                            id={'title'}
                            formdata = {formData.title}
                            change = {(element) => this.changeValue(element)}
                        />

                        <Editor
                        
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="myEditor--wrapper"
                            editorClassName="myEditor--editor"
                            onEditorStateChange={this.onEditorStateChange}

                        />
                        <br/>
                        <FormField
                            id={'team'}
                            formdata = {formData.team}
                            change = {(element) => this.changeValue(element)}
                        />
                        <FormField
                            id={'tags'}
                            formdata = {formData.tags}
                            change = {(element) => this.changeValue(element)}
                        />

                        

                        {this.submitButton()}
                        {this.showError()}
                    </form>
                </div>
            </div>
        );
    }
}

export default Dashboard;