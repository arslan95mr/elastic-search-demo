const Keys = require('./Keys');

class Utils {
    static getTimestampDate(timestamp) {
        let date = new Date(timestamp);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }
    
    static isEmptyObject(obj) {
        return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    static getLimit(limit) {
        try {
            return parseInt(limit);
        } catch(error) { return 10 }
    }

    static getSkip(page, limit) {
        try {
            page = parseInt(page) > 0 ? parseInt(page) : 1;
            return((page - 1) * limit);
        } catch(error) { return 0 }
    }

    static getOffset(skip, count) {
        return (skip < count ? skip : 0);
    }

    static getErrorMessage(error) {
        console.log(error);
        if (Keys.SEQUELIZE_ERROR_TYPES.includes(error.name))
            return error.errors.map(e => e.message);
        return 'Error occurred';
    }
}

module.exports = Utils;