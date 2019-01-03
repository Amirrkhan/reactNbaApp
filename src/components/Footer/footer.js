import React, { Component } from 'react';

import './footer.sass'
import {CURRENT_YEAR} from '../../config'

class Footer extends Component {

    

    render() {
        return (
            <footer className="footer">
                {this.props.logo}
                <div className="footer__text">
                    @NBA {CURRENT_YEAR}. All rights reserved.
                </div>
            </footer>
        );
    }
}

export default Footer;