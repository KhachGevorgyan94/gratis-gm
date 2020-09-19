
class SignInValidation {

  static isValidation = (form) => {
    let isValidation = true
    const errorList = {
      login: false,
      password: false,
      incorrectPassword: false
    }

    if (!form.login.length) {
      errorList.login = true
      isValidation = false
    }

    if (!form.password.length) {
      errorList.password = true
      isValidation = false
    }
    if (form.password.length && form.password.length < 6) {
      errorList.incorrectPassword = true
      isValidation = false
    }

    return {
      isValidation: isValidation,
      errorList: errorList
    }
  }


}


export default SignInValidation
