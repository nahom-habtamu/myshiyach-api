const validatePhoneNumber = (pn) => {
    const pnRegexFull = /^[+][2][5][1][9][0-9]/;
    const pnRegexSmall = /^[0][9][0-9]/;
    if (pn.length === 13) {
        return pnRegexFull.test(pn);
    }
    else if (pn.length === 10) {
        return pnRegexSmall.test(pn);
    }
    else {
        return false;
    }
}

module.exports = validatePhoneNumber;