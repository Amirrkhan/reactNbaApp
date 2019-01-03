import React, { Component } from 'react';

import './transition.sass'

class MyTransition extends Component {

    state = {
        elementAdded: false,
        transitionToggle: 'transition__hidden',
        childrenChanged: this.props.children
    }

    addElement = () => {
        //console.log(React.Children.toArray(this.props.children).length)
        console.log(React.Children.count(this.props.children))

    }
    

    render() {

        return (
            <div className="transition">
                {this.props.children}
                {console.log(this.props.children)}
                {this.addElement()}
            </div>
        );
    }
}

export default MyTransition;