
const GUESS_SPEED = 11*Math.log2(10); //log2(100 billion) 
const normalValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const password = "ExamplePassword123abcdefghijklmnopqrstuvwxyz@@##";
password = password.trim();

function basicTest(password)
{
    return normalValidation.test(password);
};
function repetitiveTest(password){
    let count = 1;
    let max = 1;
    for (let i = 0; i < password.length - 1; i++){
        count = (password[i] == password[i+1]) ? count + 1 : 1;
        max = (count > max) ? count : max;
    }
    return max;
}
function continuousTest(password){
    let count = 1;
    let max = 1;
    for (let i = 0; i < password.length - 1; i++){
        count = (password.charCodeAt(i) + 1 == password.charCodeAt(i+1)) ? count + 1 : 1;
        max = (count > max) ? count : max;
    }
    return max;
}

function hasLower(password){
    for (let i in password){
        if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)
            return true;
    }
    return false;
}
function hasUpper(password){
    for (let i in password){
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90)
            return true;
    }
    return false;
}
function hasNumber(password){
    for (let i in password){
        if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)
            return true;
    }
    return false;
}
function entropy(password){
    let range = 0;
    range = hasLower(password) ? range + 24 : range;
    range = hasUpper(password) ? range + 24 : range;
    range = hasNumber(password) ? range + 10 : range;
    return Math.log2(range)*(password.length);
}
function secondsToSolve(password){
    let passEntropy = entropy(password);
    return Math.pow(2,passEntropy-GUESS_SPEED);
}

//Test
console.log(entropy("ABCd11"));
console.log(secondsToSolve("1254hfaD"));
console.log(repetitiveTest(password))
console.log(continuousTest(password))

