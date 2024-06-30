export default class Utils {
    static getTimestampDate(timestamp) {
        let date = new Date(timestamp);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    static errorHandling (data) {
        let content = '';
        data.map((item, index) => { if (!item.key) content += `${index + 1}) ${item.value}. ` });

        return content;
    }
}