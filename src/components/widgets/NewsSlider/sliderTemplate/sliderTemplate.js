import React, { Component } from 'react';

import {Link} from 'react-router-dom'

class SliderTemplate extends Component {

    state = {
        moveWidth: 0,
        sliderMaxWidth: ((this.props.items-1) * this.props.slideWidth),
        news: [],
        
    }

    
    
    slideCreate = () => {
        
        const listOfSlides = this.props.news.map((item, i) =>{
            
            return(
                <Link to={`article/${item.id}`}>
                <div className="slider__item slider" id={`slide-${i}`} key={item.id}
                    
                    style={{
                        backgroundImage:`url(${item.image})`,
                        width: `${this.props.slideWidth}px`,
                        position: 'relative',
                    }}
                >
                    
                        <div className="slider__title">{item.title}</div>
                    
                    
                </div>
                </Link>
            )
        })
        return listOfSlides
    }

    componentDidUpdate(){
        
        const slideWrapper = document.querySelector(".slider__wrapper")
        slideWrapper.style.transform = `translateX(${this.state.moveWidth}px)`
        
    }

    slideMove = (event) => {
        
        if(event.target.id === 'slider__button--next'){

            if(this.state.moveWidth === -(this.state.sliderMaxWidth)){
                this.setState({moveWidth: 0})
            }

            else
            {
                this.setState({moveWidth: this.state.moveWidth- this.props.slideWidth})
            }
        }
        else if(event.target.id === 'slider__button--prev'){
            
            if(this.state.moveWidth === 0){
                this.setState({moveWidth: -(this.state.sliderMaxWidth)})
            }
            else
            {    
                
                this.setState({moveWidth: this.state.moveWidth + this.props.slideWidth})
            }
        }

        
    }

    render() {  
        return (
            <div className="slider">
            <div className ="slider__wrapper" style={{width:`${this.props.slideWidth}`}}>
                {this.slideCreate()}
            </div>
            <button className="slider__button slider__button--prev" id='slider__button--prev'
                    onClick={this.slideMove}
                >{this.props.prevButtonText}</button>
                <button className="slider__button slider__button--next" id='slider__button--next'
                    onClick={this.slideMove}
                >{this.props.nextButtonText}</button>
            </div>
        );
    }
}

export default SliderTemplate;