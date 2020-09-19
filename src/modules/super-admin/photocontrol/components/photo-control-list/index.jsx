import React, {Component} from 'react';
import './style.scss'
import Settings from "../../../../../platform/serivces/settings";
import EmptyList from "../empty-list";

class PhotoControlList extends Component {


  render() {
    const {data} = this.props
    return (
        <div className="P-photo-control-table-block">
          {console.log(data)}
          {data && data.length ?
              <div className="G-table-block">
                <div className="G-overflow-table">
                  <div className="G-table-header">
                    <div className="G-table-tr">
                      <div className="G-table-td">
                        <p>{Settings.translations.information_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.before_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.left_side_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.back_view_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.right_side_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.salon_A_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.salon_B_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.passport_A_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.passport_B_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.driver_rights_A_car_text}</p>
                      </div>
                      <div className="G-table-td">
                        <p>{Settings.translations.driver_rights_B_car_text}</p>
                      </div>
                    </div>
                  </div>
                  <div className="G-table-body">
                    {data.map((item, index) => {
                      return <div className="G-table-tr" key={index}>
                        <div className="G-table-td">
                          <h3>N: {item.sequenceNumber}</h3>
                          <h3>ID: {item.userId}</h3>
                          <h3>{Settings.translations.name_text}: {item.surname} {item.name}</h3>
                          <p><span>{Settings.translations.model_text}:</span> {item.mark} {item.model}</p>
                          <p><span>{Settings.translations.car_text}:</span> {item.carNum}</p>
                          <p><span>{Settings.translations.color_text}:</span> {item.color}</p>
                          <p><span>{Settings.translations.year_car_text}:</span> {item.year}</p>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.front}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.left_side}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.back}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.right_side}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.salon_a}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.salon_b}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.tech_pass}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.tech_pass_b}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.license}')`}}/>
                        </div>
                        <div className='G-table-td'>
                          <div className="P-car-images G-image-contain" style={{backgroundImage:`url('${item.photo.license_b}')`}}/>
                        </div>
                      </div>
                    })}

                  </div>
                </div>
              </div> :
              <EmptyList/>
          }
        </div>
    );
  }
}

export default PhotoControlList;
