import React, { Component } from 'react';

import {firebase} from '../../../firebase'

import FileUploader from 'react-firebase-file-uploader'

class fileuploader extends Component {

    state ={
        name: '',
        isUploading: false,
        progess: 0,
        fileUrl: ''
    }

    handleUploadStart = () => {
        
        this.setState({
            isUploading: true,
            progess: 0
        })
    }

    handleUploadError = (error) =>{
        console.log('error')
        this.setState({
            isUploading: false,

        })
        console.log(error)
    }

    handleUploadProgress = (progress) => {
        this.setState({
            progress
        })
    }

    handleUploadSuccess = (filename) => {
        
        this.setState({
            name: filename,
            isUploading: false,
            progress: 100
        })

        firebase.storage().ref(`images`)
        .child(filename).getDownloadURL()
        .then(url => {
            this.setState({
                fileUrl: url
            })
        })

        this.props.fileNameCatch(filename)
    }

    render() {
        return (
            <div className="fileuploader" style={{
                display: 'flex',
                marginBottom: '20px',
                flexFlow: 'column'
            }}>
                <FileUploader
                    accept= "image/*"
                    name= "image"
                    randomizeFilename
                    storageRef= {firebase.storage().ref('images')}
                    onUploadStart= {this.handleUploadStart}
                    onUploadError= {this.handleUploadError}
                    onUploadSuccess= {this.handleUploadSuccess}
                    onProgress= {this.handleUploadProgress}
                />

                {this.state.isUploading ? 
                    <p>Progress: {this.state.progess}</p>
                    :
                    null
                }
                {this.state.fileUrl ?
                    (<img style={{width: '300px', padding: '20px'}} src={this.state.fileUrl} alt=""/>)
                    :
                    null
                }
            </div>
        );
    }
}

export default fileuploader;