import React, {Component} from 'react'


class Button extends Component {


    render(){
        return(
            <button className={this.props.className} onClick={this.props.action}>
                {this.props.buttonText}
            </button>
        )
    }
}

export default Button