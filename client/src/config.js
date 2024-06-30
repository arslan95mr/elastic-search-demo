export default class Config {
    static APP_NAME = "ElasticSearch";
    
    static IS_DEV = true;
    static URL_SERVER = this.IS_DEV ? 'http://127.0.0.1:4000' : 'https://example.com';
    static PATH_PREFIX = this.IS_DEV ? "/static" : "/api/static";
}