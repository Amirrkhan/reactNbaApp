import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'

import Routes from './routes'

const App = () => {
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

// import React from 'react'
// import ReactDOM from 'react-dom'

// import MyTransition from './functions/transition'

// import Elements from './functions/elements'



// const App = (props) => {


//     return(
//         <div>
//             <MyTransition
                
//             >
//                 <Elements/>
                
//             </MyTransition>
//         </div>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'))