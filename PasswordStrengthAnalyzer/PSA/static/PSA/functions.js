
const GUESS_SPEED = 11 * Math.log2(10); //log2(100 billion)
const normalValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!\-\[\]\{\}\\\/~`_])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!\-\[\]\{\}\\\/~`_]{8,}$/); //updated

function basicTest(password) {
    return normalValidation.test(password);
};

function repetitiveTest(password) {
    let count = 1;
    let max = 1;
    for (let i = 0; i < password.length - 1; i++) {
        count = (password[i] == password[i + 1]) ? count + 1 : 1;
        max = (count > max) ? count : max;
    }
    return max;
}
function continuousTest(password) {
    let count = 1;
    let max = 1;
    for (let i = 0; i < password.length - 1; i++) {
        count = (password.charCodeAt(i) + 1 == password.charCodeAt(i + 1)) ? count + 1 : 1;
        max = (count > max) ? count : max;
    }
    return max;
}

function hasLower(password) {
    for (let i in password) {
        if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)
            return true;
    }
    return false;
}
function hasUpper(password) {
    for (let i in password) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90)
            return true;
    }
    return false;
}
function hasNumber(password) {
    for (let i in password) {
        if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)
            return true;
    }
    return false;
}
function hasSpecial(password) {
    let specialRegExp = /[$&+,:;=?@#|'<>.^*()%!\-\[\]\{\}\\\/~`_]/ //30 common symbols
    return specialRegExp.test(password);
}
function entropy(password) {
    let range = 0;
    range = hasLower(password) ? range + 26 : range;
    range = hasUpper(password) ? range + 26 : range;
    range = hasNumber(password) ? range + 10 : range;
    range = hasSpecial(password) ? range + 31 : range; // updated to 31 symbols
    return Math.log2(range) * (password.length);
}

function secondsToSolve(password) {
    let passEntropy = entropy(password);
    return Math.pow(2, passEntropy - GUESS_SPEED); // 2^(e-log2(1bil)) // 2^range**length/1billion
}

const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function hasBirthdate(password, birthday) {
    if (birthday.length == 0) return false;

    const birthdate = birthday.split("-")[2];
    const birthmonth = birthday.split("-")[1];
    const birthyear = birthday.split("-")[0];

    let dateformat = {
        "dmy": birthdate + birthmonth + birthyear, 
        "mdy": birthmonth + birthdate + birthyear, 
        "fullmdy": birthdate + monthName[birthmonth - 1] + birthyear, 
        "fullmdy2": birthdate + monthFullName[birthmonth - 1] + birthyear, 
        "fulldmy": monthName[birthmonth - 1] + birthdate + birthyear, 
        "fulldmy2": monthFullName[birthmonth - 1] + birthdate + birthyear,
        "yearOnly": birthyear,
        "dm": birthdate + birthmonth,
        "md": birthmonth + birthdate,
        "fullmd": birthdate + monthName[birthmonth - 1],
        "fulldm": monthName[birthmonth - 1] + birthdate,
        "fullmd2": birthdate + monthFullName[birthmonth - 1],
        "fulldm2": monthFullName[birthmonth - 1] + birthdate,
    }
    console.log(dateformat);

    for (let i in dateformat){
        if (password.includes(dateformat[i])) return true;
    }

    return false;
}

function hasEmail(password, email){
    let emailUsername = email.split("@")[0];
    return (password.includes(emailUsername));
}
//Test

