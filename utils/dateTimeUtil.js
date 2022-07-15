module.exports = function () {
    let convertedDate = new Date()
        .toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' })
    return convertedDate;
}