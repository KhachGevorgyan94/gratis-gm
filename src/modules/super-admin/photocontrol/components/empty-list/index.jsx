import React, {Component} from 'react';
import './style.scss'
import Settings from "../../../../../platform/serivces/settings";
import  emptyImg from '../../../../../assets/images/picture.png';
class EmptyList extends Component {


  render() {
    return (
        <div className="P-empty-photo-control G-flex-column G-align-center G-justify-center">
          <div className="P-empty-photo-control-image G-image-contain" style={{backgroundImage:`url('${emptyImg}')`}}/>
          <h3>{Settings.translations.empty_photo_control_text}</h3>


        </div>
    );
  }
}

export default EmptyList;
