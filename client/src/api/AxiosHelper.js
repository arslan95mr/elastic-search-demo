import axios from 'axios';
import Config from './../config';

const baseURL = `${Config.URL_SERVER}/api`;

const instance = axios.create({
    baseURL, headers: { Accept: 'application/json'}, withCredentials: true
});

class AxiosHelper {
    static async createProduct(data) {
        return await instance.post('/products/create', data);
    }

    static async updateProduct(id, data) {
        return await instance.put(`/products/update/${id}`, data);
    }

    static async deleteProduct(id) {
        return await instance.delete(`/products/delete/${id}`);
    }

    static async getProducts(query) {
        return await instance.get('/products', { params: query });
    }

    static async searchProducts(query) {
        return await instance.get('/products/search', { params: query });
    }
}

export default AxiosHelper;