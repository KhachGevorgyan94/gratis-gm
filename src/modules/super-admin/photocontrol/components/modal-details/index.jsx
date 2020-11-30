import React, {Component} from 'react';

import './style.scss'
import {ReactSVG} from "react-svg";
import editIcon from '../../../../../assets/images/svg/edit-photo-control.svg'
import closeIcon from '../../../../../assets/images/svg/back-edit.svg'
import Settings from "../../../../../platform/serivces/settings";
import Select from "../../../../../components/select/Select";
import DetailsSlider from "../details-slider";
import ButtonLoader from "../../../../../components/loader-button";
import Modal from "../../../../../components/modal";
import ModalPhotoZoom from "../modal-zoom-image";
import ModalReport from "../modal-report";
import PhotoController from "../../../../../platform/api/photo-control";
import PhotoControlValidation from "../../../../../platform/serivces/validations/photocontrol-validation";
import Slider from "react-slick";
import FullScreenIcon from "../../../../../assets/images/full-screen.png";
import {SaveRejectStatus, Status} from "../photo-control-list/service";
import SaveRejectModal from "../save-reject-modal";

class PhotoControlDetails extends Component {

  state = {
    countryList: [],
    modelList: [],
    isOpenModalZoom: false,
    imagePath: '',
    isOpenReport: false,
    errorList: {
      surname: false,
      name: false,
      driverSerialNumber: false,
      driverCountry: false,
      category: false,
      carNum: false,
      mark: false,
      model: false,
      year: false,
      color: false,
      image1: false,
      image2: false,
      image3: false,
    },
    isDisableEdit: true,
    errorSend: [],
    isCheckedPersonal: false,
    isCheckedCar: false,
    isDisable: true,
    carTariffClassesList: [],
    form: null,
    tariffListToConfirm: [],
    disableVerification: false,
    disableReject: true,
    validationForm: null,
    cloneData: null,
    imageList: [],
    keyList: [],
    activeIndex: 0,
    isSaveReject: false,
    saveRejectType: null
  }


  cloneData = null;

  componentDidMount() {
    if (this.props.data) {
      sessionStorage.setItem('detailsDriver', JSON.stringify(this.props.data))
      this.setState({
        form: Object.assign({}, this.props.data),
        cloneData: Object.assign({}, this.props.data),
        disableVerification: !this.props.data.tariffs.length
      }, () => {
        this.getCarModel()
        this.getTariffList()
        this.createImageList()

      })
    }

  }


  getCarModel = () => {
    let {modelList, form} = this.state
    if (form) {
      modelList = []
      for (const [key, value] of Object.entries(Settings.CarModeList)) {
        if (key === form.mark) {
          value.map(item => {
            modelList.push({name: item.name, value: item.key})
            return true
          })
          this.setState({modelList})
        }
      }
    }
  }

  changeCarMark = (option) => {
    const {form} = this.state
    form.mark = option.value
    form.model = ''

    this.getCarModel()
    this.onChange(form)
  }
  changeCarModel = (option) => {
    const {form} = this.state
    form.model = option.value
    this.onChange(form)
  }
  changeCarColor = (option) => {
    const {form} = this.state
    form.color = option.value
    this.onChange(form)
  }
  changeTransportType = (options) => {
    const {form} = this.state
    form.category = options.name
    form.tariffs = [];
    this.onChange(form)
    this.getTariffList()
  }

  changeCountry = (options) => {
    const {form} = this.state
    form.license.country = options.name
    this.onChange(form)
  }

  changeCarYear = (options) => {
    const {form} = this.state
    form.year = options.name
    this.onChange(form)
  }

  onChange = (form) => {
    this.setState({
      form,
      isDisableEdit: !PhotoControlValidation.isValidation(form).isValidation
    })
    this.validationVerification()

  }


  openModalZoom = (image) => {
    this.setState({isOpenModalZoom: true, imagePath: image})
  }
  closeModalZoom = () => {
    this.setState({isOpenModalZoom: false})
  }
  openModalReport = () => {
    this.setState({isOpenReport: true})
  }
  closeModalReport = () => {
    this.setState({isOpenReport: false})
  }

  onChangeError = (e) => {
    const {errorList} = this.state
    errorList[e.currentTarget.name] = !this.state.errorList[e.currentTarget.name]
    let name = e.currentTarget.name
    this.setState({errorList}, () => {
      this.validationPersonalInformation(name)
      this.validationCarInformation(name)
    })
    this.changeErrorForData(e.currentTarget.name)

  }

  onChangeErrorPersonalInformation = (e) => {
    const {errorList} = this.state
    if (this.state.isCheckedPersonal) {
      errorList.name = false
      errorList.surname = false
      errorList.driverSerialNumber = false
      errorList.driverCountry = false
    } else {
      errorList.name = true
      errorList.surname = true
      errorList.driverSerialNumber = true
      errorList.driverCountry = true
    }
    let name = e.currentTarget.name

    this.setState({
      isCheckedPersonal: !this.state.isCheckedPersonal,
      errorList
    }, () => {
      this.validationPersonalInformation(name)
      this.validationVerification()

    });


  }

  onChangeErrorCarInformation = (e) => {
    const list = this.state.errorSend.slice();
    const {errorList} = this.state
    if (this.state.isCheckedCar) {
      errorList.category = false
      errorList.carNum = false
      errorList.mark = false
      errorList.model = false
      errorList.year = false
      errorList.color = false
    } else {
      errorList.category = true
      errorList.carNum = true
      errorList.mark = true
      errorList.model = true
      errorList.year = true
      errorList.color = true
    }
    let name = e.currentTarget.name

    this.setState({
      isCheckedCar: !this.state.isCheckedCar,
      errorList
    }, () => {
      this.validationVerification()
      this.validationCarInformation(name)
    });


  }

  changeErrorForData = (errorName) => {
    const {errorList} = this.state
    const list = this.state.errorSend.slice();
    const index = list.indexOf(errorName);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(errorName);
    }
    if (errorList.name && errorList.surname && errorList.driverSerialNumber && errorList.driverCountry) {
      this.setState({
        isCheckedPersonal: true
      })
    } else {
      this.setState({
        isCheckedPersonal: false
      })
    }
    if (errorList.category &&
        errorList.carNum &&
        errorList.mark &&
        errorList.model &&
        errorList.year &&
        errorList.color) {
      this.setState({
        isCheckedCar: true
      })
    } else {
      this.setState({
        isCheckedCar: false
      })
    }
    this.setState({errorSend: list}, () => {
      this.validationVerification()

    });

  }

  rejectVerification = async () => {
    const {errorList, form} = this.state
    const arr = []
    for (const [key, value] of Object.entries(errorList)) {
      if (value) {
        arr.push(key)
      }
    }
    if (arr.length) {
      this.setState({errorSend: arr})
      const body = {
        status: "rejected",
        fields: arr,
      };
      const result = await PhotoController.RejectDriver(form.id, body)
      if (result.status) {
        this.props.close()
        this.props.fetchData()

      }

    } else {
      this.openModalReport()
    }
  }

  isEditMode = () => {
    this.setState({isDisable: false})
    const {form} = this.state
    this.setState({
      isDisableEdit: !PhotoControlValidation.isValidation(form).isValidation
    })
  }

  getTariffList = () => {
    const {form} = this.state
    if (form) {
      Settings.TransportTypeList.map(item => {
        if (form.category === item.name) {
          this.setState({
            carTariffClassesList: item.classes
          })
        }
      })
    }
  }

  changeTariffList = (item) => {
    const {form} = this.state
    const list = form.tariffs.slice();
    const index = list.indexOf(item);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(item);
    }
    form.tariffs = list
    // this.setState({
    //   disableVerification: !list.length
    // })

    this.setState({form})
    this.validationVerification()

  }

  changeInput = (e) => {
    const {form} = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.onChange(form)

  }
  validationVerification = () => {
    const {errorList, form} = this.state
    let isValidation = false
    let isReject = true

    for (const [key, value] of Object.entries(errorList)) {
      if (value) {
        isValidation = true
        isReject = false

      }
    }
    if (!form.tariffs.length) {
      isValidation = true
    }
    if (!PhotoControlValidation.isValidation(form).isValidation) {
      isValidation = true
    }
    this.setState({
      disableVerification: isValidation,
      disableReject: isReject
    })
  }

  saveChanges = () => {
    this.setState({
      isDisable: true
    })

  }
  rejectSaveChanges = () => {

    this.setState({
      isDisable: true,
      form: JSON.parse(sessionStorage.getItem('detailsDriver'))
    })
  }

  validationPersonalInformation = (name) => {
    const {errorList, isCheckedPersonal} = this.state
    if (name === 'name' || name === 'surname' || name === 'driverSerialNumber' || name === 'driverCountry' || name === 'personalInformation') {
      errorList.image3 = errorList.name || errorList.surname || errorList.driverCountry || errorList.driverSerialNumber || isCheckedPersonal;
    }
    if (name === 'image3') {
      errorList.name = false;
      errorList.surname = false;
      errorList.driverCountry = false;
      errorList.driverSerialNumber = false
      this.setState({
        isCheckedPersonal: false
      })
      if (errorList.image3) {
        this.setState({
          isCheckedPersonal: true
        })
        errorList.name = true;
        errorList.surname = true;
        errorList.driverCountry = true;
        errorList.driverSerialNumber = true
      }
    }

    this.setState({errorList})
  }

  validationCarInformation = (name) => {
    const {errorList, isCheckedCar} = this.state
    if (name === 'carNum' || name === 'color' || name === 'category' || name === 'model' || name === 'mark' || name === 'year' || name === 'CarInformation') {
      errorList.image1 = false;
      errorList.image2 = false;
      if (errorList.carNum || errorList.color || errorList.category || errorList.model || errorList.mark || errorList.year || isCheckedCar) {
        errorList.image1 = true;
        errorList.image2 = true;
      }
    }
    if (name === 'image2') {
      errorList.carNum = false;
      errorList.category = false;
      errorList.color = false;
      errorList.model = false;
      errorList.mark = false;
      errorList.year = false;
      errorList.image1 = false;
      this.setState({isCheckedCar: false})
      if (errorList.image2) {
        errorList.carNum = true;
        errorList.category = true;
        errorList.color = true;
        errorList.model = true;
        errorList.mark = true;
        errorList.year = true;
        errorList.image1 = true;

        this.setState({isCheckedCar: true})
      }
    }
    this.setState({errorList})


  }

  // images

  createImageList = () => {
    if (this.state.form) {

      const {imageList, keyList} = this.state
      for (const [key, value] of Object.entries(this.state.form.photo)) {
        imageList.push({src: value})
        keyList.push(key)
      }
      this.setState(imageList)

    }
  }


  selectImage = (indexNumber) => {
    this.setState({
      activeIndex: indexNumber
    })
  }

  openSaveRejectModal = (saveRejectType) => {
    this.setState({
      saveRejectType,
      isSaveReject: true
    })
  }
  closeSaveRejectModal = () => {
    this.setState({
      isSaveReject: false
    })
  }

  updateStatusVerification = () => {
  }

  render() {
    const {close} = this.props
    const {imagePath, errorList, isDisable, form, imageList} = this.state
    return form && (
        <div className="P-photo-control-details-block">
          <span className="G-close-modal" onClick={close}/>
          <div className="P-photo-control-details-title G-flex G-align-center ">
            <div className={`P-edit-details ${!isDisable ? 'P-close-svg' : ''}`} onClick={this.isEditMode}>
              <ReactSVG src={isDisable ? editIcon : closeIcon}/>
            </div>
            <h3> {Settings.translations.photo_control_driver_text}
              {form.status === Status.pending ?
                  <p className='P-pending-color'>{Settings.translations.pending_text}</p> : null}
              {form.status === Status.rejected ?
                  <p className='P-reject-color'>{Settings.translations.rejected_text}</p> : null}
              {form.status === Status.orderPending ?
                  <p className='P-order-pending-color'>{Settings.translations.order_in_pending_text}</p> : null}
            </h3>
          </div>

          <p className='P-title-details-modal'><span>ID:</span> {form.userId} <span
              style={{marginLeft: '20px'}}>{Settings.translations.user_id}</span> {form.sequenceNumber}</p>
          <div className="P-photo-control-section G-flex G-align-start">
            <div className="P-photo-control-box ">
              <div className="P-photo-control-box-title G-flex G-align-center">
                <h3>{Settings.translations.personal_information_text}</h3>
                <label className="G-switch">
                  <input type="checkbox" name={'personalInformation'}
                         checked={this.state.isCheckedPersonal}
                         onChange={this.onChangeErrorPersonalInformation}/>
                  <span className="G-slider G-round"/>
                </label>
              </div>
              <div className="P-photo-control-details-inputs">
                <div className={`G-input ${errorList.name ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.user_name}</p>
                  <div className="P-edit-photo-control">
                    <label>
                      <input
                          disabled={isDisable}
                          type="text"
                          name='name'
                          value={form.name}
                          placeholder={Settings.translations.user_name}
                          onChange={this.changeInput}/>
                    </label>
                    <label className="G-switch">
                      <input type="checkbox" name={'name'} checked={errorList.name}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>

                </div>
                <div className={`G-input  ${errorList.surname ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.user_last_name}</p>
                  <div className="P-edit-photo-control">
                    <label>
                      <input
                          disabled={isDisable}

                          type="text"
                          name='surname'
                          value={form.surname}
                          placeholder={Settings.translations.user_last_name}
                          onChange={this.changeInput}/>
                    </label>
                    <label className="G-switch">
                      <input type="checkbox" name={'surname'} checked={errorList.surname}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                </div>
                <div className={`G-input ${errorList.driverSerialNumber ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.user_serial_number}</p>
                  <div className="P-edit-photo-control">
                    <label>
                      <input
                          disabled={isDisable}

                          type="text"
                          name='driverSerialNumber'
                          value={form.driverSerialNumber}
                          placeholder={Settings.translations.user_serial_number}
                          onChange={this.changeInput}/>
                    </label>
                    <label className="G-switch">
                      <input type="checkbox" name={'driverSerialNumber'} checked={errorList.driverSerialNumber}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>

                  </div>

                </div>
                <div className={`G-input ${errorList.driverCountry ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.country_passport}</p>
                  <div className="P-edit-photo-control">
                    <Select placeholder={Settings.translations.select}
                            options={Settings.CountryList}
                            listKey={'value'}
                            useValue={true}
                            value={form.license.country}
                            defaultValue={form.license.country}
                            placeholderOpacity={true}
                            isAllList={true}
                            disabled={isDisable}

                            onChange={this.changeCountry}/>

                    <label className="G-switch">
                      <input type="checkbox" name={'driverCountry'} checked={errorList.driverCountry}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                </div>
              </div>
              <div className="P-photo-control-box-title G-flex G-align-center">
                <h3>{Settings.translations.car_photo_control_text}</h3>
                <label className="G-switch">
                  <input type="checkbox" name={'CarInformation'} checked={this.state.isCheckedCar}
                         onChange={this.onChangeErrorCarInformation}/>
                  <span className="G-slider G-round"/>
                </label>
              </div>
              <div className="P-photo-control-details-inputs">
                <div className={`G-input ${errorList.category ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.category_text}</p>
                  <div className="P-edit-photo-control">

                    <Select placeholder={Settings.translations.select}
                            options={Settings.TransportTypeList}
                            listKey={'name'}
                            useValue={true}
                            value={form.category}
                            defaultValue={form.category}
                            placeholderOpacity={true}
                            isAllList={true}
                            disabled={isDisable}

                            onChange={this.changeTransportType}/>

                    <label className="G-switch">
                      <input type="checkbox" name={'category'} checked={errorList.category}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                </div>
                <div className={`G-input ${errorList.carNum ? 'G-error-edit' : ''} `}>
                  <p>{Settings.translations.number_car_text}</p>
                  <div className="P-edit-photo-control">
                    <label>
                      <input
                          disabled={isDisable}

                          type="text"
                          name='carNum'
                          value={form.carNum}
                          placeholder={Settings.translations.user_last_name}
                          onChange={this.changeInput}/>
                    </label>
                    <label className="G-switch">
                      <input type="checkbox" name={'carNum'} checked={errorList.carNum}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                </div>
                <div className={`G-input ${errorList.mark ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.motel_car_text}</p>
                  <div className="P-edit-photo-control">
                    <Select placeholder={Settings.translations.select}
                            options={Settings.CarMarkList}
                            listKey={'name'}
                            useValue={true}
                            value={form.mark}
                            defaultValue={form.mark}
                            placeholderOpacity={true}
                            isAllList={true}
                            disabled={isDisable}

                            onChange={this.changeCarMark}/>
                    <label className="G-switch">
                      <input type="checkbox" name={'mark'} checked={errorList.mark}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>

                  </div>

                </div>
                <div className={`G-input ${errorList.model ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.user_car_model}</p>
                  <div className="P-edit-photo-control">
                    <Select placeholder={Settings.translations.select}
                            options={this.state.modelList}
                            listKey={'value'}
                            useValue={true}
                            value={form.model}
                            defaultValue={form.model}
                            placeholderOpacity={true}
                            isAllList={true}
                            disabled={isDisable}

                            onChange={this.changeCarModel}/>
                    <label className="G-switch">
                      <input type="checkbox" name={'model'} checked={errorList.model}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                </div>
                <div className={`G-input ${errorList.color ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.color_text}</p>
                  <div className="P-edit-photo-control">
                    <Select placeholder={Settings.translations.select}
                            options={Settings.CarColorList}
                            listKey={'value'}
                            useValue={true}
                            value={form.color}
                            defaultValue={form.color}
                            placeholderOpacity={true}
                            isAllList={true}
                            disabled={isDisable}

                            onChange={this.changeCarColor}/>
                    <label className="G-switch">
                      <input type="checkbox" name={'color'} checked={errorList.color}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                </div>
                <div className={`G-input ${errorList.year ? 'G-error-edit' : ''}`}>
                  <p>{Settings.translations.year_car_text}</p>
                  <div className="P-edit-photo-control">
                    <Select placeholder={Settings.translations.select}
                            options={Settings.YearList}
                            listKey={'value'}
                            useValue={true}
                            value={form.year}
                            defaultValue={form.year}
                            placeholderOpacity={true}
                            isAllList={true}
                            disabled={isDisable}

                            onChange={this.changeCarYear}/>
                    <label className="G-switch">
                      <input type="checkbox" name={'year'} checked={errorList.year}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                </div>
              </div>
              <div className="P-photo-control-box-title">
                <h3>{Settings.translations.tariff_text}</h3>
              </div>
              <div className='P-photo-control-details-inputs G-flex G-align-center'>
                {this.state.carTariffClassesList ? this.state.carTariffClassesList.map((item, index) => {

                  return <div className="G-new-checkbox" key={index}>
                    <label>
                      <input type="checkbox" checked={form.tariffs.includes(item.name)}
                             onChange={() => this.changeTariffList(item.name)}/>
                      <span/>
                      <p>{item.name}</p>
                    </label>
                  </div>
                }) : null}

              </div>
            </div>
            <div className="P-photo-control-box">
              <DetailsSlider sliderList={form.photo} activeIndex={this.state.activeIndex}/>
              <div className="P-edit-images-section">
                <div className="P-edit-images-box G-flex">
                  <div className="P-edit-images-left G-flex G-align-start G-justify-center">
                    <label className="G-switch">
                      <input type="checkbox" name={'image1'} checked={errorList.image1}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                  <div className="P-edit-images-right">
                    <ul>
                      <li>
                        <h3>{Settings.translations.before_car_text}</h3>
                        <div className="P-image-edit G-image-cover" onClick={() => this.selectImage(0)}
                             style={{backgroundImage: `url('${form.photo.front}')`}}/>
                      </li>
                      <li>
                        <h3>{Settings.translations.back_view_car_text}</h3>
                        <div className="P-image-edit G-image-cover" onClick={() => this.selectImage(2)}
                             style={{backgroundImage: `url('${form.photo.back}')`}}/>
                      </li>
                      <li>
                        <h3>{Settings.translations.left_side_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(1)}
                             style={{backgroundImage: `url('${form.photo.left_side}')`}}/>
                      </li>
                      <li>
                        <h3>{Settings.translations.right_side_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(3)}
                             style={{backgroundImage: `url('${form.photo.right_side}')`}}/>
                      </li>
                      <li>
                        <h3>{Settings.translations.salon_A_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(4)}
                             style={{backgroundImage: `url('${form.photo.salon_a}')`}}/>
                      </li>
                      <li>
                        <h3>{Settings.translations.salon_B_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(5)}
                             style={{backgroundImage: `url('${form.photo.salon_b}')`}}/>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
              <div className="P-edit-images-section G-flex G-flex-wrap">
                <div className="P-edit-images-box G-flex">
                  <div className="P-edit-images-left G-flex G-align-start G-justify-center">
                    <label className="G-switch">
                      <input type="checkbox" name={'image2'} checked={errorList.image2}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                  <div className="P-edit-images-right">
                    <ul>
                      <li>
                        <h3>{Settings.translations.passport_A_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(8)}
                             style={{backgroundImage: `url('${form.photo.tech_pass}')`}}/>
                      </li>
                      <li>
                        <h3>{Settings.translations.passport_B_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(9)}
                             style={{backgroundImage: `url('${form.photo.tech_pass_b}')`}}/>
                      </li>

                    </ul>
                  </div>
                </div>
                <div className="P-edit-images-box G-flex">
                  <div className="P-edit-images-left G-flex G-align-start G-justify-center">
                    <label className="G-switch">
                      <input type="checkbox" name={'image3'} checked={errorList.image3}
                             onChange={this.onChangeError}/>
                      <span className="G-slider G-round"/>
                    </label>
                  </div>
                  <div className="P-edit-images-right">
                    <ul>
                      <li>
                        <h3>{Settings.translations.driver_rights_A_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(6)}
                             style={{backgroundImage: `url('${form.photo.license}')`}}/>
                      </li>
                      <li>
                        <h3>{Settings.translations.driver_rights_B_car_text}</h3>
                        <div className="P-image-edit G-image-cover"
                             onClick={() => this.selectImage(7)}
                             style={{backgroundImage: `url('${form.photo.license_b}')`}}/>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isDisable ? <div className="P-edit-photo-control-btn G-flex G-flex-wrap G-align-center G-justify-center">
            <ButtonLoader
                buttonText={Settings.translations.verify_text}
                isLoading={false}
                disable={this.state.disableVerification}
                // onClick={this.props.close}
                onClick={() => this.openSaveRejectModal(SaveRejectStatus.verification)}

                classChange={'P-edit-photo-control-verify'}
            />
            <ButtonLoader
                buttonText={Settings.translations.reject_verify_text}
                isLoading={false}
                disable={this.state.disableReject}
                // onClick={this.rejectVerification}
                onClick={() => this.openSaveRejectModal(SaveRejectStatus.reject)}

                classChange={'P-edit-photo-control-reject'}
            />
            <ButtonLoader
                buttonText={Settings.translations.close_verify_text}
                isLoading={false}
                onClick={this.props.close}
                classChange={'P-edit-photo-control-close'}
            />

          </div> : null}
          {!isDisable ? <div className="P-edit-photo-control-btn G-flex G-flex-wrap G-align-center G-justify-center">
            <ButtonLoader
                buttonText={Settings.translations.save_changes}
                isLoading={false}
                disable={this.state.isDisableEdit}
                // onClick={this.saveChanges}
                onClick={() => this.openSaveRejectModal(SaveRejectStatus.save)}
                classChange={'P-edit-photo-control-verify'}
            />

            <ButtonLoader
                buttonText={Settings.translations.reject_edit}
                isLoading={false}
                onClick={this.rejectSaveChanges}

                classChange={'P-edit-photo-control-close'}
            />

          </div> : null}

          <Modal isOpen={this.state.isOpenModalZoom}
                 close={this.closeModalZoom}
                 changeClass='G-modal-zoom-images'>
            <ModalPhotoZoom image={imagePath} close={this.closeModalZoom}/>
          </Modal>

          <Modal isOpen={this.state.isOpenReport}
                 close={this.closeModalReport}
                 changeClass='G-modal-report'>
            <ModalReport/>
          </Modal>
          <Modal changeClass={'P-save-reject-modal-container'} isOpen={this.state.isSaveReject} close={this.closeSaveRejectModal}>
            <SaveRejectModal  saveRejectStatus={this.state.saveRejectType} updateStatus={this.updateStatusVerification} close={this.closeSaveRejectModal}/>
          </Modal>
        </div>
    );
  }
}

export default PhotoControlDetails;
