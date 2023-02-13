const moment = require('moment')

const isDate = (value, rest) => {
    //console.log(value)
    //console.log(rest)
    
    if (value) {
        const fecha = moment(value)

        if ( fecha.isValid() ) {
            return true
        }
        else {
            return false
        }
    }

     // Esto le indica al express-validator que el campo no existe
    return false
};

module.exports = {
    isDate
};