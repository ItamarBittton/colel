module.exports = {
    merge: merge,
    generateToken: generateToken,
    jsDateToMySql: jsDateToMySql,
};

// Merge two objects with conflicts resolved by the new object.
function merge(oldObj, newObj) {
    return JSON.parse((JSON.stringify(oldObj) + JSON.stringify(newObj)).replace(/\}\{/, ", "));
}

// Generate token for auth user login.
function generateToken() {
    var rand = Math.random().toString(36).substr(2);
    return rand + rand;
}

// Convert date from Javascript format to mySql format.
function jsDateToMySql(date) {
    if (!date) return;
    return date.toISOString().substring(0, 19).replace('T', ' ');
}