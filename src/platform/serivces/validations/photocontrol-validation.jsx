
class PhotoControlValidation {

  static isValidation = (form) => {
    let isValidation = true

    const errorList = {
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
    }

    if (!form.surname.length) {
      errorList.surname = true
      isValidation = false
    }
    if (!form.name.length) {
      errorList.name = true
      isValidation = false
    }
    if (!form.driverSerialNumber.length) {
      errorList.driverSerialNumber = true
      isValidation = false
    }
    if (!form.driverCountry.length) {
      errorList.driverCountry = true
      isValidation = false
    }
    if (!form.category) {
      errorList.category = true
      isValidation = false
    }
    if (!form.carNum.length) {
      errorList.carNum = true
      isValidation = false
    }
    if (!form.mark) {
      errorList.mark = true
      isValidation = false
    }
    if (!form.model) {
      errorList.model = true
      isValidation = false
    }
    if (!form.year) {
      errorList.year = true
      isValidation = false
    }
    if (!form.color) {
      errorList.color = true
      isValidation = false
    }
    return {
      isValidation: isValidation,
      errorList: errorList
    }
  }
}


export default PhotoControlValidation
