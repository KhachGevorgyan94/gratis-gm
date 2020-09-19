import React, {Component} from 'react';

import './style.scss';
import './responsive.scss';

import ROUTES from "../../platform/constants/routes";
import Settings from "../../platform/serivces/settings";
import ButtonLoader from "../loader-button";
import AdminController from "../../platform/api/auth";
import CashBoxController from "../../platform/api/cashBox";
import ShiftController from "../../platform/api/shift";
import DeviceController from "../../platform/api/device";
import PersonController from "../../platform/api/person";


class ModalDelete extends Component {

  state = {
    isLoading:false,
    firstClick:false
  }
  submit = async ()=>{
    if(!this.state.firstClick){
      this.state.firstClick = true
      this.setState({isLoading:true},async ()=>{
        if(this.props.isDelete==='branch'){
          const result = await AdminController.DeleteBranch(this.props.deletedId)
          if(result.success){
            this.setState({firstClick:false,isLoading:false,});
            this.props.close();
            this.props.onChange();
          }
        }
        if(this.props.isDelete==='cashier'){
          const result = await CashBoxController.DeleteCashBox(this.props.deletedId)
          if(result.success){
            this.setState({firstClick:false,isLoading:false,});
            this.props.close();
            this.props.onChange();
          }
        }
        if(this.props.isDelete==='cashier-user'){
          console.log(this.props.deletedId)
          const result = await ShiftController.DeleteShift(this.props.deletedId)
          if(result.success){
            this.setState({firstClick:false,isLoading:false,});
            this.props.close();
            this.props.onChange();
          }
        }
        if(this.props.isDelete==='device'){
          console.log(this.props.deletedId)
          const result = await DeviceController.DeleteDevice(this.props.deletedId)
          if(result.success){
            this.setState({firstClick:false,isLoading:false,});
            this.props.close();
            this.props.onChange();
          }
        }
        if(this.props.isDelete==='director'){
          const result = await PersonController.DeleteDirector(this.props.deletedId)
          if(result.success){
            this.setState({firstClick:false,isLoading:false,});
            this.props.close();
            this.props.onChange();


          }
        }
      })
    }




  }

    render() {
      const {isDelete, isLoading, close} = this.props
        return (
            <div className="L-delete-branch-modal-block">
               <div className="L-delete-branch">
                 {isDelete==='branch'?
                     <>
                       <h3>{Settings.translations.delete_branch_title}</h3>
                       <p>{Settings.translations.delete_branch_description}</p>
                     </>
                     :null}
                 {isDelete==='director'?
                     <>
                       <h3>{Settings.translations.delete_director_title}</h3>
                        <p>{Settings.translations.delete_director_description}</p>
                     </>
                     :null}
                 {isDelete==='cashier'?
                     <>
                       <h3>{Settings.translations.delete_cashier_title}</h3>
                       <p>{Settings.translations.delete_cashier_description}</p>
                     </>
                    :null}
                    {isDelete==='device'?
                     <>
                       <h3>{Settings.translations.delete_device_title}</h3>
                       <p>{Settings.translations.delete_devicr_description}</p>
                     </>
                    :null}
                    {isDelete==='cashier-user'?
                     <>
                       <h3>{Settings.translations.delete_cashier_user}</h3>
                     </>
                    :null}

                 <div className="G-select-btn-block G-flex G-align-center G-justify-end">
                   <p onClick={close} className='G-cancel-btn'>{Settings.translations.cancel}</p>
                   <ButtonLoader
                       buttonText={Settings.translations.accept_delete}
                       isLoading={isLoading}
                       onClick={this.submit}
                       classChange={'L-accept-btn'}
                   />
                 </div>
               </div>
            </div>
        );
    }
};

export default ModalDelete;
