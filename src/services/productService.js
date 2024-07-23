import axios from "axios";
// import Cookies from 'js-cookie';

const baseUrl = "https://restfulapi-ecommerce.onrender.com/api";

export function getAllProducts(){
    const response = axios.get(`${baseUrl}/product/list`);
    return response;
}

export function searchProducts(name){
    const response = axios.get(`${baseUrl}/product/search?name=${name}`);
    return response;
}

export function getAllProductsByUser(){
    const response = axios.get(`${baseUrl}/product/byUser`,{
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    });
    return response;
}

export function createProduct(body){
    const response = axios.post(`${baseUrl}/product/create`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    });
    return response;
}

export function getProductByID(id){
    const response = axios.get(`${baseUrl}/product/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    });
    return response;
}

export function editProduct(body, id){
    const response = axios.get(`${baseUrl}/product/update/${id}`, body, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    });
    return response;
}

export function deleteProduct (id) {
    const response = axios.delete(`${baseUrl}/product/remove/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    });
        return response;
    }