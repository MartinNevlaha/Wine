const generatePassword = (name, degId) => {
    let id;
    degId < 10 ? id = '0' + degId : id = degId;
    return name + '/' + id
};

module.exports = generatePassword;