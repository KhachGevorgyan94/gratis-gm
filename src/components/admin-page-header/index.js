import React, {Component} from 'react';
import './style.scss';
import './responsive.scss';
import Modal from "../modal";
import ModalLogOut from "../modal-log-out";
import Settings from "../../platform/serivces/settings";
import Select from "../select/Select";
import ButtonLoader from "../loader-button";

export const LanguageList = [
  {
    name: 'Eng',
    value: 'English'
  },
  {
    name: 'Հայ',
    value: 'Armenian'
  },
  {
    name: 'Рус',
    value: 'Russian'
  }
];

class HeaderComponent extends Component {

  state = {
    defaultLanguage: {
      name: '',
      value: ''
    },
    isOpenLogOut: false
  }


  openMenu = () => {
    window.dispatchEvent(new CustomEvent('openMenu'));
  }

  openModal = () => {
    this.setState({isOpenLogOut: true})
  }
  closeModal = () => {
    this.setState({isOpenLogOut: false})
  }

  componentDidMount() {
    // if (localStorage.getItem('Language')) {
    //     LanguageList.forEach((item) => {
    //         if (item.value === localStorage.getItem('Language')) {
    //             this.setState({
    //                 defaultLanguage: {
    //                     name: item.name,
    //                     value: item.value,
    //                 }
    //             })
    //         }
    //     })
    // }
  }

  changeLanguage = async (language) => {
    Settings.language = language
  }

  render() {
    const {headerTitle} = this.props;
    const {defaultLanguage} = this.state;
    return (
        <div className="G-admin-header G-flex G-align-center G-justify-between">
          <div className="P-open-menu" onClick={this.openMenu}>
            <span/>
            <span/>
            <span/>
          </div>
          <div className="G-admin-title">
            <h3>{headerTitle}</h3>
          </div>
          <div className="P-header-settings G-flex G-align-center">
            <div className="P-select-language">
              {defaultLanguage.name ? <Select placeholder={Settings.translations.language}
                                              defaultValue={defaultLanguage.name}
                                              list={LanguageList} listKey={'value'}
                                              output={this.changeLanguage}/> : null}
            </div>
            <ButtonLoader
                buttonText={Settings.translations.log_out_text}
                isLoading={false}
                onClick={this.openModal}
                classChange={'L-log-out-btn'}
            />
          </div>

          <Modal isOpen={this.state.isOpenLogOut}
                 close={this.closeModal}
                 changeClass='G-delete-modal'>
            <ModalLogOut isEdit={false} close={this.closeModal}/>
          </Modal>

        </div>

    );
  }
};
export default HeaderComponent;
