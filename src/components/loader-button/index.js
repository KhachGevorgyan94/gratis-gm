import React, {Component} from 'react';

import './style.scss';

class ButtonLoader extends Component {

  render() {
    const {classChange, buttonText, isLoading, onClick,disable} = this.props;

    return (
        <div className={`G-btn ${classChange} `}>

          <button onClick={!disable? onClick: ()=>{}} disabled={disable}>
            {isLoading ? <div className="L-loader-animation">
              <div className="sk-fading-circle">
                <div className="sk-circle1 sk-circle"/>
                <div className="sk-circle2 sk-circle"/>
                <div className="sk-circle3 sk-circle"/>
                <div className="sk-circle4 sk-circle"/>
                <div className="sk-circle5 sk-circle"/>
                <div className="sk-circle6 sk-circle"/>
                <div className="sk-circle7 sk-circle"/>
                <div className="sk-circle8 sk-circle"/>
                <div className="sk-circle9 sk-circle"/>
                <div className="sk-circle10 sk-circle"/>
                <div className="sk-circle11 sk-circle"/>
                <div className="sk-circle12 sk-circle"/>
              </div>
            </div> : <p>{buttonText}</p>}
          </button>
        </div>
    );
  }
}

export default ButtonLoader;
