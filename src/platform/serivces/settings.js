//? Service to save some settings

import Russian from '../../assets/translations/ru';
import English from '../../assets/translations/en';
import Armenian from '../../assets/translations/arm';

export const LanguageEnum = {
    English: 'English',
    Armenian: 'Armenian',
    Russian: 'Russian'
};


class Settings {

    static defaultLanguage = LanguageEnum.Russian

    static get language() {

        const storageLanguage = window.localStorage.getItem('Language') || this.defaultLanguage;
        // const language = storageLanguage;
        if (!storageLanguage || !LanguageEnum[storageLanguage]) {
            return Settings.defaultLanguage;
        }
        return storageLanguage;
    }

    static set language(value) {
        window.localStorage.setItem('Language', value);
        window.location.reload();
    }

    static get translations() {
        if (Settings.language === LanguageEnum.English) {
            return English;
        }
        if (Settings.language === LanguageEnum.Armenian) {
            return Armenian
        }
        return Russian;
    }

    get guestId() {
        const id = window.localStorage.getItem('guestId');
        return id || null;
    }

    set guestId(value) {
        if (value) {
            window.localStorage.setItem('guestId', value);
        } else {
            window.localStorage.removeItem('guestId');
        }
    }


}

// export const isValidEmail = (value) => {
//     if (!value && value !== '') return false;
//     const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return regex.test(value);
// };


export const isValidNonCityPhone = (value) => {
    if (!value && value !== '') return false;
    // const beeline = '91|99|96|43';
    // const ucom = '55|95|41|44';
    // const mts = '93|94|77|49|98';
    // const regex = new RegExp(`^(374)((?:${mts}|${beeline}|${ucom})([0-9]{6}))$`);
    const regex = new RegExp('^[+][0-9]*$');

    return regex.test(value);
};




export const token = window.localStorage.getItem('token');
export const role = window.localStorage.getItem('role');

export default Settings;
