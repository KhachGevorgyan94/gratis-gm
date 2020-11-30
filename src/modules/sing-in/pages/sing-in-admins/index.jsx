import React, {Component} from 'react';
import logoImage from '../../../../assets/images/logo.png';
import Settings from "../../../../platform/serivces/settings";
import ButtonLoader from "../../../../components/loader-button";
import SignInValidation from "../../../../platform/serivces/validations/sign-in-validation";
import {toast} from 'react-toastify';
import AuthController from "../../../../platform/api/auth";

class SignIn extends Component {

  state = {
    isLoading: false,
    firstClick: false,
    validation: null,
    form: {
      login: '',
      password: ''
    }
  }

  changeInput = (e) => {
    const {form} = this.state;
    form[e.currentTarget.name] = e.currentTarget.value;
    this.setState({form, isLoading: false})
  };
  submit = async () => {
    const {form} = this.state;
    this.setState({
      isLoading: true,
      validation: SignInValidation.isValidation(form)
    }, async () => {
      if (this.state.validation.isValidation) {
        const result = await AuthController.logIn(form);
        if (result.status) {
          localStorage.setItem('token', result.token)
          localStorage.setItem('role', 'SuperAdmin')
          window.location.reload();
        } else {
          toast.error(Settings.translations.error_log_in, {
            position: toast.POSITION.TOP_RIGHT
          });
          const {validation} = this.state

          validation.errorList.login = true
          validation.errorList.password = true
          this.setState({validation, isLoading: false})
        }

      } else {
        this.errorMessages(this.state.validation.errorList)
        this.setState({isLoading: false})
      }
    })
  }


  errorMessages = (errorList) => {

    if (errorList.login) {
      toast.error(Settings.translations.error_empty_login, {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    if (errorList.password) {
      toast.error(Settings.translations.error_empty_password, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    if (errorList.incorrectPassword) {
      toast.error(Settings.translations.error_incorrect_password, {
        position: toast.POSITION.TOP_RIGHT
      });
    }

  }


  render() {
    const {isLoading, validation} = this.state
    return (
        <div className="G-sign-in-container G-flex G-align-center G-justify-center">

          <div className="G-sign-in-box">
            <div className="G-logo G-image-contain" style={{backgroundImage: `url('${logoImage}')`}}/>

            <div className="G-sign-in-inputs">
              <div
                  className={`G-input ${validation?.errorList.login ? 'G-error' : ''}`}>
                <p>{Settings.translations.log_in_text}</p>
                <label>
                  <input
                      type="text"
                      name='login'
                      placeholder={Settings.translations.log_in_text}
                      onChange={this.changeInput}/>
                </label>
              </div>
              <div
                  className={`G-input  ${validation?.errorList.password || validation?.errorList.incorrectPassword ? 'G-error' : ''}`}>
                <p>{Settings.translations.password}</p>
                <label>
                  <input type="password"
                         name='password'
                         placeholder={Settings.translations.password_text}
                         onChange={this.changeInput}/>
                </label>
              </div>

              <ButtonLoader
                  classChange={'G-sign-in-btn'}
                  buttonText={Settings.translations.sign_in}
                  isLoading={isLoading}
                  onClick={this.submit}
              />
            </div>
          </div>
        </div>

    );
  }
}
;

export default SignIn;
