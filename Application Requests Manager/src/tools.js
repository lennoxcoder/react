
function getStringDate() {

    var d = new Date();
    var day = d.getUTCDate().toString();
    var month = d.getMonth().toString();
    day = day.length < 2 ? '0' + day : day
    month = month.length < 2 ? '0' + month : month
    var strDate = day + month + d.getFullYear().toString()
    return strDate

}

export {getStringDate}