import React, { Component } from 'react';
import axios from 'axios'

import {URL} from '../config'



class Elements extends Component {

    state = {
        items: [],
        start: 0,
        amount: 3
    }

    getData = (start, end) => {
        
        axios.get(`${URL}${'articles'}?_start=${start}&_end=${end}`).then(response => {
            this.setState({
                items: [...this.state.items,...response.data]
            })
        })
    }

    componentWillMount(){
        let start = this.state.start
        let end = this.state.amount
        this.getData(start, end)
    }

    loadMore = () => {
        let start = this.state.amount
        let end = start + this.state.amount
        this.getData(start, end)
        this.setState({
            amount: this.state.amount + end
        })

    }

    addTemplate = () => {

        let template = this.state.items.map((item)=>{
            return(
                <div className="element" key={item.id} style={{display: 'flex', flexFlow: 'column', alignItems: 'center', border: '1px solid #000', padding: '5px 20px'}}>
                    <div className="element__caption">
                        <h2>{item.title}</h2>
                    </div>
                    <div className="element__text">
                        {item.body}
                    </div>
                </div>
            )
        })

        return template
    }

    render() {
        return (
            <div>
                {this.addTemplate()}
                <button onClick={this.loadMore} style={{display:'inline-flex', width:'100%', justifyContent:'center'}}>Load more</button>
            </div>
        );
    }
}

export default Elements;