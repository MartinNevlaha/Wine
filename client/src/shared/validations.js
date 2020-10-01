import validate from 'validate.js';

export const isRatingValid = (results, eliminateStatus) => {
    if (eliminateStatus) {
        return true;
    } else {
        const transformResuls = Object.values(results);
        return !transformResuls.includes(null);
    }
}
export const isIdValid = (id) => {
    return validate.isNumber(+id) && id.length > 0 && id > 0;
}

export const isVintageValid = (year) => {
    const date = new Date();
    const actualYear = date.getFullYear();
    return validate.isNumber(+year) && year.length === 4 && (year > 0 && year <= actualYear);
}

export const isString = (string) => {
    return validate.isString(string) && string.length > 0
}

export const isInputNameValid = (string) => {
    return validate.isString(string) && string.length > 3;
}

export const isInputPassValid = (string) => {
    return validate.isString(string) && string.length > 5
}