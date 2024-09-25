
const GUESS_SPEED = 11*Math.log2(10); //log2(100 billion) 
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
console.log(entropy("ABCd11"));
console.log(secondsToSolve("1254hfaD"));
